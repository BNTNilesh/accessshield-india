"""Router for AI inference clients."""

from typing import Any, Protocol, Optional

from utils.claude_client import claude_client
from utils.mlx_client import MLXClient

# Store MLX clients by model name to avoid reloading if multiple models are used
_mlx_clients = {}


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
        provider: 'deepinfra' or 'local-mlx'.
        model: Optional model string.

    Returns:
        The configured AIClient instance.
    """
    if provider == "local-mlx":
        model_name = model if model else "mlx-community/Qwen2.5-Coder-3B-Instruct-4bit"
        if model_name not in _mlx_clients:
            _mlx_clients[model_name] = MLXClient(model_name=model_name)
        return _mlx_clients[model_name]
    
    # Default to DeepInfra / HuggingFace router
    # Update claude_client's model if explicitly provided
    if model:
        claude_client.model = model
    return claude_client
