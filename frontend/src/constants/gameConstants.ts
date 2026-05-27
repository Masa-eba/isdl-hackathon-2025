// gameConstants.ts - ゲーム関連の定数

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export const GAME_CONSTANTS = {
  // API設定
  API_BASE_URL,
  
  // ローカルストレージキー
  STORAGE_KEYS: {
    GAME_STATE: 'isdl_game_state',
    TIME_STATE: 'isdl_time_state',
    DEVELOPER_MODE: 'isdl_developer_mode'
  },

  // BGMパス
  BGM_PATHS: {
    TITLE: '/audio/bgm/title.mp3',
    PROLOGUE: '/audio/bgm/prologue.mp3',
    MAIN_GAME: '/audio/bgm/main_game.mp3',
    CONVERSATION: '/audio/bgm/conversation.mp3',
    EPILOGUE: '/audio/bgm/epilogue.mp3',
    ENDING: '/audio/bgm/ending.mp3'
  },

  // BGM設定
  BGM_SETTINGS: {
    DEFAULT_VOLUME: 0.5,
    FADE_DURATION: 1000, // ミリ秒
    LOOP: true
  },

  // 効果音パス
  SFX_PATHS: {
    PUSH_BUTTON: '/audio/sfx/push_button.mp3',
    TYPING: '/audio/sfx/typing.mp3'
  },

  // 効果音設定
  SFX_SETTINGS: {
    DEFAULT_VOLUME: 0.7,
    MAX_CONCURRENT: 5
  }
} as const;
