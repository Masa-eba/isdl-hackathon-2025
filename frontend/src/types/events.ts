// events.ts - イベントシステムの型定義

import type { Month } from './time';

export type EventConsequenceType =
  | 'relationship'
  | 'progress'
  | 'stress'
  | 'skill'
  | 'role_assignment'
  | 'research_group_assignment'
  | 'unlock';

export interface EventConsequence {
  type: EventConsequenceType;
  value: string;
  amount: number;
  message?: string;
}


// イベントの詳細情報
export interface GameEvent {
  id: string;
  type: string;
  name: string;
  description: string;
  month: Month;
  week: number;              // その月の何週目か
  dayOfWeek: 'tuesday' | 'wednesday';
  isRequired: boolean;       // 必須イベントかどうか
  prerequisites?: string[];  // 前提条件
  consequences?: EventConsequence[];
  conversationId: number;    // 対応する会話ID
}
