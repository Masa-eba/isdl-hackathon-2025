// index.ts - 統合エクスポート

import type { GameConversationData } from '../../types/game';

// 章の会話をインポート
import { createPrologueConversation } from './chapters/prologue';
import { createTutorialConversation } from './chapters/tutorial';
import { createEpilogueConversation } from './chapters/epilogue';
import { createBirthdayConversation } from './chapters/birthday';

// イベントの会話をインポート
import { roleSelectionConversation } from './events/roleSelection';
import { presentationConversations } from './events/presentations';
import { lifeEventConversations } from './events/lifeEvents';

// 行動の会話をインポート
import { researchConversations } from './actions/researchConversations';
import { professorConsultationConversations } from './actions/professorConsultationConversations';

// 元のconversations.tsから残りの会話データをインポート
// これらは後で適切なファイルに移動する予定
const baseConversations: GameConversationData[] = [
  // 研究室発対面
  {
    id: 1001,
    title: "研究室発対面",
    description: "研究室の教授や先輩たちと初めて対面",
    chapter: "lab_orientation",
    dialogues: [
      {
        id: "lab_orientation_1",
        characterId: "professor",

        text: "やあ、よく来てくれましたね。あなたが新しい研究室メンバーなのね。あらら、少し緊張しているかしら？",
        backgroundUrl: "/images/room/placeholder.svg",

        characterPosition: "right",
        typingSpeed: 35,
        showStatus: true,
      },
      {
        id: "lab_orientation_2",
        characterId: "professor",

        text: "研究室の雰囲気、どうかしら？まあ、最初は誰でも少しドキドキするものよね。",
        backgroundUrl: "/images/room/placeholder.svg",

        characterPosition: "center",
        typingSpeed: 35,
        choices: [
          {
            id: "orientation_choice_1",
            text: "「はい、少し緊張しています」",
            effect: {
              relationshipChange: { characterId: "professor", change: 5 },
              stressChange: -2,
            },
            nextDialogueId: "lab_orientation_3_honest",
          },
          {
            id: "orientation_choice_2",
            text: "「大丈夫です、頑張ります！」",
            effect: {
              relationshipChange: { characterId: "professor", change: 10 },
              stressChange: 3,
            },
            nextDialogueId: "lab_orientation_3_confident",
          },
        ],
        showStatus: true,
      },
      {
        id: "lab_orientation_3_honest",
        characterId: "professor",
        text: "あらら、緊張するのは当然ね。でも、安心してちょうだい。ここならすぐに慣れるわよ。",
        backgroundUrl: "/images/room/placeholder.svg",

        characterPosition: "right",
        typingSpeed: 35,
        showStatus: true,
        nextDialogueId: "lab_orientation_4",
      },
      {
        id: "lab_orientation_3_confident",
        characterId: "professor",

        text: "その意気よ！積極的に頑張ろうという気持ちが嬉しいわ。あらら、頼もしいのね。",
        backgroundUrl: "/images/room/placeholder.svg",

        characterPosition: "right",
        typingSpeed: 35,
        showStatus: true,
        nextDialogueId: "lab_orientation_4",
      },
      {
        id: "lab_orientation_4",
        characterId: "professor",

        text: "研究室では、お互いに協力して研究を進めていくのよ。あなたの意見もぜひ聞かせてちょうだいね。",
        backgroundUrl: "/images/room/placeholder.svg",

        characterPosition: "center",
        typingSpeed: 35,
        showStatus: true,
      },
    ],
    metadata: {
      author: "Hackathon Team",
      version: "1.0.0",
      tags: ["研究室発対面", "初日", "歓迎"],
      estimatedDuration: 2,
      requiredProgress: 0,
    },
  },


  // 研究班選択会話
  {
    id: 3000,
    title: "研究班決定",
    description: "6月に研究班を決定する",
    chapter: "research_group_selection",
    dialogues: [
      {
        id: "research_group_selection_1",
        characterId: "professor",
        text: "6月になったわね。そろそろ研究班を決める時期よ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_group_selection_2",
        characterId: "professor",
        text: "研究室には4つの研究班があるの。Opt班、Rec班、Gen班、Bio班よ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_group_selection_3",
        characterId: "professor",
        text: "Opt班は最適化理論、Rec班は推薦システム、Gen班は生成AI、Bio班はバイオインフォマティクスを研究しているのよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_group_selection_4",
        characterId: "professor",
        text: "研究班はあなたの興味や能力を見て、適切な班に振り分けることにするわ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_group_selection_5",
        characterId: "professor",
        text: "あなたのこれまでの活動を見て、最適な研究班を決めさせてもらうわね。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_group_selection_6",
        characterId: "professor",
        text: "よし、決まったわ。あなたは...",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
        randomizeResearchGroup: true, // ランダム決定を実行
      },
      {
        id: "research_group_selection_7",
        characterId: "professor",
        text: "あなたは{research_group}に所属することになったわ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_group_selection_8",
        characterId: "professor",
        text: "この研究班で一年間研究を進めていくことになるわ。頑張ってちょうだい。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
  },

  // 研究室最終集会
  {
    id: 9200,
    title: "研究室最終集会",
    description: "卒業前に研究室の全員が集まって、一年間を振り返る特別な時間",
    chapter: "main-game",
    dialogues: [
      {
        id: "final_lab_gathering_1",
        characterId: "professor",
        text: "みなさん、一年間お疲れさまでした。今日は卒業前に、研究室の全員で一年間を振り返る時間を持ちましょう。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_2",
        characterId: "student_01",
        text: "君も研究室の一員として、本当によく頑張ってくれた。みんなで良い研究室を作ることができたと思う。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_3",
        characterId: "student_02",
        text: "情報発信のコツを教えたけど、君自身もすごく成長したよね。これからも頑張ってね！",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_4",
        characterId: "student_03",
        text: "技術的な問題も一緒に解決できて、本当に良かった。君の論理的な思考には感心したよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_5",
        characterId: "student_04",
        text: "イベント企画も一緒に考えられて楽しかった。君のアイデアは本当に面白かったよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_6",
        characterId: "student_05",
        text: "ミーティングでの君の貢献も大きかった。みんなの意見をまとめるのが上手だったね。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_7",
        characterId: "student_06",
        text: "創造的なアイデアを一緒に考えられて、本当に楽しかった。君の発想力には驚かされたよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_8",
        characterId: "student_07",
        text: "Texの講座も一緒にできて良かった。君の細かい作業への配慮には感心したよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_9",
        characterId: "student_08",
        text: "リーダーシップについても相談できて、君の成長を間近で見ることができた。本当に良かった。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_10",
        characterId: "student_09",
        text: "Texの上級テクニックも一緒に学べた。君のバランス感覚には感心したよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_11",
        characterId: "student_10",
        text: "技術的な討論も一緒にできて、本当に楽しかった。君の技術的知識には驚かされたよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "final_lab_gathering_12",
        characterId: "professor",
        text: "あなたは本当に素晴らしい一年間を過ごしてくれたわ。研究室での素晴らしい時間を過ごせたことを嬉しく思うの。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
  },
];

// 会話データを取得する関数
export function getConversationByChapter(chapter: string): GameConversationData | null {
  const allConversations = getAllConversations();
  return allConversations.find(conv => conv.chapter === chapter) || null;
}

export function getConversationById(id: number): GameConversationData | null {
  const allConversations = getAllConversations();
  return allConversations.find(conv => conv.id === id) || null;
}

export function getAllConversations(): GameConversationData[] {
  // プロローグ、チュートリアル、誕生日、エピローグ会話を動的に追加
  const prologueConversation = createPrologueConversation();
  const tutorialConversation = createTutorialConversation();
  const birthdayConversation = createBirthdayConversation();
  const epilogueConversation = createEpilogueConversation();
  
  return [
    ...baseConversations,
    prologueConversation,
    tutorialConversation,
    birthdayConversation,
    epilogueConversation,
    roleSelectionConversation,
    ...presentationConversations,
    ...lifeEventConversations,
    ...researchConversations,
    ...professorConsultationConversations,
  ];
}

// 行動の会話データを取得する関数をエクスポート
export { getResearchConversationByGroup } from './actions/researchConversations';
export { getRandomProfessorConsultationConversation } from './actions/professorConsultationConversations';

// 個別の会話データもエクスポート
export { createPrologueConversation } from './chapters/prologue';
export { createTutorialConversation } from './chapters/tutorial';
export { createEpilogueConversation } from './chapters/epilogue';
export { createBirthdayConversation } from './chapters/birthday';
export { roleSelectionConversation } from './events/roleSelection';
export { presentationConversations } from './events/presentations';
export { lifeEventConversations } from './events/lifeEvents';
