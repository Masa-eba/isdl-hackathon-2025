"""APIレスポンス用の共通スキーマ。"""
from typing import Any, Optional

from pydantic import BaseModel, Field


class ApiResponse(BaseModel):
    success: bool = Field(..., description="成功フラグ")
    message: Optional[str] = Field(None, description="メッセージ")
    data: Optional[Any] = Field(None, description="レスポンスデータ")

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "操作が正常に完了しました",
                "data": None,
            }
        }
    }


class HealthResponse(BaseModel):
    status: str = Field(..., description="ステータス")
    message: str = Field(..., description="メッセージ")

    model_config = {
        "json_schema_extra": {
            "example": {
                "status": "ok",
                "message": "バックエンドが正常に動作しています",
            }
        }
    }

