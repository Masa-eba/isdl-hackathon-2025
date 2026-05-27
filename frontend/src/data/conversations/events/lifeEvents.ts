// lifeEvents.ts - 生活イベント会話

import type { GameConversationData } from '@/types/game';
import { getRoomBackgroundUrl, getRoomForConversation } from '../../../utils/RoomManager';

// 共通設定
const ROOM = getRoomForConversation('life_events');
const COMMON_SETTINGS = {
  lab: {
    backgroundUrl: getRoomBackgroundUrl(ROOM), // 部屋に応じた背景
    typingSpeed: 35,
  },
};

// 生活イベント関連の会話データ
export const lifeEventConversations: GameConversationData[] = [
  // 人生イベント - 就活
  {
    id: 300,
    title: "就職活動の選択",
    description: "就職活動に関する重要な決断",
    chapter: "life_events",
    dialogues: [
      {
        id: "job_hunting_1",
        characterId: "student_11",
        text: "就職活動、どう？もう始めているかい？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "job_hunting_2",
        characterId: "student_11",
        text: "研究と就活の両立は大変だけど、計画的に進めることが大切だよ。どうする？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "job_hunting_choice_1",
            text: "就職活動を優先する",
            effect: {
              stressChange: 10,
              researchProgressChange: -5,
            },
            nextDialogueId: "job_hunting_result_work",
          },
          {
            id: "job_hunting_choice_2",
            text: "研究を優先する",
            effect: {
              stressChange: -5,
              researchProgressChange: 10,
            },
            nextDialogueId: "job_hunting_result_research",
          },
        ],
        showStatus: true,
      },
      {
        id: "job_hunting_result_work",
        characterId: "student_11",
        text: "就職活動を優先するのは良い判断だ。将来のことを考えると大切だね。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "job_hunting_end",
      },
      {
        id: "job_hunting_result_research",
        characterId: "student_11",
        text: "研究に集中するのも良い選択だ。成果が出れば就職にも有利になるよ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "job_hunting_end",
      },
      {
        id: "job_hunting_end",
        characterId: "student_11",
        text: "どちらを選んでも、君の判断を信じているよ。頑張ってくれ！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["就活", "人生イベント", "選択"],
      estimatedDuration: 2,
      requiredProgress: 30,
    },
  },

  // 人生イベント - 院試
  {
    id: 400,
    title: "大学院進学の決断",
    description: "大学院進学に関する重要な選択",
    chapter: "life_events",
    dialogues: [
      {
        id: "grad_school_1",
        characterId: "professor",
        text: "大学院進学について考えているかい？君の研究はとても興味深いものだ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "grad_school_2",
        characterId: "professor",
        text: "もし進学を考えているなら、準備を始める時期だ。どう思う？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "grad_school_choice_1",
            text: "大学院に進学する",
            effect: {
              researchProgressChange: 15,
              stressChange: 8,
            },
            nextDialogueId: "grad_school_result_continue",
          },
          {
            id: "grad_school_choice_2",
            text: "就職を選択する",
            effect: {
              stressChange: -3,
              researchProgressChange: -5,
            },
            nextDialogueId: "grad_school_result_work",
          },
        ],
        showStatus: true,
      },
      {
        id: "grad_school_result_continue",
        characterId: "professor",
        text: "素晴らしい決断だ！君の研究をさらに深めることができる。一緒に頑張ろう。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "grad_school_end",
      },
      {
        id: "grad_school_result_work",
        characterId: "professor",
        text: "就職も良い選択だ。君の研究経験は必ず社会で活かされる。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "grad_school_end",
      },
      {
        id: "grad_school_end",
        characterId: "professor",
        text: "君の選択を応援している。どんな道を選んでも、君ならきっと成功する。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["院試", "進学", "人生イベント"],
      estimatedDuration: 2,
      requiredProgress: 50,
    },
  },
  //追加
  {
    id: 4000,
    title: "ラボパーティー",
    description: "ラボパーティーに参加",
    chapter: "life_events",
    dialogues: [
      {
        id: "isdl_party_1",
        characterId: "professor",
        text: "ラボパーティー、どう？緊張している？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "isdl_party_2",
        characterId: "professor",
        text: "ラボパーティー、楽しんでくれ。研究室の雰囲気を知る良い機会だよ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "isdl_party_choice_1",
            text: "「少し緊張しています」",
            effect: {
              researchProgressChange: 15,
              stressChange: 8,
            },
            nextDialogueId: "isdl_party_result_continue",
          },
          {
            id: "isdl_party_choice_2",
            text: "「楽しく過ごしています！」",
            effect: {
              stressChange: -3,
              researchProgressChange: -5,
            },
            nextDialogueId: "isdl_party_result_work",
          },
        ],
        showStatus: true,
      },
      {
        id: "isdl_party_result_continue",
        characterId: "professor",
        text: "緊張するのは当然だ。でも大丈夫、みんな優しいから。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "isdl_party_end",
      },
      {
        id: "isdl_party_result_work",
        characterId: "professor",
        text: "その通りだ！楽しく過ごそう。これからよろしくね。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "right",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "isdl_party_end",
      },
      {
        id: "isdl_party_end",
        characterId: "professor",
        text: "ラボパーティーは新しい技術に触れる良い機会だ。楽しんでね！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["院試", "進学", "人生イベント"],
      estimatedDuration: 2,
      requiredProgress: 50,
    },
  },

  // 親睦会
  {
    id: 5002,
    title: "親睦会",
    description: "研究室の親睦会に参加",
    chapter: "friendship_party",
    dialogues: [
      {
        id: "friendship_party_1",
        characterId: "student_01",
        text: "親睦会、楽しんでくれ。研究室の雰囲気を知る良い機会だよ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "friendship_party_2",
        characterId: "student_01",
        text: "親睦会、どう？緊張している？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "friendship_party_choice_1",
            text: "「少し緊張しています」",
            effect: {
              relationshipChange: { characterId: "student", change: 5 },
              stressChange: -3,
            },
            nextDialogueId: "friendship_party_3_honest",
          },
          {
            id: "friendship_party_choice_2",
            text: "「楽しく過ごしています！」",
            effect: {
              relationshipChange: { characterId: "student", change: 10 },
              stressChange: -5,
            },
            nextDialogueId: "friendship_party_3_cheerful",
          },
        ],
        showStatus: true,
      },
      {
        id: "friendship_party_3_honest",
        characterId: "student_01",
        text: "緊張するのは当然だ。でも大丈夫、みんな優しいから。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "friendship_party_4",
      },
      {
        id: "friendship_party_3_cheerful",
        characterId: "student_01",
        text: "その通りだ！楽しく過ごそう。これからよろしくね。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "friendship_party_4",
      },
      {
        id: "friendship_party_4",
        characterId: "student_01",
        text: "研究室での一年間、一緒に頑張ろう。何か困ったことがあれば、いつでも相談してくれ。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["親睦会", "親睦", "交流"],
      estimatedDuration: 2,
      requiredProgress: 65,
    },
  },

  // ハッカソン
  {
    id: 5001,
    title: "ハッカソン",
    description: "ハッカソンに参加",
    chapter: "hackathon",
    dialogues: [
      {
        id: "hackathon_1",
        characterId: "student_01",
        text: "ハッカソンに参加するんだね！どんなプロジェクトを考えている？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
      {
        id: "hackathon_2",
        characterId: "student_01",
        text: "チームを組む？それとも個人で参加する？",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        choices: [
          {
            id: "hackathon_choice_1",
            text: "チームで参加する",
            effect: {
              relationshipChange: { characterId: "student", change: 15 },
              researchProgressChange: 8,
            },
            nextDialogueId: "hackathon_3_team",
          },
          {
            id: "hackathon_choice_2",
            text: "個人で参加する",
            effect: {
              researchProgressChange: 12,
              stressChange: 5,
            },
            nextDialogueId: "hackathon_3_individual",
          },
        ],
        showStatus: true,
      },
      {
        id: "hackathon_3_team",
        characterId: "student_01",
        text: "チームで参加するのは良い選択だ！一緒に頑張ろう。",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "hackathon_4",
      },
      {
        id: "hackathon_3_individual",
        characterId: "student_01",
        text: "個人で参加するのは勇気があるね。応援しているよ！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "left",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
        nextDialogueId: "hackathon_4",
      },
      {
        id: "hackathon_4",
        characterId: "student_01",
        text: "ハッカソンは新しい技術に触れる良い機会だ。楽しんでね！",
        backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
        characterPosition: "center",
        typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["ハッカソン", "技術", "チームワーク"],
      estimatedDuration: 2,
      requiredProgress: 60,
    },
  },
];
