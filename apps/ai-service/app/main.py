"""AccessShield India AI microservice — FastAPI 0.110."""

from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

app = FastAPI(
    title="AccessShield AI Service",
    version="0.1.0",
    description="AI-powered accessibility analysis microservices",
)


class ProblemDetail(BaseModel):
    """RFC 7807 Problem Details."""

    type: str
    title: str
    status: int
    detail: str | None = None
    instance: str | None = None
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class HealthResponse(BaseModel):
    status: Literal["ok", "degraded", "error"]
    version: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ViolationAnalysisRequest(BaseModel):
    rule_id: str
    html_snippet: str
    page_url: str
    wcag_criteria: list[str] = Field(default_factory=list)


class ViolationAnalysisResponse(BaseModel):
    rule_id: str
    suggested_fix: str
    confidence: float = Field(ge=0.0, le=1.0)
    wcag_references: list[str]
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="ok", version="0.1.0")


@app.post("/api/v1/analyze-violation", response_model=ViolationAnalysisResponse)
async def analyze_violation(body: ViolationAnalysisRequest) -> ViolationAnalysisResponse:
    """Analyse an accessibility violation and suggest a remediation fix."""
    return ViolationAnalysisResponse(
        rule_id=body.rule_id,
        suggested_fix="Add an accessible name via aria-label or associated <label> element.",
        confidence=0.85,
        wcag_references=body.wcag_criteria or ["4.1.2"],
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    problem = ProblemDetail(
        type="https://api.accessshield.in/problems/internal-error",
        title="Internal server error",
        status=500,
        detail=str(exc) if app.debug else None,
        instance=str(request.url),
    )
    return JSONResponse(
        status_code=500,
        content=problem.model_dump(),
        media_type="application/problem+json",
    )
