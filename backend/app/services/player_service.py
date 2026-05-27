"""プレイヤー情報の保存・取得ロジック。"""
import logging
from typing import Any, Dict, Optional

from app.db.connection import get_connection


logger = logging.getLogger(__name__)


class PlayerService:
    def save_player_info(self, name: str, birth_month: int) -> bool:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM player_info")
                cursor.execute(
                    """
                    INSERT INTO player_info (name, birth_month, created_at)
                    VALUES (?, ?, datetime('now'))
                    """,
                    (name, birth_month),
                )
            return True
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("プレイヤー情報の保存に失敗")
            return False

    def get_player_info(self) -> Optional[Dict[str, Any]]:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT name, birth_month FROM player_info ORDER BY created_at DESC LIMIT 1")
                row = cursor.fetchone()
                if row:
                    return {"name": row["name"], "birth_month": row["birth_month"]}
                return None
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("プレイヤー情報の取得に失敗")
            return None

