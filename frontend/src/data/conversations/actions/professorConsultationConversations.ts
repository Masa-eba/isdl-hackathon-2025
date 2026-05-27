// professorConsultationConversations.ts - 教授と相談の会話データ

import type { GameConversationData } from '../../../types/game';

// 教授と相談の会話データ
export const professorConsultationConversations: GameConversationData[] = [
  // 研究について相談
  {
    id: 6001,
    title: "研究について相談",
    description: "教授に研究について相談する",
    chapter: "professor_consultation_research",
    dialogues: [
      {
        id: "prof_consult_research_1",
        characterId: "professor",
        text: "研究について相談があるのね。どうぞ、遠慮なく話してちょうだい。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_research_2",
        characterId: "professor",
        text: "研究の方向性について悩んでいるのは、とても良いことよ。研究は自分で考えて進めることが大切だから。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_research_3",
        characterId: "professor",
        text: "まずは基礎をしっかりと固めることね。焦らずに、一つずつ理解を深めていけばいいの。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_research_4",
        characterId: "professor",
        text: "研究は長い道のりだけど、一歩一歩進んでいけば必ず成果が出るわ。頑張ってね。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },

  // 将来について相談
  {
    id: 6002,
    title: "将来について相談",
    description: "教授に将来について相談する",
    chapter: "professor_consultation_future",
    dialogues: [
      {
        id: "prof_consult_future_1",
        characterId: "professor",
        text: "将来について相談があるのね。大学院進学のことかしら？",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_future_2",
        characterId: "professor",
        text: "大学院は研究を深めるための場所よ。研究に興味があるなら、ぜひ進学を考えてみるといいわ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_future_3",
        characterId: "professor",
        text: "でも、就職も立派な選択よ。あなたの興味と将来の目標を考えて決めるといいでしょう。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_future_4",
        characterId: "professor",
        text: "どちらを選んでも、今の経験は必ず将来に活かされるわ。焦らずに考えてみてね。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },

  // 研究室生活について相談
  {
    id: 6003,
    title: "研究室生活について相談",
    description: "教授に研究室生活について相談する",
    chapter: "professor_consultation_lab_life",
    dialogues: [
      {
        id: "prof_consult_lab_1",
        characterId: "professor",
        text: "研究室生活はどうかしら？慣れてきたかしら？",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_lab_2",
        characterId: "professor",
        text: "研究室の雰囲気はとても良くて、先輩方も優しいのよね。でも何か困ったことがあるのかしら？",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_lab_3",
        characterId: "professor",
        text: "研究の進め方が分からないのは、誰でも通る道よ。先輩たちに相談したり、文献を読んだりして、少しずつ理解を深めていけばいいの。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_lab_4",
        characterId: "professor",
        text: "研究室は学び合う場所だから、遠慮なく質問してちょうだい。みんなで成長していきましょう。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },

  // 技術的な相談
  {
    id: 6004,
    title: "技術的な相談",
    description: "教授に技術的な問題について相談する",
    chapter: "professor_consultation_technical",
    dialogues: [
      {
        id: "prof_consult_tech_1",
        characterId: "professor",
        text: "技術的な問題で困っているのね。プログラミングでエラーが出て解決できないのかしら？",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_tech_2",
        characterId: "professor",
        text: "エラーメッセージを詳しく見て、何が問題なのかを理解することが大切よ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_tech_3",
        characterId: "professor",
        text: "デバッグはプログラミングの重要なスキルなの。一つずつ問題を解決していく経験が、将来必ず役に立つわ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "prof_consult_tech_4",
        characterId: "professor",
        text: "焦らずに、一つずつ解決していけば必ず道は開けるの。頑張ってちょうだい。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "left",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },
];

// ランダムに教授相談の会話を取得
export function getRandomProfessorConsultationConversation(): GameConversationData {
  const randomIndex = Math.floor(Math.random() * professorConsultationConversations.length);
  return professorConsultationConversations[randomIndex];
}
