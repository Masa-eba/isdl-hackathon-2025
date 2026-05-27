// RoomManager.ts - 部屋管理ユーティリティ

import { getRoomById } from '../data/rooms';
import type { Room } from '../types/game';

// 会話の種類に応じた部屋のマッピング
const CONVERSATION_ROOM_MAPPING: Record<string, string> = {
  // 研究室発対面・歓迎関連
  'lab_orientation': 'seminar_room_large',
  'welcome_party': 'lounge',
  
  // 役割・研究班選択（運営会議）
  'role_selection': 'lounge',
  'research_group_selection': 'lounge',
  
  // 発表・ゼミ関連
  'monthly_presentation_m1': 'seminar_room_large',
  'monthly_presentation_mid': 'seminar_room_large',
  'bachelor_presentation': 'seminar_room_large',
  'cv_presentation': 'seminar_room_large',
  'thesis_presentation': 'main_room',
  'paper_reading': 'main_room',
  'basic_seminar': 'meeting_room_small',
  
  // 個別指導・相談
  'thesis_consultation': 'professor_office_entrance',
  'cv_rehearsal': 'professor_office_entrance',
  'thesis_rehearsal': 'professor_office_entrance',
  'bachelor_rehearsal': 'professor_office_entrance',
  
  // 研究活動（メインルーム）
  'research_continuation': 'main_room',
  'paper_reading_creation': 'main_room',
  
  // イベント・パーティー
  'friendship_party': 'lounge',
  'year_end_party': 'lounge',
  'hackathon': 'main_room',
  
  // その他
  'tutorial': 'main_room',
  'prologue': 'main_room',
  'epilogue': 'main_room',
  'birthday': 'lounge',
};

// キャラクターの役割に応じた部屋のマッピング
const ROLE_ROOM_MAPPING: Record<string, string> = {
  'chief': 'lounge',        // チーフは運営会議でコモンスペース
  'media': 'main_room',             // メディアはメインルーム
  'infrastructure': 'main_room',    // インフラはメインルーム
  'intellectual_property': 'main_room', // 知的財産もメインルーム
  'meeting': 'lounge',     // ミーティングはコモンスペース
  'tex': 'main_room',              // Texはメインルーム
  'event': 'lounge',       // イベントはコモンスペース
};

// 研究班に応じた部屋のマッピング
const RESEARCH_GROUP_ROOM_MAPPING: Record<string, string> = {
  'opt': 'lounge',    // Opt班はメインルーム
  'rec': 'lounge',    // Rec班はメインルーム
  'gen': 'lounge',    // Gen班はメインルーム
  'bio': 'lounge',    // Bio班もメインルーム
};

/**
 * 会話の章やイベントに基づいて適切な部屋を取得する
 */
export function getRoomForConversation(chapter: string, eventId?: string): Room | null {
  // イベントIDが指定されている場合は、それを優先
  const roomId = eventId ? CONVERSATION_ROOM_MAPPING[eventId] : CONVERSATION_ROOM_MAPPING[chapter];
  
  if (roomId) {
    return getRoomById(roomId) || null;
  }
  
  // デフォルトはメインルーム（メインルーム）
  return getRoomById('main_room') || null;
}

/**
 * キャラクターの役割に基づいて適切な部屋を取得する
 */
export function getRoomForRole(roles: string[]): Room | null {
  for (const role of roles) {
    const roomId = ROLE_ROOM_MAPPING[role];
    if (roomId) {
      return getRoomById(roomId) || null;
    }
  }
  
  // デフォルトはメインルーム（メインルーム）
  return getRoomById('main_room') || null;
}

/**
 * 研究班に基づいて適切な部屋を取得する
 */
export function getRoomForResearchGroup(researchGroup: string): Room | null {
  const roomId = RESEARCH_GROUP_ROOM_MAPPING[researchGroup];
  
  if (roomId) {
    return getRoomById(roomId) || null;
  }
  
  // デフォルトはメインルーム（メインルーム）
  return getRoomById('main_room') || null;
}

/**
 * 部屋の背景画像URLを取得する
 */
export function getRoomBackgroundUrl(room: Room | null): string {
  return room?.imageUrl || '/images/room/placeholder.svg';
}

/**
 * 会話の状況に応じて最適な部屋を決定する
 */
export function determineOptimalRoom(
  chapter: string,
  eventId?: string,
  characterRoles?: string[],
  researchGroup?: string
): Room | null {
  // 優先順位: イベント > 章 > キャラクター役割 > 研究班 > デフォルト
  
  if (eventId) {
    const eventRoom = getRoomForConversation(chapter, eventId);
    if (eventRoom) return eventRoom;
  }
  
  const chapterRoom = getRoomForConversation(chapter);
  if (chapterRoom) return chapterRoom;
  
  if (characterRoles && characterRoles.length > 0) {
    const roleRoom = getRoomForRole(characterRoles);
    if (roleRoom) return roleRoom;
  }
  
  if (researchGroup) {
    const groupRoom = getRoomForResearchGroup(researchGroup);
    if (groupRoom) return groupRoom;
  }
  
  // デフォルトはメインルーム
  return getRoomById('main_room') || null;
}

/**
 * 部屋の説明文を取得する
 */
export function getRoomDescription(room: Room | null): string {
  return room?.description || '研究室の一室。';
}
