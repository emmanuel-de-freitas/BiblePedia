import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers.commentaries import available_commentaries_router, router as commentaries_router
from app.routers.datasets import available_datasets_router, router as datasets_router
from app.routers.translations import router as translations_router

logging.basicConfig(
	level=logging.DEBUG if settings.is_development else logging.INFO,
	format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

logger = logging.getLogger(__name__)

app = FastAPI(
	title="BiblePedia API",
	description="Bible API compatible with bible.helloao.org",
	version="1.0.0",
	docs_url="/docs",
	redoc_url="/redoc",
)

# CORS
app.add_middleware(
	CORSMiddleware,
	allow_origins=settings.cors_origins_list,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Routers — register specific prefixes BEFORE generic translation routes
# to avoid /{translation}/{book}/{chapter}.json shadowing /c/... and /d/... paths
app.include_router(available_commentaries_router, prefix="/api")
app.include_router(available_datasets_router, prefix="/api")
app.include_router(commentaries_router, prefix="/api")
app.include_router(datasets_router, prefix="/api")
app.include_router(translations_router, prefix="/api")


@app.get("/health", tags=["Health"])
async def health() -> dict[str, str]:
	return {"status": "ok"}


@app.get("/", tags=["Health"], include_in_schema=False)
async def root() -> dict[str, str]:
	return {"message": "BiblePedia API — see /docs for API reference"}
