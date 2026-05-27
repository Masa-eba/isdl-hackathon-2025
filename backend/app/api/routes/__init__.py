"""APIルーターの集約ポイント。"""
from fastapi import APIRouter

from .game import router as game_router
from .health import router as health_router
from .player import router as player_router


router = APIRouter()
router.include_router(game_router)
router.include_router(player_router)
router.include_router(health_router)

__all__ = ["router"]
