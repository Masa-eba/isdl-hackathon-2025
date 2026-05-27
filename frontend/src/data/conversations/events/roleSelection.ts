// roleSelection.ts - 役割選択会話（楠木バージョン）

import type { GameConversationData } from '@/types/game';
import { getRoomBackgroundUrl, getRoomForConversation } from '../../../utils/RoomManager';

// 共通設定
const ROOM = getRoomForConversation('role_selection');
const COMMON_SETTINGS = {
  lab: {
    backgroundUrl: getRoomBackgroundUrl(ROOM), // 部屋に応じた背景
    typingSpeed: 35,
  },
};

// 役割選択会話
export const roleSelectionConversation: GameConversationData = {
  id: 1000,
  title: "研究室役割決定",
  description: "4年生として研究室の役割を決定する",
  chapter: "role_selection",
  dialogues: [
    {
      id: "role_selection_1",
      characterId: "student_12",
      text: "おはよう。今日は4年生として研究室の役割を決める日だ。",
      backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
      characterPosition: "left",
      typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
      showStatus: false,
    },
    {
      id: "role_selection_2",
      characterId: "student_12",
      text: "この研究室には様々な役割が存在する。チーフ、メディア、インフラ、知的財産、ミーティング、Tex、イベント、と多岐にわたる。",
      backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
      characterPosition: "left",
      typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
      showStatus: false,
    },
    {
      id: "role_selection_3",
      characterId: "student_12",
      text: "4年生は必ず二つの役割に所属することになる。自身の興味や適性を考慮し、慎重に選択してほしい。",
      backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
      characterPosition: "left",
      typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
      showStatus: false,
    },
    {
      id: "role_selection_4",
      characterId: "student_12",
      text: "役割を決めれば、その活動が一年間続く。責任を持って取り組むことが求められる。心して選ぶのだ。",
      backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
      characterPosition: "left",
      typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
      showStatus: false,
    },
    {
      id: "role_selection_5",
      characterId: "student_12",
      text: "それでは、君の能力と興味に合わせて、役割を選択してほしい。",
      backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
      characterPosition: "left",
      typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
      showStatus: false,
      showRoleSelection: true, // 役割選択画面を表示
    },
  ],
};
