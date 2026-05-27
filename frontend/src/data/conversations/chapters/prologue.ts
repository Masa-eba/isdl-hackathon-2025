// prologue.ts - プロローグ会話（同期＋教授追加版）

import type { GameConversationData } from '@/types/game';
import { getRoomBackgroundUrl, getRoomForConversation } from '../../../utils/RoomManager';


// 共通設定
const ROOM = getRoomForConversation('prologue');

const COMMON_SETTINGS = {
  room: {
    backgroundUrl: getRoomBackgroundUrl(ROOM),
    typingSpeed: 30,
  },
};

function getPlayerName(): string {
  try {
    const gameState = JSON.parse(localStorage.getItem('isdl_game_state') || '{}');
    return gameState.playerName || 'あなた';
  } catch {
    return 'あなた';
  }
}

export function createPrologueConversation(): GameConversationData {
  const playerName = getPlayerName();

  return {
    id: 99,
    title: "研究室への道のり",
    description: "研究室配属前のプロローグ",
    chapter: "prologue",
    dialogues: [
      {
        id: "prologue_1",
        characterId: "narrator",
        text: `${playerName}は指定された教室――KC101に足を踏み入れた。扉を開けると、机の上には分厚い研究資料が山のように積まれている。新しい世界へと飛び込む緊張感が、さらに胸を高鳴らせた。`,
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_2",
        characterId: "narrator",
        text: "イスに腰掛けると、次々と同期たちも集まってきた。小声で交わされる『よろしくね』や『どんな研究するのかな？』という言葉に、不安と期待が入り混じった空気が漂う。",
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_3",
        characterId: "student_03",
        text: "やあ、初めまして！同じチームになるかもしれないね。",
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_4",
        characterId: "student_09",
        text: "よろしく！研究室って、思ったより広くてびっくりだな。",
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_5",
        characterId: "student_03",
        text: "そうやな、資料もいっぱいでちょっと緊張するわ。",
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_6",
        characterId: "professor",
        text: "皆さん、今日からよろしくお願いしますね。研究はもちろん大事ですけど、お互いに助け合いながら楽しむことも忘れないでください。",
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: true,
      },
      {
        id: "prologue_7",
        characterId: "narrator",
        text: "教授の言葉に、同期たちの表情も少し和らぎ、緊張が柔らいでいく。",
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_8",
        characterId: "narrator",
        text: "続いて先輩たちの自己紹介が始まった。明るく話す人、落ち着いて丁寧に説明する人、ちょっとユーモアを交えて笑いを取る人……一人ひとりに個性があって、この研究室にはいろいろな人が集まっているのだと感じさせる。",
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_9",
        characterId: "narrator",
        text: `気づけば${playerName}の心には“ここならきっと楽しく研究ができる”という期待が芽生えていた。`,
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
      {
        id: "prologue_10",
        characterId: "narrator",
        text: `こうして、${playerName}の研究室での新しい生活が始まった。`,
        backgroundUrl: COMMON_SETTINGS.room.backgroundUrl,
        typingSpeed: COMMON_SETTINGS.room.typingSpeed,
        showStatus: false,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["プロローグ", "導入", "研究室"],
      estimatedDuration: 3,
    },
  };
}
