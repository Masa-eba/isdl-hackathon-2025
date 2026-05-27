"""SQLite接続のライフサイクル管理をまとめる。"""
from contextlib import contextmanager
import sqlite3
from pathlib import Path
from typing import Iterator

from app.core.config import get_settings


settings = get_settings()


def _ensure_directory(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


@contextmanager
def get_connection() -> Iterator[sqlite3.Connection]:
    """コミット／ロールバックを含めたSQLite接続コンテキスト。"""
    db_path = settings.database_path
    _ensure_directory(db_path)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

