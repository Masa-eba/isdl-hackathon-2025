"""環境変数ベースのシンプルな設定ローダー。"""
import os
from functools import lru_cache
from pathlib import Path
from typing import List


def _maybe_load_dotenv() -> None:
    try:
        from dotenv import load_dotenv  # type: ignore

        load_dotenv()
    except Exception:
        # python-dotenv が無ければ何もしない
        pass


def _str_to_bool(value: str | None, default: bool) -> bool:
    if value is None:
        return default
    return value.lower() in {"1", "true", "yes", "on"}


def _split_csv(value: str | None, default: List[str]) -> List[str]:
    if not value:
        return default
    return [item.strip() for item in value.split(",") if item.strip()]


_maybe_load_dotenv()


class Settings:
    def __init__(self) -> None:
        self.app_name: str = os.getenv("APP_APP_NAME", "Novel Game API")
        self.app_version: str = os.getenv("APP_APP_VERSION", "1.0.0")
        self.debug: bool = _str_to_bool(os.getenv("APP_DEBUG"), False)

        self.host: str = os.getenv("APP_HOST", "0.0.0.0")
        self.port: int = int(os.getenv("APP_PORT", "8000"))

        self.cors_origins: List[str] = _split_csv(os.getenv("APP_CORS_ORIGINS"), ["http://localhost:5173"])
        self.cors_allow_credentials: bool = _str_to_bool(os.getenv("APP_CORS_ALLOW_CREDENTIALS"), True)
        self.cors_allow_methods: List[str] = _split_csv(os.getenv("APP_CORS_ALLOW_METHODS"), ["*"])
        self.cors_allow_headers: List[str] = _split_csv(os.getenv("APP_CORS_ALLOW_HEADERS"), ["*"])

        self.data_dir: Path = Path(os.getenv("APP_DATA_DIR", Path(__file__).resolve().parents[2] / "data"))
        self.database_file: str = os.getenv("APP_DATABASE_FILE", "novel_game.db")

    @property
    def database_path(self) -> Path:
        return Path(self.data_dir) / self.database_file


@lru_cache
def get_settings() -> Settings:
    return Settings()

