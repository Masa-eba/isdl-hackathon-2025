// characterConversations.ts - 親密度に基づく会話データ

import type { GameDialogueData, Character } from '../../types/game';

// 共通設定
const COMMON_SETTINGS = {
  lab: {
    backgroundUrl: "/images/room/placeholder.svg",
    typingSpeed: 35,
  },
};

// 親密度レベル
export type IntimacyLevel = 'stranger' | 'acquaintance' | 'friend' | 'close_friend' | 'lover';

// 会話テンプレート（性別・親密度レベル別）
const CONVERSATION_TEMPLATES = {
  male: {
    stranger: [
      "こんにちは！{grade}で{roles}を担当してる。",
      "研究室での過ごし方についてアドバイスするよ。{roles}の仕事は{role_description}ことが大切だ。",
      "初めて話す機会があって嬉しいよ。{grade}として、後輩をサポートしていきたいと思ってる。",
      "よろしく！{roles}の仕事で何か困ったことがあったら、いつでも声をかけてくれ。",
    ],
    acquaintance: [
      "おう、調子どうだ？研究室の生活には慣れたか？",
      "何か困ったことがあったら、いつでも相談してくれ。{grade}としてサポートするよ！",
      "今日は何かお手伝いできることある？{roles}の仕事で困ったことがあったら、遠慮なく言ってくれ。",
      "君の頑張りは見てるよ。研究室の一員として、本当に頼もしい存在だ。",
    ],
    friend: [
      "よっ！最近どうだ？研究の方は順調か？",
      "君と話してると、いつも新しいアイデアが浮かんでくるよ。本当に刺激的だ。",
      "今日も元気そうだね。何か面白い話ある？",
      "君の頑張りは見てるよ。本当に頼もしい{grade}だ。",
    ],
    close_friend: [
      "おい、最近忙しそうだな。無理してないか？",
      "君とは本当に気が合うな。一緒にいる時間が、最近一番楽しいよ。",
      "ねえ、最近君のことばかり考えちゃうんだ。どうしてだろう？",
      "君と一緒にいると、本当に楽しい。もっと一緒にいたいな。",
    ],
    lover: [
      "君と一緒にいると、本当に心が落ち着くんだ。",
      "大好きだ。君がいてくれるから、毎日が輝いて見える。",
      "君がいてくれるから、僕は頑張れる。これからもずっと一緒にいてくれ。",
      "これからもずっと一緒にいてね。君と一緒なら、どんな困難も乗り越えられる気がする。",
    ],
  },
  female: {
    stranger: [
      "こんにちは！{grade}で{roles}を担当してるの。",
      "研究室での過ごし方についてアドバイスするね。{roles}の仕事は{role_description}ことが大切よ。",
      "初めて話す機会があって嬉しいわ。{grade}として、後輩をサポートしていきたいと思ってるの。",
      "よろしくお願いします！{roles}の仕事で何か困ったことがあったら、いつでも声をかけてください。",
    ],
    acquaintance: [
      "調子どう？研究室の生活には慣れた？",
      "何か困ったことがあったら、いつでも相談してね。{grade}としてサポートするわ！",
      "今日は何かお手伝いできることある？{roles}の仕事で困ったことがあったら、遠慮なく言ってね。",
      "君の頑張りは見てるわ。研究室の一員として、本当に頼もしい存在よ。",
    ],
    friend: [
      "よっ！最近どう？研究の方は順調？",
      "君と話してると、いつも新しいアイデアが浮かんでくるの。本当に刺激的よ！",
      "今日も元気そうね。何か面白い話ある？",
      "君の頑張りは見てるわ。本当に頼もしい{grade}よ。",
    ],
    close_friend: [
      "最近忙しそうね。無理してない？",
      "君とは本当に気が合うわ。一緒にいる時間が、最近一番楽しいの。",
      "ねえ、最近君のことばかり考えちゃうの。どうしてだろう？",
      "君と一緒にいると、本当に楽しい。もっと一緒にいたいな。",
    ],
    lover: [
      "君と一緒にいると、本当に心が落ち着くの。",
      "大好き。君がいてくれるから、毎日が輝いて見えるわ。",
      "君がいてくれるから、私は頑張れる。これからもずっと一緒にいてね。",
      "これからもずっと一緒にいてね。君と一緒なら、どんな困難も乗り越えられる気がする。",
    ],
  },
};

// 告白会話テンプレート
const CONFESSION_TEMPLATES = {
  male: [
    "君と一緒にいる時間が、最近一番楽しいんだ。",
    "君のことを、本当に大切に思ってる。",
    "俺と付き合ってくれないか？"
  ],
  female: [
    "君と一緒にいる時間が、最近一番楽しいの。",
    "君のことを、本当に大切に思ってるの。",
    "私と付き合ってくれない？"
  ],
  responses: {
    accepted: [
      "本当に？ありがとう！君と一緒にいられることが、一番の幸せだ。",
      "これからもずっと一緒にいてね。君を大切にするよ。"
    ],
    rejected: [
      "そうか...友達のままでいいよ。君の気持ちを大切にする。",
      "でも、いつでも話を聞くからね。友達として、ずっとそばにいるよ。"
    ]
  }
};

