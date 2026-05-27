// actionSystem.ts - 行動システム

import type { ActionData } from '../types/actions';
import type { GameEvent, EventConsequence } from '../types/events';
import type { LabRole, GameState } from '../types/game';
import type { TimeInfo } from '../types/time';
import { getAvailableActions } from './events/weeklyActions';
import { getEventsForWeek, createBirthdayEvent } from './events/events';
import { getRoleEventsForWeek } from './events/roleEvents';

// ゲーム状態マネージャーの型定義
interface GameStateManager {
  updateResearchSkill(change: number): void;
  updateSocialSkill(change: number): void;
  updateProfessorAffection(change: number): void;
  updateStressLevel(change: number): void;
  completeEvent(eventId: string): void;
  incrementActionCount(): void;
  getActionCount(): number;
}

// 行動可能なアイテム（行動またはイベント）
export interface ActionableItem {
  id: string;
  type: 'action' | 'event';
  name: string;
  description: string;
  icon: string;
  isRequired?: boolean;
  isCompleted?: boolean;
  data: ActionData | GameEvent;
  role?: LabRole;
}

// 利用可能な行動アイテムを取得
export function getAvailableActionableItems(
  gameState: GameState,
  currentTime: TimeInfo,
  isEventCompleted: (eventId: string) => boolean
): ActionableItem[] {
  const currentDay = gameState.currentDay;
  const labRoles = gameState.labRoles;
  
  const items: ActionableItem[] = [];
  const processedEventIds = new Set<string>();
  
  // 通常行動を追加
  const actions = getAvailableActions();
  // Available actions logged
  actions.forEach(action => {
    items.push({
      id: `action_${action.id}`,
      type: 'action',
      name: action.name,
      description: action.description,
      icon: action.icon,
      data: action
    });
  });
  
  // 基本イベントを追加
  const baseEvents = getEventsForWeek(currentTime.week);
  const dayEvents = baseEvents.filter(event => event.dayOfWeek === currentDay);
  
  dayEvents.forEach(event => {
    const isCompleted = isEventCompleted(event.id);
    processedEventIds.add(event.id);
    
    items.push({
      id: `event_${event.id}`,
      type: 'event',
      name: event.name,
      description: event.description,
      icon: '📅',
      isRequired: event.isRequired,
      isCompleted,
      data: event
    });
  });
  
  // 役割別イベントを追加
  const roleEvents = getRoleEventsForWeek(currentTime.week, labRoles);
  const dayRoleEvents = roleEvents.filter(event => event.dayOfWeek === currentDay);
  
  dayRoleEvents.forEach(event => {
    if (processedEventIds.has(event.id)) return;
    
    const isCompleted = isEventCompleted(event.id);
    processedEventIds.add(event.id);
    
    const role = labRoles.find((role: LabRole) => {
      const roleEvents = getRoleEventsForWeek(currentTime.week, [role]);
      return roleEvents.some(e => e.id === event.id);
    });
    
    items.push({
      id: `event_${event.id}`,
      type: 'event',
      name: event.name,
      description: event.description,
      icon: '📅',
      isRequired: event.isRequired,
      isCompleted,
      data: event,
      role
    });
  });
  
  // 誕生日イベントを追加
  const birthdayEvent = createBirthdayEvent();
  if (birthdayEvent) {
    const birthMonth = gameState.birthMonth;
    const currentMonth = currentTime.month;
    
    // 誕生月の週にのみ表示
    // birthMonthは1-12の数値、currentMonthは文字列なので変換が必要
    const monthNumberMap: { [key: string]: number } = {
      'april': 4, 'may': 5, 'june': 6, 'july': 7, 'august': 8, 'september': 9,
      'october': 10, 'november': 11, 'december': 12, 'january': 1, 'february': 2, 'march': 3
    };
    
    if (monthNumberMap[currentMonth] === birthMonth) {
      const hasOtherEvents = dayEvents.length > 0 || dayRoleEvents.length > 0;
      
      if (!hasOtherEvents) {
        const isCompleted = isEventCompleted(birthdayEvent.id);
        
        if (!isCompleted) {
          items.push({
            id: `event_${birthdayEvent.id}`,
            type: 'event',
            name: birthdayEvent.name,
            description: birthdayEvent.description,
            icon: '🎂',
            isRequired: birthdayEvent.isRequired,
            isCompleted,
            data: birthdayEvent
          });
        }
      }
    }
  }
  
  return items;
}

// 選択可能なアイテムを取得
export function getSelectableItems(
  gameState: GameState,
  currentTime: TimeInfo,
  isEventCompleted: (eventId: string) => boolean
): ActionableItem[] {
  const allItems = getAvailableActionableItems(gameState, currentTime, isEventCompleted);
  
  // Action count and items logged
  
  // 完了済みアイテムを除外
  const availableItems = allItems.filter(item => !item.isCompleted);
  
  // Available items logged
  
  return availableItems;
}

// 行動を実行
export function executeAction(
  item: ActionableItem,
  gameStateManager: GameStateManager,
): void {
  if (item.type === 'action') {
    const action = item.data as ActionData;
    
    // 同期とおしゃべりまたは先輩とおしゃべりの場合は、基本効果のみ適用（親密度は会話終了時に適用）
    if (action.id === 'chat_peer' || action.id === 'chat_senior') {
      // 基本の効果のみ適用（親密度は会話終了時に適用）
      gameStateManager.updateResearchSkill(action.researchSkillChange);
      gameStateManager.updateSocialSkill(action.socialSkillChange);
      gameStateManager.updateProfessorAffection(action.professorAffectionChange);
      gameStateManager.updateStressLevel(action.stressChange);
    } else {
      // 通常の行動
      gameStateManager.updateResearchSkill(action.researchSkillChange);
      gameStateManager.updateSocialSkill(action.socialSkillChange);
      gameStateManager.updateProfessorAffection(action.professorAffectionChange);
      gameStateManager.updateStressLevel(action.stressChange);
    }
    
  } else if (item.type === 'event') {
    const event = item.data as GameEvent;
    
    // イベントを完了として記録
    gameStateManager.completeEvent(event.id);
    
    // イベントの結果を適用
    if (event.consequences) {
      event.consequences.forEach((consequence: EventConsequence) => {
        switch (consequence.type) {
          case 'relationship':
            gameStateManager.updateProfessorAffection(consequence.amount);
            break;
          case 'progress':
            gameStateManager.updateResearchSkill(consequence.amount);
            break;
          case 'stress':
            gameStateManager.updateStressLevel(consequence.amount);
            break;
        }
      });
    }
  }
  
  // 行動回数を増加（おしゃべりは既にMainGameNew.tsxで増加済み）
  if (!(item.type === 'action' && (item.data as ActionData).id === 'chat_peer' || (item.data as ActionData).id === 'chat_senior')) {
    gameStateManager.incrementActionCount();
  }
}

// 次の日に進めるかチェック
export function canAdvanceToNextDay(gameStateManager: GameStateManager): boolean {
  const actionCount = gameStateManager.getActionCount();
  return actionCount >= 3;
}
