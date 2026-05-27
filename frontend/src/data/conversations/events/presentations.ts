// presentations.ts - プレゼン会話

import type { GameConversationData } from '@/types/game';
import { getRoomBackgroundUrl, getRoomForConversation } from '../../../utils/RoomManager';

// 共通設定
const ROOM = getRoomForConversation('presentations');
const COMMON_SETTINGS = {
  lab: {
    backgroundUrl: getRoomBackgroundUrl(ROOM), // 部屋に応じた背景
    typingSpeed: 35,
  },
};

// 選択肢の定義
const CHOICES = {
  // D-day選択肢
  dday_response: [
    {
      id: "dday_response_1",
      text: "「はい、よろしくお願いします！」",
      effect: {
        relationshipChange: { characterId: "professor", change: 10 },
        stressChange: -3,
      },
      nextDialogueId: "dday_3_positive",
    },
    {
      id: "dday_response_2",
      text: "「少し緊張しています...」",
      effect: {
        relationshipChange: { characterId: "professor", change: 5 },
        stressChange: 2,
      },
      nextDialogueId: "dday_3_negative",
    },
  ],
};

// プレゼン関連の会話データ
export const presentationConversations: GameConversationData[] = [
  // D-dayイベント
  {
    id: 200,
    title: "D-day - 研究開始",
    description: "本格的な研究活動の開始",
    chapter: "d_day",
    dialogues: [
      {
        id: "dday_1",
        characterId: "professor",
        text: "ややあ、よくきてくれたわね。ようこそ研究室！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: 40,
        showStatus: true,
      },
      {
        id: "dday_2",
        characterId: "professor",
        text: "今日からあなたも正式な研究メンバーよ。一緒に素晴らしい研究をしていきましょう。準備はできているかしら？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: CHOICES.dday_response,
        showStatus: true,
      },
      {
        id: "dday_3_positive",
        characterId: "professor",
        text: "その意気よ！あなたの積極的な姿勢が嬉しいわ。きっと素晴らしい研究ができるでしょうね。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "dday_4",
      },
      {
        id: "dday_3_negative",
        characterId: "professor",
        text: "緊張するのは当然よ。でも大丈夫、あなたならきっとできるわ。一緒に頑張りましょう。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "dday_4",
      },
      {
        id: "dday_4",
        characterId: "professor",
        text: "よし！それでは最初の研究テーマについて話しましょう。あなたの興味に合わせて、いくつか提案があるの。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["D-day", "研究開始", "歓迎"],
      estimatedDuration: 3,
      requiredProgress: 0,
    },
  },

  // コンピュータビジョン準備
  {
    id: 2001,
    title: "レジュメ・パワポ作成",
    description: "コンピュータビジョンの発表準備",
    chapter: "cv_preparation",
    dialogues: [
      {
        id: "cv_prep_1",
        characterId: "professor",
        text: "コンピュータビジョンの発表が近づいているわね。準備は順調かしら？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "cv_prep_2",
        characterId: "professor",
        text: "レジュメとパワーポイント、どちらから始める？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "cv_prep_choice_1",
            text: "レジュメから作成する",
            effect: {
              researchProgressChange: 12,
              stressChange: 5,
            },
            nextDialogueId: "cv_prep_3_resume",
          },
          {
            id: "cv_prep_choice_2",
            text: "パワーポイントから作成する",
            effect: {
              researchProgressChange: 10,
              stressChange: 3,
            },
            nextDialogueId: "cv_prep_3_powerpoint",
          },
        ],
        showStatus: true,
      },
      {
        id: "cv_prep_3_resume",
        characterId: "professor",
        text: "レジュメから始めるのは良い判断ね。内容を整理してからスライドを作るのが効率的よ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "cv_prep_4",
      },
      {
        id: "cv_prep_3_powerpoint",
        characterId: "professor",
        text: "パワーポイントから始めるのも良い方法よ。視覚的に整理できるからね。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "cv_prep_4",
      },
      {
        id: "cv_prep_4",
        characterId: "professor",
        text: "頑張って準備してちょうだい。あなたの発表を楽しみにしているわ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["コンピュータビジョン", "準備", "発表"],
      estimatedDuration: 2,
      requiredProgress: 20,
    },
  },

  // 院生リハーサル
  {
    id: 2002,
    title: "院生リハーサル",
    description: "院生の前でリハーサルを行う",
    chapter: "cv_rehearsal",
    dialogues: [
      {
        id: "cv_rehearsal_1",
        characterId: "student_11",
        text: "今日は院生リハーサルの日だね。緊張するだろうけど、頑張って。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "cv_rehearsal_2",
        characterId: "student_11",
        text: "リハーサルで何か改善点があれば、遠慮なく言うよ。どう？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "cv_rehearsal_choice_1",
            text: "「厳しい意見もお願いします」",
            effect: {
              relationshipChange: { characterId: "assistant", change: 10 },
              researchProgressChange: 8,
            },
            nextDialogueId: "cv_rehearsal_3_honest",
          },
          {
            id: "cv_rehearsal_choice_2",
            text: "「優しくお願いします」",
            effect: {
              relationshipChange: { characterId: "assistant", change: 5 },
              stressChange: -3,
            },
            nextDialogueId: "cv_rehearsal_3_gentle",
          },
        ],
        showStatus: true,
      },
      {
        id: "cv_rehearsal_3_honest",
        characterId: "student_11",
        text: "その姿勢が良い！厳しい意見が君の成長につながるよ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "cv_rehearsal_4",
      },
      {
        id: "cv_rehearsal_3_gentle",
        characterId: "student_11",
        text: "分かった。でも、少しは厳しい意見も言うからね。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "cv_rehearsal_4",
      },
      {
        id: "cv_rehearsal_4",
        characterId: "student_11",
        text: "リハーサルお疲れ様。本番ではもっと良くなるよ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["院生リハーサル", "発表", "フィードバック"],
      estimatedDuration: 2,
      requiredProgress: 25,
    },
  },

  // コンピュータビジョン当日
  {
    id: 2003,
    title: "コンピュータビジョン当日",
    description: "コンピュータビジョンの発表本番",
    chapter: "cv_presentation",
    dialogues: [
      {
        id: "cv_presentation_1",
        characterId: "professor",
        text: "コンピュータビジョンの発表、いよいよ本番ね。準備は万全かしら？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "cv_presentation_2",
        characterId: "professor",
        text: "緊張しているでしょうけど、あなたならきっとできるわ。どう感じている？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "cv_presentation_choice_1",
            text: "「緊張していますが、頑張ります！」",
            effect: {
              relationshipChange: { characterId: "professor", change: 8 },
              stressChange: -2,
            },
            nextDialogueId: "cv_presentation_3_positive",
          },
          {
            id: "cv_presentation_choice_2",
            text: "「自信があります！」",
            effect: {
              relationshipChange: { characterId: "professor", change: 12 },
              stressChange: 3,
            },
            nextDialogueId: "cv_presentation_3_confident",
          },
        ],
        showStatus: true,
      },
      {
        id: "cv_presentation_3_positive",
        characterId: "professor",
        text: "その意気よ！あなたの研究は素晴らしいものね。自信を持って発表してちょうだい。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "cv_presentation_4",
      },
      {
        id: "cv_presentation_3_confident",
        characterId: "professor",
        text: "その自信が良いわ！あなたの研究への情熱が伝わるの。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "cv_presentation_4",
      },
      {
        id: "cv_presentation_4",
        characterId: "professor",
        text: "発表お疲れ様。素晴らしい発表だったわ。あなたの成長を感じたの。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["コンピュータビジョン", "発表", "本番"],
      estimatedDuration: 3,
      requiredProgress: 30,
    },
  },
];
