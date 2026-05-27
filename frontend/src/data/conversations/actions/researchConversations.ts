// researchConversations.ts - 研究行動の会話データ

import type { GameConversationData } from '../../../types/game';

// 研究行動の会話データ
export const researchConversations: GameConversationData[] = [
  // Opt班の研究会話
  {
    id: 5001,
    title: "Opt班での研究",
    description: "Opt班で研究を行う",
    chapter: "research_opt",
    dialogues: [
      {
        id: "research_opt_1",
        characterId: "student_23",
        text: "おお、研究に集中してるな！Opt班の最適化理論は奥が深いからな。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_opt_2",
        characterId: "student_23",
        text: "何か困ったことがあったら、いつでも相談してくれ。最適化アルゴリズムの実装で悩むことも多いからな。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_opt_4",
        characterId: "student_23",
        text: "そうだな、最初は誰でもそうだ。でも、実装してみると理解が深まるよ。一緒に頑張ろう！",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },

  // Rec班の研究会話
  {
    id: 5002,
    title: "Rec班での研究",
    description: "Rec班で研究を行う",
    chapter: "research_rec",
    dialogues: [
      {
        id: "research_rec_1",
        characterId: "student_21",
        text: "Rec班の推薦システムの研究、どうだ？",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_rec_2",
        characterId: "student_21",
        text: "推薦アルゴリズムの精度を上げるのは本当に難しいんだ。でも、それが面白いところでもある。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_rec_4",
        characterId: "student_21",
        text: "そうそう、データの品質が推薦の精度に大きく影響するからな。一緒にデータを分析してみよう！",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },

  // Gen班の研究会話
  {
    id: 5003,
    title: "Gen班での研究",
    description: "Gen班で研究を行う",
    chapter: "research_gen",
    dialogues: [
      {
        id: "research_gen_1",
        characterId: "student_19",
        text: "Gen班の生成AI研究、進んでる？",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_gen_2",
        characterId: "student_19",
        text: "最近の生成AIは本当にすごいよね。でも、まだまだ改善の余地がある。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_gen_4",
        characterId: "student_19",
        text: "そうだね、GPUのリソースも限られてるし。でも、効率的な学習方法を一緒に考えてみよう！",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },

  // Bio班の研究会話
  {
    id: 5004,
    title: "Bio班での研究",
    description: "Bio班で研究を行う",
    chapter: "research_bio",
    dialogues: [
      {
        id: "research_bio_1",
        characterId: "student_20",
        text: "Bio班のバイオインフォマティクス、どうだ？",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_bio_2",
        characterId: "student_20",
        text: "生物学的なデータの解析は、コンピュータサイエンスと生物学の両方の知識が必要だから大変だよな。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_bio_4",
        characterId: "student_20",
        text: "大丈夫だ、最初は誰でもそうだ。一緒に勉強していこう。データ解析の技術は君の方が詳しいかもしれないしな。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },

  // 研究班未決定時の会話
  {
    id: 5005,
    title: "研究活動",
    description: "研究班が決まる前の研究活動",
    chapter: "research_general",
    dialogues: [
      {
        id: "research_general_1",
        characterId: "student_12",
        text: "研究、頑張ってるな！",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_general_2",
        characterId: "student_12",
        text: "研究室の雰囲気に慣れてきたか？研究は一人でやるものじゃないから、困ったことがあったら遠慮なく相談してくれ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
      {
        id: "research_general_4",
        characterId: "student_12",
        text: "そうだな、6月に研究班が決まるからな。それまでに色々な分野に触れて、自分の興味を見つけてみるといいよ。",
        backgroundUrl: "/images/room/placeholder.svg",
        characterPosition: "right",
        typingSpeed: 35,
        showStatus: false,
      },
    ],
    metadata: {
      requiredProgress: 0,
    },
  },
];

// 研究班IDに基づいて会話を取得
export function getResearchConversationByGroup(researchGroup: string): GameConversationData | null {
  const conversationMap: Record<string, number> = {
    'opt': 5001,
    'rec': 5002,
    'gen': 5003,
    'bio': 5004,
  };

  const conversationId = conversationMap[researchGroup];
  if (conversationId) {
    return researchConversations.find(conv => conv.id === conversationId) || null;
  }

  // 研究班が決まっていない場合は一般的な研究会話を返す
  return researchConversations.find(conv => conv.id === 5005) || null;
}
