"""データベーススキーマの作成やリセットを担当。"""
from sqlite3 import Connection
from typing import Iterable

from app.db.connection import get_connection


def _create_tables(conn: Connection) -> None:
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS save_slots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slot_number INTEGER UNIQUE NOT NULL,
            slot_name TEXT,
            player_name TEXT,
            birth_month INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS save_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slot_number INTEGER NOT NULL,
            player_name TEXT NOT NULL,
            research_skill INTEGER DEFAULT 20,
            social_skill INTEGER DEFAULT 30,
            professor_affection INTEGER DEFAULT 50,
            stress_level INTEGER DEFAULT 30,
            day_count INTEGER DEFAULT 1,
            current_week INTEGER DEFAULT 1,
            current_month TEXT DEFAULT '4月',
            current_semester TEXT DEFAULT '前期',
            choices TEXT DEFAULT '[]',
            current_day TEXT DEFAULT 'tuesday',
            lab_roles TEXT DEFAULT '[]',
            research_groups TEXT DEFAULT '[]',
            action_count INTEGER DEFAULT 0,
            completed_events TEXT DEFAULT '[]',
            relationships TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (slot_number) REFERENCES save_slots (slot_number)
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS player_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            birth_month INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS character_relationships (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slot_number INTEGER NOT NULL,
            character_id TEXT NOT NULL,
            character_name TEXT NOT NULL,
            friendship_level INTEGER DEFAULT 0,
            trust_level INTEGER DEFAULT 0,
            intimacy_level INTEGER DEFAULT 0,
            is_dating BOOLEAN DEFAULT 0,
            has_been_confessed BOOLEAN DEFAULT 0,
            last_interaction TEXT,
            conversation_count INTEGER DEFAULT 0,
            favorite_topics TEXT DEFAULT '[]',
            disliked_topics TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (slot_number) REFERENCES save_slots (slot_number),
            UNIQUE(slot_number, character_id)
        )
        """
    )


def _seed_save_slots(conn: Connection, total_slots: int = 3) -> None:
    cursor = conn.cursor()
    for slot_number in range(1, total_slots + 1):
        cursor.execute(
            """
            INSERT OR IGNORE INTO save_slots (slot_number, slot_name)
            VALUES (?, ?)
            """,
            (slot_number, f"スロット {slot_number}"),
        )


def initialize_database() -> None:
    """テーブルを作成し、デフォルトデータを用意。"""
    with get_connection() as conn:
        _create_tables(conn)
        _seed_save_slots(conn)


def reset_database() -> None:
    """全テーブルを削除して再初期化。"""
    with get_connection() as conn:
        cursor = conn.cursor()
        for table in ("save_data", "save_slots", "character_relationships", "player_info"):
            cursor.execute(f"DROP TABLE IF EXISTS {table}")

    initialize_database()

