// birthday.ts - 誕生日会話

import type { GameConversationData } from '@/types/game';
import { getRoomBackgroundUrl, getRoomForConversation } from '../../../utils/RoomManager';

// 共通設定
const ROOM = getRoomForConversation('birthday');
const COMMON_SETTINGS = {
  lab: {
    backgroundUrl: getRoomBackgroundUrl(ROOM), // 部屋に応じた背景
    typingSpeed: 35,
  },
};

// プレイヤー名を取得する関数
function getPlayerName(): string {
  try {
    const gameState = JSON.parse(localStorage.getItem('isdl_game_state') || '{}');
    return gameState.playerName || 'あなた';
  } catch {
    return 'あなた';
  }
}

// 誕生日会話を動的に生成する関数
export function createBirthdayConversation(): GameConversationData {
  const playerName = getPlayerName();
  
  return {
    id: 9999,
    title: "誕生日パーティー",
    description: "研究室のメンバーが誕生日を祝ってくれる特別な会話",
    chapter: "tutorial",
    dialogues: [
      {
        id: "birthday_1",
        characterId: "professor",
        text: `おや、${playerName}さん！今日は特別な日ね。`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_2",
        characterId: "student_18",
        text: `お誕生日おめでとう！${playerName}さん！`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_3",
        characterId: "student_01",
        text: `誕生日パーティーを開こうぜ！${playerName}さん、おめでとう！`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_4",
        characterId: "professor",
        text: `研究室のメンバー全員で${playerName}さんの誕生日を祝いましょう。`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_5",
        characterId: "student_12",
        text: `ケーキも用意したよ！${playerName}さん、素敵な一年になりますように！`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_6",
        characterId: "student_14",
        text: `${playerName}さん、お誕生日おめでとう！これからもよろしくね！`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_7",
        characterId: "professor",
        text: `今年1年はどのような年にしたいかしら？${playerName}さん。`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        choices: [
          {
            id: "birthday_choice_1",
            text: "「新しいことに挑戦したいです！」",
            effect: {
              stressChange: 5,
              relationshipChange: { characterId: "professor", change: 5 },
              researchProgressChange: 10,
            },
            nextDialogueId: "birthday_8_challenge",
          },
          {
            id: "birthday_choice_2",
            text: "「仲間ともっと交流したいです！」",
            effect: {
              stressChange: -3,
              relationshipChange: { characterId: "professor", change: 5 },
            },
            nextDialogueId: "birthday_8_social",
          },
        ],
      },
      {
        id: "birthday_8_challenge",
        characterId: "professor",
        text: `素晴らしい目標ね。私たちも全力でサポートするわ、${playerName}さん。`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_8_social",
        characterId: "student_12",
        text: `それはいいですね！みんなで楽しい時間を過ごしましょう、${playerName}さん！`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "birthday_9",
        characterId: "professor",
        text: `改めて、${playerName}さん、お誕生日おめでとうございます。これからの一年が素晴らしいものになりますように。`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },

    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["誕生日", "特別", "研究室"],
      estimatedDuration: 1,
      requiredProgress: 0,
    },
  };
}
