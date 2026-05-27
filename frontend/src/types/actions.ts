// actions.ts - 研究室シミュレーションゲームの行動システム

// 行動タイプ
export type ActionType = 
  | 'research'      // 研究
  | 'rest'          // 何もしない
  | 'consult_professor'  // 教授と相談
  | 'chat_peer'     // 同期とおしゃべり
  | 'chat_senior';  // 先輩とおしゃべり

// 行動の詳細情報
export interface ActionData {
  id: string;
  type: ActionType;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  researchSkillChange: number;    // 研究スキル変化
  socialSkillChange: number;      // 人間関係スキル変化
  professorAffectionChange: number; // 教授好感度変化
  stressChange: number;           // ストレス変化
}

