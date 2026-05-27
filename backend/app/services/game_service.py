"""ゲームデータの保存・読み込みを行うサービス。"""
import json
import logging
from typing import Any, Dict, List, Optional

from app.db.connection import get_connection


logger = logging.getLogger(__name__)


class GameService:
    def get_save_slots(self) -> List[Dict[str, Any]]:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    """
                    SELECT s.*, sd.player_name, sd.updated_at as last_save
                    FROM save_slots s
                    LEFT JOIN save_data sd ON s.slot_number = sd.slot_number
                    ORDER BY s.slot_number
                    """
                )
                slots: list[dict[str, Any]] = []
                for row in cursor.fetchall():
                    slot = dict(row)
                    slot["has_data"] = bool(slot.get("last_save"))
                    slots.append(slot)
                return slots
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("セーブスロット取得に失敗")
            return []

    def save_game_state(self, slot_number: int, player_name: str, birth_month: int, game_state_data: Dict[str, Any]) -> bool:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    """
                    UPDATE save_slots
                    SET player_name = ?, birth_month = ?, updated_at = datetime('now')
                    WHERE slot_number = ?
                    """,
                    (player_name, birth_month, slot_number),
                )

                cursor.execute("DELETE FROM save_data WHERE slot_number = ?", (slot_number,))

                relationships_raw = game_state_data.get("relationships", [])
                if isinstance(relationships_raw, str):
                    relationships_json = relationships_raw
                    relationships_list = json.loads(relationships_raw) if relationships_raw else []
                else:
                    relationships_list = relationships_raw
                    relationships_json = json.dumps(relationships_raw)

                cursor.execute(
                    """
                    INSERT INTO save_data (
                        slot_number, player_name, research_skill, social_skill,
                        professor_affection, stress_level, day_count, current_week,
                        current_month, current_semester, choices, current_day, lab_roles,
                        research_groups, action_count, completed_events, relationships, updated_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
                    """,
                    (
                        slot_number,
                        player_name,
                        game_state_data.get("research_skill", 20),
                        game_state_data.get("social_skill", 30),
                        game_state_data.get("professor_affection", 50),
                        game_state_data.get("stress_level", 30),
                        game_state_data.get("day_count", 1),
                        game_state_data.get("current_week", 1),
                        game_state_data.get("current_month", "4月"),
                        game_state_data.get("current_semester", "前期"),
                        game_state_data.get("choices", "[]"),
                        game_state_data.get("current_day", "tuesday"),
                        game_state_data.get("lab_roles", "[]"),
                        game_state_data.get("research_groups", "[]"),
                        game_state_data.get("action_count", 0),
                        game_state_data.get("completed_events", "[]"),
                        relationships_json,
                    ),
                )

                if relationships_list:
                    for relationship in relationships_list:
                        cursor.execute(
                            """
                            INSERT OR REPLACE INTO character_relationships (
                                slot_number, character_id, character_name, friendship_level, trust_level,
                                intimacy_level, is_dating, has_been_confessed, last_interaction, conversation_count,
                                favorite_topics, disliked_topics, updated_at
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
                            """,
                            (
                                slot_number,
                                relationship.get("characterId", ""),
                                relationship.get("characterName", ""),
                                relationship.get("friendshipLevel", 0),
                                relationship.get("trustLevel", 0),
                                relationship.get("intimacyLevel", 0),
                                1 if relationship.get("isDating", False) else 0,
                                1 if relationship.get("hasBeenConfessed", False) else 0,
                                relationship.get("lastInteraction", ""),
                                relationship.get("conversationCount", 0),
                                json.dumps(relationship.get("favoriteTopics", [])),
                                json.dumps(relationship.get("dislikedTopics", [])),
                            ),
                        )
            return True
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("ゲームデータ保存に失敗")
            return False

    def load_game_state(self, slot_number: int) -> Optional[Dict[str, Any]]:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM save_slots WHERE slot_number = ?", (slot_number,))
                slot_info = cursor.fetchone()
                if not slot_info:
                    return None

                cursor.execute("SELECT * FROM save_data WHERE slot_number = ?", (slot_number,))
                save_data = cursor.fetchone()
                if not save_data:
                    return None

                cursor.execute(
                    """
                    SELECT character_id, character_name, friendship_level, trust_level, intimacy_level,
                           is_dating, has_been_confessed, last_interaction, conversation_count, favorite_topics, disliked_topics
                    FROM character_relationships
                    WHERE slot_number = ?
                    """,
                    (slot_number,),
                )

                relationships = []
                for rel in cursor.fetchall():
                    relationships.append(
                        {
                            "characterId": rel["character_id"],
                            "characterName": rel["character_name"],
                            "friendshipLevel": rel["friendship_level"],
                            "trustLevel": rel["trust_level"],
                            "intimacyLevel": rel["intimacy_level"],
                            "isDating": bool(rel["is_dating"]),
                            "hasBeenConfessed": bool(rel["has_been_confessed"]),
                            "lastInteraction": rel["last_interaction"] or "",
                            "conversationCount": rel["conversation_count"],
                            "favoriteTopics": json.loads(rel["favorite_topics"]) if rel["favorite_topics"] else [],
                            "dislikedTopics": json.loads(rel["disliked_topics"]) if rel["disliked_topics"] else [],
                        }
                    )

                game_data = dict(save_data)
                game_data["relationships"] = relationships
                return {"slot_info": dict(slot_info), "game_data": game_data}
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("ゲームデータ読み込みに失敗")
            return None

    def delete_save_state(self, slot_number: int) -> bool:
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM save_data WHERE slot_number = ?", (slot_number,))
                cursor.execute(
                    """
                    UPDATE save_slots
                    SET player_name = NULL, birth_month = NULL, updated_at = datetime('now')
                    WHERE slot_number = ?
                    """,
                    (slot_number,),
                )
            return True
        except Exception:  # pragma: no cover - 例外時のみ
            logger.exception("セーブデータ削除に失敗")
            return False
