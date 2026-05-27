// apiService.ts - バックエンドAPIとの連携サービス

import { apiDelete, apiGet, apiPost, ApiError } from './httpClient';
import type { BackendLoadResponse } from '../types/save';

// プレイヤー情報の型定義
interface PlayerInfo {
  name: string;
  birth_month: number;
}

// セーブスロットの型定義
export interface SaveSlot {
  id: number;
  slot_number: number;
  slot_name: string;
  player_name: string | null;
  birth_month: number | null;
  created_at: string;
  updated_at: string;
  has_data: boolean;
  last_save?: string;
}

// セーブデータの型定義
export interface SaveData {
  slot_number: number;
  player_name: string;
  birth_month: number;
  research_skill: number;
  social_skill: number;
  professor_affection: number;
  stress_level: number;
  day_count: number;
  current_week: number;
  current_month: string;
  current_semester: string;
  choices: string;
  current_day: string;
  lab_roles: string;
  research_groups: string;
  action_count: number;
  completed_events: string;
  relationships: string;
}

// セーブスロット一覧を取得
export async function getSaveSlots(): Promise<{ slots: SaveSlot[]; success: boolean }> {
  return apiGet<{ slots: SaveSlot[]; success: boolean }>('/save-slots');
}

// ゲームデータを保存
export async function saveGameData(saveData: SaveData): Promise<{ message: string; success: boolean }> {
  return apiPost<{ message: string; success: boolean }>('/save-game', saveData);
}

// ゲームデータを読み込み
export async function loadGameData(slotNumber: number): Promise<{ data: BackendLoadResponse; success: boolean }> {
  return apiGet<{ data: BackendLoadResponse; success: boolean }>(`/load-game/${slotNumber}`);
}

// セーブデータを削除
export async function deleteSaveData(slotNumber: number): Promise<{ message: string; success: boolean }> {
  return apiDelete<{ message: string; success: boolean }>(`/delete-save/${slotNumber}`);
}

// プレイヤー情報を保存
export async function savePlayerInfo(playerInfo: PlayerInfo): Promise<{ message: string; success: boolean }> {
  return apiPost<{ message: string; success: boolean }>('/player-info', playerInfo);
}

// プレイヤー情報を取得
export async function getPlayerInfo(): Promise<PlayerInfo | { message: string }> {
  return apiGet<PlayerInfo | { message: string }>('/player-info');
}

// バックエンドの接続状態を確認
export async function checkBackendConnection(): Promise<boolean> {
  try {
    await apiGet('/health');
    return true;
  } catch (error) {
    if (error instanceof ApiError) {
      console.warn('バックエンドに接続できません:', error.status, error.message);
    } else {
      console.warn('バックエンドに接続できません:', error);
    }
    return false;
  }
}
