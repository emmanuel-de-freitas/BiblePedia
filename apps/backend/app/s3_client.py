import json
import logging
from typing import Any

import boto3
from botocore.exceptions import ClientError

from app.config import settings

logger = logging.getLogger(__name__)

_s3_client = None


def get_s3_client():
	"""Return a cached boto3 S3 client."""
	global _s3_client
	if _s3_client is None:
		kwargs: dict[str, Any] = {"region_name": settings.aws_region}
		if settings.aws_access_key_id:
			kwargs["aws_access_key_id"] = settings.aws_access_key_id
		if settings.aws_secret_access_key:
			kwargs["aws_secret_access_key"] = settings.aws_secret_access_key
		_s3_client = boto3.client("s3", **kwargs)
	return _s3_client


def get_object(key: str) -> Any | None:
	"""Fetch an object from S3 and return parsed JSON, or None if not found or S3 unavailable."""
	try:
		client = get_s3_client()
		response = client.get_object(Bucket=settings.aws_s3_bucket, Key=key)
		body = response["Body"].read()
		return json.loads(body)
	except ClientError as e:
		error_code = e.response["Error"]["Code"]
		if error_code in ("NoSuchKey", "404"):
			logger.debug("S3 object not found: %s", key)
		else:
			logger.warning("S3 error fetching %s: %s", key, e)
		return None
	except json.JSONDecodeError as e:
		logger.error("Failed to parse JSON from S3 key %s: %s", key, e)
		return None
	except Exception as e:
		# S3 not configured or unreachable in dev — fall through to DB
		logger.warning("S3 unavailable, falling back to DB for %s: %s", key, e)
		return None


def put_object(key: str, data: Any) -> None:
	"""Serialize data to JSON and upload to S3."""
	client = get_s3_client()
	body = json.dumps(data, ensure_ascii=False)
	client.put_object(
		Bucket=settings.aws_s3_bucket,
		Key=key,
		Body=body.encode("utf-8"),
		ContentType="application/json",
	)
	logger.debug("Uploaded S3 object: %s", key)


def list_objects(prefix: str) -> list[str]:
	"""List all object keys under a given S3 prefix. Returns a list of key strings."""
	client = get_s3_client()
	keys: list[str] = []
	paginator = client.get_paginator("list_objects_v2")
	pages = paginator.paginate(Bucket=settings.aws_s3_bucket, Prefix=prefix)
	for page in pages:
		for obj in page.get("Contents", []):
			keys.append(obj["Key"])
	return keys
