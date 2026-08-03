"""Router for AI inference clients."""

from typing import Any, Protocol, Optional

from utils.claude_client import claude_client
from utils.local_client import LocalClient

# Store local clients by model name to avoid reloading if multiple models are used
_local_clients = {}


class AIClient(Protocol):
    """Protocol defining the interface for AI clients."""
    async def complete(
        self,
        system: str,
        user: str,
        max_tokens: int,
        temperature: float = 0.1,
        expect_json: bool = False,
        messages: Optional[list[dict[str, Any]]] = None,
    ) -> str:
        ...


def get_client(provider: str, model: str = "") -> AIClient:
    """Get the appropriate AI client based on the provider and model.

    Args:
        provider: 'deepinfra', 'local', or 'local-mlx'.
        model: Optional model string.

    Returns:
        The configured AIClient instance.
    """
    # Normalize legacy or unoptimized models for fast Apple Silicon local inferencing
    if not model or "Qwopus" in model or "35B" in model:
        model = "Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF"

    if provider in ("local", "local-mlx"):
        model_name = model if model else "Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF"
        if model_name not in _local_clients:
            _local_clients[model_name] = LocalClient(model_name=model_name)
        return _local_clients[model_name]
    
    # Default to DeepInfra / HuggingFace router
    # Update claude_client's model if explicitly provided
    if model:
        claude_client.model = model
    return claude_client
