"""ゲームデータ関連のルーター。"""
from fastapi import APIRouter, HTTPException

from app.schemas.game_state import SaveData
from app.services.database_service import DatabaseService
from app.services.game_service import GameService


router = APIRouter(prefix="/api", tags=["game"])

_game_service = GameService()
_db_service = DatabaseService()


@router.get("/save-slots")
def get_save_slots():
    try:
        slots = _game_service.get_save_slots()
        return {"slots": slots, "success": True}
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - 例外時のみ
        raise HTTPException(status_code=500, detail=f"セーブスロット取得エラー: {exc}") from exc


@router.post("/save-game")
def save_game(save_data: SaveData):
    try:
        game_state_data = {
            "research_skill": save_data.research_skill,
            "social_skill": save_data.social_skill,
            "professor_affection": save_data.professor_affection,
            "stress_level": save_data.stress_level,
            "day_count": save_data.day_count,
            "current_week": save_data.current_week,
            "current_month": save_data.current_month,
            "current_semester": save_data.current_semester,
            "choices": save_data.choices,
            "current_day": save_data.current_day,
            "lab_roles": save_data.lab_roles,
            "research_groups": save_data.research_groups,
            "action_count": save_data.action_count,
            "completed_events": save_data.completed_events,
            "relationships": save_data.relationships,
        }

        success = _game_service.save_game_state(
            save_data.slot_number,
            save_data.player_name,
            save_data.birth_month,
            game_state_data,
        )

        if success:
            return {"message": "ゲームデータが保存されました", "success": True}
        raise HTTPException(status_code=500, detail="ゲームデータの保存に失敗しました")
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - 例外時のみ
        raise HTTPException(status_code=500, detail=f"セーブエラー: {exc}") from exc


@router.get("/load-game/{slot_number}")
def load_game(slot_number: int):
    try:
        data = _game_service.load_game_state(slot_number)
        if data:
            return {"data": data, "success": True}
        raise HTTPException(status_code=404, detail="セーブデータが見つかりません")
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - 例外時のみ
        raise HTTPException(status_code=500, detail=f"ロードエラー: {exc}") from exc


@router.delete("/delete-save/{slot_number}")
def delete_save(slot_number: int):
    try:
        success = _game_service.delete_save_state(slot_number)
        if success:
            return {"message": "セーブデータが削除されました", "success": True}
        raise HTTPException(status_code=500, detail="セーブデータの削除に失敗しました")
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - 例外時のみ
        raise HTTPException(status_code=500, detail=f"削除エラー: {exc}") from exc


@router.post("/reset-database")
def reset_database():
    try:
        success = _db_service.reset()
        if success:
            return {"message": "データベースが完全にリセットされました", "success": True}
        raise HTTPException(status_code=500, detail="データベースのリセットに失敗しました")
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - 例外時のみ
        raise HTTPException(status_code=500, detail=f"データベースエラー: {exc}") from exc

