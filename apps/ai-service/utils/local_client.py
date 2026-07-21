"""Local Inference API wrapper using llama-cpp-python."""

import asyncio
import json
import logging
import time
from typing import Any, Optional

from llama_cpp import Llama

logger = logging.getLogger(__name__)


class LocalClient:
    """Wrapper for local model inference with the same interface as ClaudeClient."""

    def __init__(self, model_name: str = "bartowski/Qwen2.5-Coder-3B-Instruct-GGUF") -> None:
        """Initialize the client."""
        self.model_name = model_name
        self._llm = None
        self._load_lock = asyncio.Lock()

    async def _ensure_loaded(self):
        """Ensure the model is loaded."""
        if self._llm is None:
            async with self._load_lock:
                if self._llm is None:
                    logger.info("Loading Local model: %s", self.model_name)
                    
                    def _load_model():
                        return Llama.from_pretrained(
                            repo_id=self.model_name,
                            filename="*Q4_K_M.gguf",
                            n_ctx=4096,
                            n_gpu_layers=-1, # use all available GPU layers
                            verbose=False
                        )
                    
                    self._llm = await asyncio.to_thread(_load_model)
                    logger.info("Local model loaded successfully")

    async def complete(
        self,
        system: str,
        user: str,
        max_tokens: int,
        temperature: float = 0.1,
        expect_json: bool = False,
        messages: Optional[list[dict[str, Any]]] = None,
    ) -> str:
        """Call local inference.

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
            "Local request: model=%s, max_tokens=%d, temperature=%.2f",
            self.model_name,
            max_tokens,
            temperature,
        )

        start_time = time.time()

        # Build messages list
        msg_list = [{"role": "system", "content": system}]
        if messages:
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

        def _generate(messages_to_send):
            response = self._llm.create_chat_completion(
                messages=messages_to_send,
                max_tokens=max_tokens,
                temperature=temperature,
            )
            return response["choices"][0]["message"]["content"]

        response_text = await asyncio.to_thread(_generate, msg_list)

        latency_ms = int((time.time() - start_time) * 1000)
        logger.info("Local response: latency_ms=%d", latency_ms)

        if expect_json:
            response_text = self._extract_json(response_text)
            try:
                json.loads(response_text)
            except json.JSONDecodeError:
                logger.warning("Invalid JSON response from Local, retrying with explicit instruction")
                msg_list[0]["content"] = system + "\n\nRespond with valid JSON only, no markdown."
                response_text = await asyncio.to_thread(_generate, msg_list)
                response_text = self._extract_json(response_text)
                try:
                    json.loads(response_text)
                except json.JSONDecodeError as e:
                    raise ValueError("Local returned invalid JSON") from e

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
local_client = LocalClient()
