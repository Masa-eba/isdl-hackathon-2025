"""FastAPIエントリーポイント。"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router as api_router
from app.core.config import get_settings
from app.services.database_service import DatabaseService


settings = get_settings()


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version=settings.app_version, debug=settings.debug)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=settings.cors_allow_credentials,
        allow_methods=settings.cors_allow_methods,
        allow_headers=settings.cors_allow_headers,
    )

    app.include_router(api_router)

    db_service = DatabaseService()

    @app.on_event("startup")
    async def startup_event():
        db_service.initialize()

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )

