import logging
from typing import Any

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwk, jwt

from app.config import settings

logger = logging.getLogger(__name__)

_jwks_cache: dict[str, Any] | None = None

bearer_scheme = HTTPBearer(auto_error=False)
bearer_scheme_required = HTTPBearer(auto_error=True)


async def _fetch_jwks() -> dict[str, Any]:
	"""Fetch and cache the Cognito JWKS."""
	global _jwks_cache
	if _jwks_cache is not None:
		return _jwks_cache

	async with httpx.AsyncClient() as client:
		response = await client.get(settings.cognito_jwks_url, timeout=10.0)
		response.raise_for_status()
		_jwks_cache = response.json()
		logger.info("Fetched Cognito JWKS from %s", settings.cognito_jwks_url)
		return _jwks_cache


def _get_public_key(token: str, jwks: dict[str, Any]) -> Any:
	"""Extract the matching public key from JWKS for the given token."""
	headers = jwt.get_unverified_header(token)
	kid = headers.get("kid")
	for key_data in jwks.get("keys", []):
		if key_data.get("kid") == kid:
			return jwk.construct(key_data)
	raise HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail="Unable to find matching public key for token",
	)


async def verify_token(token: str) -> dict[str, Any]:
	"""
	Verify a Cognito JWT token and return its claims.
	Raises HTTPException on failure.
	"""
	try:
		jwks = await _fetch_jwks()
		public_key = _get_public_key(token, jwks)

		claims = jwt.decode(
			token,
			public_key,
			algorithms=["RS256"],
			audience=settings.cognito_client_id or None,
			options={"verify_aud": bool(settings.cognito_client_id)},
		)
		return claims
	except JWTError as e:
		logger.warning("JWT verification failed: %s", e)
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid or expired token",
			headers={"WWW-Authenticate": "Bearer"},
		)


async def get_current_user(
	credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme_required),
) -> dict[str, Any]:
	"""
	FastAPI dependency that requires authentication.
	Returns the decoded JWT claims for the authenticated user.
	"""
	return await verify_token(credentials.credentials)


async def optional_auth(
	credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict[str, Any] | None:
	"""
	FastAPI dependency for optional authentication.
	Returns decoded JWT claims if a valid token is provided, otherwise None.
	"""
	if credentials is None:
		return None
	try:
		return await verify_token(credentials.credentials)
	except HTTPException:
		return None
