// epilogue.ts - エピローグ会話

import type { GameConversationData } from '@/types/game';
import { gameStateManager } from '@/utils/GameState';
import { getRoomBackgroundUrl, getRoomForConversation } from '../../../utils/RoomManager';

// 共通設定
const ROOM = getRoomForConversation('epilogue');
const COMMON_SETTINGS = {
  room: {
    backgroundUrl: getRoomBackgroundUrl(ROOM),
    typingSpeed: 30,
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

// エピローグ会話を動的に生成する関数
export function createEpilogueConversation(): GameConversationData {
  const playerName = getPlayerName();
  const gameState = gameStateManager.getGameState();
  
  // ゲーム結果に基づいてエピローグを生成
  let endingType = "normal";
  if (gameState.researchSkill >= 80 && gameState.stressLevel <= 30) {
    endingType = "perfect";
  } else if (gameState.stressLevel >= 80) {
    endingType = "stressful";
  } else if (gameState.researchSkill <= 30) {
    endingType = "struggling";
  }
  
  const epilogueTexts = {
    perfect: {
      title: "完璧な一年間",
      description: "素晴らしい成果を上げた一年間",
      dialogues: [
        {
          id: "epilogue_1",
          characterId: "narrator",
          text: `${playerName}の研究室での一年間が終わろうとしていた。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_2",
          characterId: "professor",
          text: `${playerName}さん、本当に素晴らしい一年間だったわ。あなたの研究への情熱と努力には感心したの。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "right" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_3",
          characterId: "student_01",
          text: "一緒に研究できて本当に楽しかった。君の頑張りを見て、私も刺激を受けたよ。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "left" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_4",
          characterId: "narrator",
          text: "完璧な一年間。研究スキルも向上し、ストレスも上手くコントロールできた。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
      ]
    },
    stressful: {
      title: "ストレスの多い一年間",
      description: "ストレスを抱えながらも乗り越えた一年間",
      dialogues: [
        {
          id: "epilogue_1",
          characterId: "narrator",
          text: `${playerName}の研究室での一年間が終わろうとしていた。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_2",
          characterId: "professor",
          text: `${playerName}さん、一年間お疲れ様。ストレスを感じることも多かったと思うけど、よく頑張ったわね。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "right" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_3",
          characterId: "student_17",
          text: "ストレスを感じながらも頑張っていたね。これからはもっとリラックスして研究に取り組んでほしい。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "left" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_4",
          characterId: "narrator",
          text: "ストレスの多い一年間だったが、それでも最後まで諦めずに頑張った。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
      ]
    },
    struggling: {
      title: "苦労の多い一年間",
      description: "研究に苦労しながらも成長した一年間",
      dialogues: [
        {
          id: "epilogue_1",
          characterId: "narrator",
          text: `${playerName}の研究室での一年間が終わろうとしていた。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_2",
          characterId: "professor",
          text: `${playerName}さん、研究は大変だったと思うけど、最後まで諦めずに取り組んでくれてご苦労様ね。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "right" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_3",
          characterId: "student_14",
          text: "研究に苦労していたのは知っていた。でも、君の頑張りは確実に成長につながっているよ。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "left" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_4",
          characterId: "narrator",
          text: "研究に苦労した一年間だったが、その経験は確実に成長につながった。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
      ]
    },
    normal: {
      title: "充実した一年間",
      description: "バランスの取れた一年間",
      dialogues: [
        {
          id: "epilogue_1",
          characterId: "narrator",
          text: `${playerName}の研究室での一年間が終わろうとしていた。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_2",
          characterId: "professor",
          text: `${playerName}さん、一年間お疲れ様。バランスの取れた研究生活だったと思うわ。`,
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "right" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_3",
          characterId: "student_08",
          text: "一緒に研究できて楽しかった。君のバランスの取れたアプローチは参考になったよ。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          characterPosition: "left" as const,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
        {
          id: "epilogue_4",
          characterId: "narrator",
          text: "充実した一年間。研究と生活のバランスを保ちながら、着実に成長した。",
          backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
          typingSpeed: COMMON_SETTINGS.room.typingSpeed,
          showStatus: false,
        },
      ]
    }
  };
  
  const selectedEpilogue = epilogueTexts[endingType as keyof typeof epilogueTexts];
  
  return {
    id: 101,
    title: selectedEpilogue.title,
    description: selectedEpilogue.description,
    chapter: "epilogue",
    dialogues: selectedEpilogue.dialogues,
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["エピローグ", "終了", "研究室"],
      estimatedDuration: 2,
    },
  };
}
