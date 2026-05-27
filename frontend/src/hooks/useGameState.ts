// useGameState.ts - ゲーム状態管理のカスタムフック

import { useReducer, useEffect, useCallback } from 'react';
import { timeManager } from '../utils/TimeManager';
import { gameStateManager } from '../utils/GameState';
import { getSelectableItems } from '../data/actionSystem';
import type { TimeInfo } from '../types/time';
import type { ActionableItem } from '../data/actionSystem';
import type { GameState as GameStateType, Character } from '../types/game';
import type { GameConversationData } from '../types/game';

interface GameState {
  currentTime: TimeInfo;
  gameState: GameStateType;
  showConversation: boolean;
  conversation: GameConversationData | null;
  showMenu: boolean;
  selectableItems: ActionableItem[];
  selectedCharacter: Character | null;
  activeTab: 'events' | 'actions';
}

type GameAction =
  | { type: 'SET_CURRENT_TIME'; payload: TimeInfo }
  | { type: 'SET_GAME_STATE'; payload: GameStateType }
  | { type: 'SET_SHOW_CONVERSATION'; payload: boolean }
  | { type: 'SET_CONVERSATION'; payload: GameConversationData | null }
  | { type: 'SET_SHOW_MENU'; payload: boolean }
  | { type: 'SET_SELECTABLE_ITEMS'; payload: ActionableItem[] }
  | { type: 'SET_SELECTED_CHARACTER'; payload: Character | null }
  | { type: 'SET_ACTIVE_TAB'; payload: 'events' | 'actions' }
  | { type: 'UPDATE_SELECTABLE_ITEMS' }
  | { type: 'RESET_CONVERSATION' };

const initialState: GameState = {
  currentTime: timeManager.getCurrentTime(),
  gameState: gameStateManager.getGameState(),
  showConversation: false,
  conversation: null,
  showMenu: false,
  selectableItems: [],
  selectedCharacter: null,
  activeTab: 'events',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload };
    case 'SET_SHOW_CONVERSATION':
      return { ...state, showConversation: action.payload };
    case 'SET_CONVERSATION':
      return { ...state, conversation: action.payload };
    case 'SET_SHOW_MENU':
      return { ...state, showMenu: action.payload };
    case 'SET_SELECTABLE_ITEMS':
      return { ...state, selectableItems: action.payload };
    case 'SET_SELECTED_CHARACTER':
      return { ...state, selectedCharacter: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'UPDATE_SELECTABLE_ITEMS': {
      const items = getSelectableItems(
        state.gameState,
        state.currentTime,
        (eventId: string) => gameStateManager.isEventCompleted(eventId)
      );
      return { ...state, selectableItems: items };
    }
    case 'RESET_CONVERSATION':
      return { ...state, showConversation: false, conversation: null, selectedCharacter: null };
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // 初期化
  useEffect(() => {
    if (state.gameState.relationships.length === 0) {
      gameStateManager.initializeRelationships();
      dispatch({ type: 'SET_GAME_STATE', payload: gameStateManager.getGameState() });
    }
    dispatch({ type: 'UPDATE_SELECTABLE_ITEMS' });
  }, [state.gameState.relationships.length]);

  // エンディング条件チェック
  useEffect(() => {
    if (state.currentTime.isGameEnd) {
      // onGameEndは外部から渡される
    }
  }, [state.currentTime.isGameEnd]);

  const updateSelectableItems = useCallback(() => {
    dispatch({ type: 'UPDATE_SELECTABLE_ITEMS' });
  }, []);

  const updateGameState = useCallback(() => {
    dispatch({ type: 'SET_GAME_STATE', payload: gameStateManager.getGameState() });
  }, []);

  const updateTime = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_TIME', payload: timeManager.getCurrentTime() });
  }, []);

  return {
    currentTime: state.currentTime,
    gameState: state.gameState,
    showConversation: state.showConversation,
    conversation: state.conversation,
    showMenu: state.showMenu,
    selectableItems: state.selectableItems,
    selectedCharacter: state.selectedCharacter,
    activeTab: state.activeTab,
    dispatch,
    updateSelectableItems,
    updateGameState,
    updateTime,
  };
}
