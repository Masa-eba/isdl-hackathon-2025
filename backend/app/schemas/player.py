"""プレイヤー情報のPydanticスキーマ。"""
from pydantic import BaseModel, Field


class PlayerInfo(BaseModel):
    name: str = Field(..., description="プレイヤー名", min_length=1, max_length=50)
    birth_month: int = Field(..., description="誕生月", ge=1, le=12)

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "田中太郎",
                "birth_month": 4,
            }
        }
    }

