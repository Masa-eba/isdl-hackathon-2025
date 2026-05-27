// tutorial.ts - チュートリアル会話

import type { GameConversationData } from '@/types/game';
import { getRoomBackgroundUrl, getRoomForConversation } from '../../../utils/RoomManager';

// 共通設定
const ROOM = getRoomForConversation('tutorial');
const COMMON_SETTINGS = {
  lab: {
    backgroundUrl: getRoomBackgroundUrl(ROOM), // 部屋に応じた背景

    typingSpeed: 35,
  },
};

// プレイヤー名取得
function getPlayerName(): string {
  try {
    const gameState = JSON.parse(localStorage.getItem('isdl_game_state') || '{}');
    return gameState.playerName || 'あなた';
  } catch {
    return 'あなた';
  }
}

// 選択肢
const CHOICES = {
  tutorial_approach: [
    {
      id: "tutorial_approach_1",
      text: "研究室で特に守らなければいけないルールはありますか？",
      effect: {},
      nextDialogueId: "tutorial_3_rule",
    },
    {
      id: "tutorial_approach_2",
      text: "研究室の見学がしたいです。",
      effect: {},
      nextDialogueId: "tutorial_3_tour",
    },
  ],
};

export function createTutorialConversation(): GameConversationData {
  const playerName = getPlayerName();

  return {
    id: 100,
    title: "研究室への第一歩",
    description: "研究室での初日、チュートリアル",
    chapter: "tutorial",
    dialogues: [
      {
        id: "tutorial_1",
        characterId: "professor",
        text: `やあ、よく来てくれましたね。${playerName}さんが新しい研究室メンバーですね。あらら、緊張していますか？`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "tutorial_2",
        characterId: "student_16",
        text: "今日は研究室の基本的なルールと設備について説明するよ。何か質問があれば遠慮なく聞いてくれやな！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: CHOICES.tutorial_approach,
        showStatus: true,
      },
      // 分岐1：ルール質問
      {
        id: "tutorial_3_rule",
        characterId: "professor",
        text: `あらら、いい質問ですね。研究室で一番大切なのは、まず挨拶をきちんとすることですね。
誰かに会ったら必ず挨拶をする、それだけでチーム内の信頼関係がぐっと変わるんですよ。`,
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "tutorial_3_rule_student_16",
      },
      {
        id: "tutorial_3_rule_student_16",
        characterId: "student_16",
        text: "おお、それは確かに大事やな！それ意識したら安心して研究できそうやな！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "tutorial_4",
      },
      // 分岐2：見学希望
      {
        id: "tutorial_3_tour",
        characterId: "professor",
        text: "あらら、見学ですね。まあ、時間がある時に紹介しましょうか…",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "tutorial_3_tour_student_16",
      },
      {
        id: "tutorial_3_tour_student_16",
        characterId: "student_16",
        text: "ほう、そやな！今日は基本的な説明だけにして、後でゆっくり見学しようやな！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "tutorial_4",
      },
      // 共通続き
      {
        id: "tutorial_4",
        characterId: "professor",
        text: "研究室では、チームワークが大切ですね。お互いに協力して、良い研究をしていきましょう。あらら、緊張しなくても大丈夫ですよ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "tutorial_5",
      },
      {
        id: "tutorial_5",
        characterId: "student_16",
        text: "せやな！これでチュートリアルは終了やな！あとは自由に研究室内を探索してみようやな！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["チュートリアル", "研究室", "導入"],
      estimatedDuration: 2,
      requiredProgress: 0,
    },
  };
}
