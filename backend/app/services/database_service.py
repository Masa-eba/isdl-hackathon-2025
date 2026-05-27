"""DB初期化やリセット用のサービス層。"""
import logging

from app.db import schema


logger = logging.getLogger(__name__)


class DatabaseService:
    """データベース操作をまとめたサービス。"""

    def initialize(self) -> bool:
        try:
            schema.initialize_database()
            return True
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("データベース初期化に失敗")
            return False

    def reset(self) -> bool:
        try:
            schema.reset_database()
            return True
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("データベースリセットに失敗")
            return False
