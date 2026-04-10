from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	model_config = SettingsConfigDict(
		env_file=".env",
		env_file_encoding="utf-8",
		case_sensitive=False,
	)

	# Database
	database_url: str = "postgresql+asyncpg://biblepedia:biblepedia@localhost:5432/biblepedia"

	# AWS
	aws_access_key_id: str = ""
	aws_secret_access_key: str = ""
	aws_region: str = "us-east-1"
	aws_s3_bucket: str = "biblepedia-data"

	# Cognito
	cognito_region: str = "us-east-1"
	cognito_user_pool_id: str = ""
	cognito_client_id: str = ""

	# App
	environment: str = "development"
	cors_origins: str = "http://localhost:5173,http://localhost:3000"

	@property
	def cors_origins_list(self) -> list[str]:
		return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

	@property
	def cognito_jwks_url(self) -> str:
		return (
			f"https://cognito-idp.{self.cognito_region}.amazonaws.com"
			f"/{self.cognito_user_pool_id}/.well-known/jwks.json"
		)

	@property
	def is_development(self) -> bool:
		return self.environment == "development"


settings = Settings()
