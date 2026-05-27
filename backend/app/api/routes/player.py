"""プレイヤー情報の管理ルーター。"""
from fastapi import APIRouter, HTTPException

from app.schemas.player import PlayerInfo
from app.services.player_service import PlayerService


router = APIRouter(prefix="/api", tags=["player"])

_player_service = PlayerService()


@router.post("/player-info")
def save_player_info(player_info: PlayerInfo):
    try:
        success = _player_service.save_player_info(player_info.name, player_info.birth_month)
        if success:
            return {"message": "プレイヤー情報が保存されました", "success": True}
        raise HTTPException(status_code=500, detail="プレイヤー情報の保存に失敗しました")
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - 例外時のみ
        raise HTTPException(status_code=500, detail=f"データベースエラー: {exc}") from exc


@router.get("/player-info")
def get_player_info():
    try:
        player_info = _player_service.get_player_info()
        if player_info:
            return player_info
        return {"message": "プレイヤー情報が見つかりません"}
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - 例外時のみ
        raise HTTPException(status_code=500, detail=f"データベースエラー: {exc}") from exc

