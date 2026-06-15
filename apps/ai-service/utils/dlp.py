"""Data Loss Prevention — strips Indian PII from text before sending to external APIs.

MANDATORY: Call scrub() on ALL text before any Anthropic API call.
"""

import re
from typing import Any


# Compiled regex patterns for Indian PII
PATTERNS = [
    # Aadhaar number (spaced format: 1234 5678 9012)
    (re.compile(r"\b\d{4}\s\d{4}\s\d{4}\b"), "[REDACTED-AADHAAR]"),
    # Aadhaar number (continuous: 123456789012)
    (re.compile(r"\b\d{12}\b"), "[REDACTED-AADHAAR]"),
    # PAN card (ABCDE1234F)
    (re.compile(r"\b[A-Z]{5}\d{4}[A-Z]\b"), "[REDACTED-PAN]"),
    # Indian phone with prefix (+91, 91, 0)
    (re.compile(r"\b(?:\+91|91|0)?[6-9]\d{9}\b"), "[REDACTED-PHONE]"),
    # Email address
    (re.compile(r"\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b"), "[REDACTED-EMAIL]"),
    # Credit/debit card (with optional spaces or dashes)
    (re.compile(r"\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b"), "[REDACTED-CARD]"),
    # IFSC code (ABCD0123456)
    (re.compile(r"\b[A-Z]{4}0[A-Z0-9]{6}\b"), "[REDACTED-IFSC]"),
    # Bank account number (8-18 digits, but avoid matching already-redacted patterns)
    (re.compile(r"(?<!\[REDACTED-)\b\d{8,18}\b(?!])"), "[REDACTED-ACCOUNT]"),
]


def scrub(text: str) -> str:
    """Apply all DLP replacements to text.

    Args:
        text: Input text potentially containing PII.

    Returns:
        Cleaned text with PII replaced by redaction markers.
    """
    if not text:
        return text

    result = text
    for pattern, replacement in PATTERNS:
        result = pattern.sub(replacement, result)

    return result


def scrub_dict(data: dict[str, Any]) -> dict[str, Any]:
    """Recursively apply scrub() to all string values in a dict.

    Args:
        data: Dictionary potentially containing PII in string values.

    Returns:
        New dict with all string values scrubbed. Does not mutate input.
    """
    if not data:
        return data

    result: dict[str, Any] = {}

    for key, value in data.items():
        if isinstance(value, str):
            result[key] = scrub(value)
        elif isinstance(value, dict):
            result[key] = scrub_dict(value)
        elif isinstance(value, list):
            result[key] = [
                scrub_dict(item) if isinstance(item, dict)
                else scrub(item) if isinstance(item, str)
                else item
                for item in value
            ]
        else:
            result[key] = value

    return result


def truncate(text: str, max_chars: int = 3000) -> str:
    """Truncate text to max_chars.

    Args:
        text: Input text.
        max_chars: Maximum allowed characters (default 3000).

    Returns:
        Original text if under limit, otherwise truncated with marker.
    """
    if not text or len(text) <= max_chars:
        return text

    return text[:max_chars] + "...[truncated]"
