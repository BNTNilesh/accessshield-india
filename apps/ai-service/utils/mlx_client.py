"""Local Apple Silicon Inference API wrapper using mlx_lm."""

import asyncio
import json
import logging
import time
from typing import Any, Optional

from mlx_lm import load, generate

logger = logging.getLogger(__name__)


class MLXClient:
    """Wrapper for MLX local model inference with the same interface as ClaudeClient."""

    def __init__(self, model_name: str = "mlx-community/Qwen2.5-Coder-3B-Instruct-4bit") -> None:
        """Initialize the client."""
        self.model_name = model_name
        self._model = None
        self._tokenizer = None
        self._load_lock = asyncio.Lock()

    async def _ensure_loaded(self):
        """Ensure the model and tokenizer are loaded."""
        if self._model is None or self._tokenizer is None:
            async with self._load_lock:
                if self._model is None or self._tokenizer is None:
                    logger.info("Loading MLX model: %s", self.model_name)
                    # Use asyncio.to_thread to not block the event loop while loading
                    self._model, self._tokenizer = await asyncio.to_thread(
                        load, self.model_name
                    )
                    logger.info("MLX model loaded successfully")

    async def complete(
        self,
        system: str,
        user: str,
        max_tokens: int,
        temperature: float = 0.1,
        expect_json: bool = False,
        messages: Optional[list[dict[str, Any]]] = None,
    ) -> str:
        """Call MLX local inference.

        Args:
            system: System prompt.
            user: User message (ignored if messages provided).
            max_tokens: Maximum tokens in response.
            temperature: Sampling temperature (0.0-1.0).
            expect_json: If True, parse response as JSON.
            messages: Optional list of message dicts for multimodal content.

        Returns:
            Response text as string.
        """
        await self._ensure_loaded()

        logger.debug(
            "MLX request: model=%s, max_tokens=%d, temperature=%.2f",
            self.model_name,
            max_tokens,
            temperature,
        )

        start_time = time.time()

        # Build messages list
        msg_list = [{"role": "system", "content": system}]
        if messages:
            # mlx_lm currently doesn't natively support base64 images in prompt natively like Claude.
            # We will extract text contents from messages if it's multimodal.
            for msg in messages:
                if isinstance(msg.get("content"), list):
                    text_parts = [
                        part["text"]
                        for part in msg["content"]
                        if part.get("type") == "text"
                    ]
                    msg_list.append({"role": msg["role"], "content": " ".join(text_parts)})
                else:
                    msg_list.append(msg)
        else:
            msg_list.append({"role": "user", "content": user})

        prompt = self._tokenizer.apply_chat_template(
            msg_list, tokenize=False, add_generation_prompt=True
        )

        response_text = await asyncio.to_thread(
            generate,
            self._model,
            self._tokenizer,
            prompt=prompt,
            max_tokens=max_tokens,
            temp=temperature,
            verbose=False,
        )

        latency_ms = int((time.time() - start_time) * 1000)
        logger.info("MLX response: latency_ms=%d", latency_ms)

        if expect_json:
            response_text = self._extract_json(response_text)
            try:
                json.loads(response_text)
            except json.JSONDecodeError:
                logger.warning("Invalid JSON response from MLX, retrying with explicit instruction")
                msg_list[0]["content"] = system + "\n\nRespond with valid JSON only, no markdown."
                prompt = self._tokenizer.apply_chat_template(
                    msg_list, tokenize=False, add_generation_prompt=True
                )
                response_text = await asyncio.to_thread(
                    generate,
                    self._model,
                    self._tokenizer,
                    prompt=prompt,
                    max_tokens=max_tokens,
                    temp=temperature,
                    verbose=False,
                )
                response_text = self._extract_json(response_text)
                try:
                    json.loads(response_text)
                except json.JSONDecodeError as e:
                    raise ValueError("MLX returned invalid JSON") from e

        return response_text

    def _extract_json(self, text: str) -> str:
        """Extract JSON from response, stripping markdown code fences."""
        text = text.strip()

        # Remove markdown code fences
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]

        if text.endswith("```"):
            text = text[:-3]

        return text.strip()


# Singleton instance
mlx_client = MLXClient()