// マッピングデータ
const MAPPINGS = {
  grade: { 'U4': '4年生', 'M1': 'M1', 'M2': 'M2', 'professor': '教授' },
  role: { 'chief': 'チーフ', 'media': 'メディア', 'infrastructure': 'インフラ', 'intellectual_property': '知的財産', 'meeting': 'ミーティング', 'tex': 'Tex', 'event': 'イベント' },
  roleDescription: { 'chief': 'リーダーシップを発揮して', 'media': '情報を分かりやすく伝える', 'infrastructure': '技術的な基盤を整える', 'intellectual_property': '知的財産を適切に管理する', 'meeting': '会議を効率的に進行する', 'tex': '文書作成を丁寧に', 'event': 'イベントを成功させる' }
};

// 親密度レベルを取得
export function getIntimacyLevel(intimacyLevel: number): IntimacyLevel {
  if (intimacyLevel >= 80) return 'lover';
  if (intimacyLevel >= 60) return 'close_friend';
  if (intimacyLevel >= 40) return 'friend';
  if (intimacyLevel >= 20) return 'acquaintance';
  return 'stranger';
}

// 通常会話を生成
export function generateCharacterConversation(character: Character, intimacyLevel: number): GameDialogueData[] {
  const level = getIntimacyLevel(intimacyLevel);
  const gender = character.gender as 'male' | 'female';
  const templates = CONVERSATION_TEMPLATES[gender][level];
  
  // ランダムに1つのテンプレートを選択
  const selectedTemplates = [templates[Math.floor(Math.random() * templates.length)]];
  
  // プレースホルダーを置換（{name}は削除、DialogueBoxで自動取得されるため）
  const replacePlaceholders = (text: string) => text
    .replace(/{grade}/g, MAPPINGS.grade[character.grade as keyof typeof MAPPINGS.grade] || character.grade)
    .replace(/{roles}/g, character.roles.map((role: string) => MAPPINGS.role[role as keyof typeof MAPPINGS.role] || role).join('・'))
    .replace(/{role_description}/g, character.roles.length > 0 ? MAPPINGS.roleDescription[character.roles[0] as keyof typeof MAPPINGS.roleDescription] || '' : '');
  
  return selectedTemplates.map((template, index) => ({
    id: `${character.id}_${level}_${index + 1}`,
    text: replacePlaceholders(template),
    characterId: character.id,
    backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
    characterPosition: "right" as const,
    typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
    showStatus: false,
  }));
}

// 告白会話を生成
export function generateConfessionConversation(character: Character): GameDialogueData[] {
  const gender = character.gender as 'male' | 'female';
  const templates = CONFESSION_TEMPLATES[gender];
  
  return templates.map((text, index) => ({
    id: `${character.id}_confession_${index + 1}`,
    text: text,
    characterId: character.id,
    backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
    characterPosition: "right" as const,
    typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
    showStatus: false,
    choices: index === templates.length - 1 ? [
      {
        id: "confession_yes",
        text: "はい、お願いします！",
        effect: { confessionResponse: { characterId: character.id, accepted: true } },
        nextDialogueId: `${character.id}_confession_accepted_1`
      },
      {
        id: "confession_no",
        text: "ごめんなさい、友達のままで...",
        effect: { confessionResponse: { characterId: character.id, accepted: false } },
        nextDialogueId: `${character.id}_confession_rejected_1`
      }
    ] : undefined
  }));
}

// 告白後の会話を生成
export function generateConfessionResponse(character: Character, accepted: boolean): GameDialogueData[] {
  const responses = CONFESSION_TEMPLATES.responses[accepted ? 'accepted' : 'rejected'];
  
  return responses.map((text, index) => ({
    id: `${character.id}_confession_${accepted ? 'accepted' : 'rejected'}_${index + 1}`,
    text: text,
    characterId: character.id,
    backgroundUrl: COMMON_SETTINGS.lab.backgroundUrl,
    characterPosition: "right" as const,
    typingSpeed: COMMON_SETTINGS.lab.typingSpeed,
    showStatus: false,
    nextDialogueId: index < responses.length - 1 ? `${character.id}_confession_${accepted ? 'accepted' : 'rejected'}_${index + 2}` : undefined
  }));
}

// メイン関数：会話を取得
export function getCharacterConversation(character: Character, intimacyLevel: number, hasBeenConfessed: boolean = false): GameDialogueData[] {
  // 男性キャラクターで親密度100%かつまだ告白されていない場合のみ告白会話
  if (character.gender === 'male' && intimacyLevel >= 100 && !hasBeenConfessed) {
    return generateConfessionConversation(character);
  }
  
  return generateCharacterConversation(character, intimacyLevel);
}

// 親密度変化
export function getIntimacyChange(_characterId: string, _intimacyLevel: number): number {
  return 20;
}
