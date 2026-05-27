"""ゲーム状態の入力／保存用スキーマ。"""
from typing import Optional

from pydantic import BaseModel, Field


class GameState(BaseModel):
    player_name: str = Field(..., description="プレイヤー名")
    research_skill: int = Field(default=20, description="研究スキル", ge=0, le=100)
    social_skill: int = Field(default=30, description="社交スキル", ge=0, le=100)
    professor_affection: int = Field(default=50, description="教授好感度", ge=0, le=100)
    stress_level: int = Field(default=30, description="ストレスレベル", ge=0, le=100)
    day_count: int = Field(default=1, description="日数", ge=1)
    current_week: int = Field(default=1, description="現在の週", ge=1, le=52)
    current_month: str = Field(default="4月", description="現在の月")
    current_semester: str = Field(default="前期", description="現在の学期")


class SaveData(BaseModel):
    slot_number: int = Field(..., description="スロット番号", ge=1, le=3)
    player_name: str = Field(..., description="プレイヤー名")
    birth_month: int = Field(..., description="誕生月", ge=1, le=12)
    research_skill: int = Field(default=20, description="研究スキル", ge=0, le=100)
    social_skill: int = Field(default=30, description="社交スキル", ge=0, le=100)
    professor_affection: int = Field(default=50, description="教授好感度", ge=0, le=100)
    stress_level: int = Field(default=30, description="ストレスレベル", ge=0, le=100)
    day_count: int = Field(default=1, description="日数", ge=1)
    current_week: int = Field(default=1, description="現在の週", ge=1, le=52)
    current_month: str = Field(default="4月", description="現在の月")
    current_semester: str = Field(default="前期", description="現在の学期")
    choices: str = Field(default="[]", description="選択履歴（JSON形式）")
    current_day: str = Field(default="tuesday", description="現在の曜日")
    lab_roles: str = Field(default="[]", description="研究室役割（JSON形式）")
    research_groups: str = Field(default="[]", description="研究班（JSON形式）")
    action_count: int = Field(default=0, description="現在の日の行動回数", ge=0)
    completed_events: str = Field(default="[]", description="完了したイベント（JSON形式）")
    relationships: str = Field(default="[]", description="関係性データ（JSON形式）")

    model_config = {
        "json_schema_extra": {
            "example": {
                "slot_number": 1,
                "player_name": "田中太郎",
                "birth_month": 4,
                "research_skill": 25,
                "social_skill": 35,
                "professor_affection": 55,
                "stress_level": 25,
                "day_count": 5,
                "current_week": 1,
                "current_month": "4月",
                "current_semester": "前期",
                "choices": "[]",
                "current_day": "tuesday",
                "lab_roles": "[]",
                "research_groups": "[]",
                "action_count": 2,
                "completed_events": "[]",
                "relationships": "[]",
            }
        }
    }

