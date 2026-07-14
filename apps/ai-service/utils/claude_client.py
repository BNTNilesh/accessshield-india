"""HuggingFace Inference API wrapper with retry logic and error handling."""

import asyncio
import json
import logging
import time
from typing import Any, Optional

import httpx

from config import settings

logger = logging.getLogger(__name__)


class ClaudeClient:
    """Wrapper for HuggingFace API with retry logic, maintaining the same interface."""

    def __init__(self) -> None:
        """Initialize the client."""
        self.api_key = settings.huggingface_api_key
        self.model = settings.ai_model
        self.url = "https://router.huggingface.co/v1/chat/completions"

    async def complete(
        self,
        system: str,
        user: str,
        max_tokens: int,
        temperature: float = 0.1,
        expect_json: bool = False,
        messages: Optional[list[dict[str, Any]]] = None,
    ) -> str:
        """Call HuggingFace API with retry logic.

        Args:
            system: System prompt.
            user: User message (ignored if messages provided).
            max_tokens: Maximum tokens in response.
            temperature: Sampling temperature (0.0-1.0).
            expect_json: If True, parse response as JSON.
            messages: Optional list of message dicts for multimodal content.

        Returns:
            Response text as string.

        Raises:
            ValueError: If the API returns invalid JSON when expect_json=True.
            RuntimeError: On unrecoverable API errors.
        """
        logger.debug(
            "HuggingFace request: model=%s, max_tokens=%d, temperature=%.2f",
            self.model,
            max_tokens,
            temperature,
        )

        start_time = time.time()

        # Build messages list
        msg_list = [{"role": "system", "content": system}]
        if messages:
            msg_list.extend(messages)
        else:
            msg_list.append({"role": "user", "content": user})

        response_text = await self._call_with_retry(
            messages=msg_list,
            max_tokens=max_tokens,
            temperature=temperature,
        )

        latency_ms = int((time.time() - start_time) * 1000)
        logger.info("HuggingFace response: latency_ms=%d", latency_ms)

        if expect_json:
            response_text = self._extract_json(response_text)
            try:
                json.loads(response_text)
            except json.JSONDecodeError:
                # Retry with explicit JSON instruction
                logger.warning("Invalid JSON response, retrying with explicit instruction")
                msg_list[0]["content"] = system + "\n\nRespond with valid JSON only, no markdown."
                response_text = await self._call_with_retry(
                    messages=msg_list,
                    max_tokens=max_tokens,
                    temperature=temperature,
                )
                response_text = self._extract_json(response_text)
                try:
                    json.loads(response_text)
                except json.JSONDecodeError as e:
                    raise ValueError("HuggingFace returned invalid JSON") from e

        return response_text

    async def _call_with_retry(
        self,
        messages: list[dict[str, Any]],
        max_tokens: int,
        temperature: float,
    ) -> str:
        """Execute API call with retry logic."""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        
        data = {
            "model": self.model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        for attempt in range(2):
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.post(
                        self.url,
                        headers=headers,
                        json=data,
                        timeout=30.0,
                    )
                    
                    if response.status_code == 429:
                        if attempt == 0:
                            logger.warning("HuggingFace rate limited, retrying in 10s")
                            await asyncio.sleep(10)
                            continue
                        raise RuntimeError("Rate limited")
                        
                    response.raise_for_status()
                    result = response.json()
                    if "choices" in result and len(result["choices"]) > 0:
                        return result["choices"][0]["message"]["content"]
                    else:
                        raise RuntimeError(f"Unexpected response format: {result}")
                        
            except httpx.TimeoutException:
                if attempt == 0:
                    logger.warning("HuggingFace API timeout, retrying in 2s")
                    await asyncio.sleep(2)
                    continue
                raise RuntimeError("API Timeout")
                
            except httpx.HTTPStatusError as e:
                raise RuntimeError(f"API Error: {e.response.text}") from e
                
            except Exception as e:
                raise RuntimeError(f"Unexpected error: {str(e)}") from e

        raise RuntimeError("Unexpected retry loop exit")

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
claude_client = ClaudeClient()
