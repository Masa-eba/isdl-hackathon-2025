// weeklyActions.ts - 研究室シミュレーションゲームの行動データ

import type { ActionData } from '../../types/actions';

// 基本行動データ
export const weeklyActions: ActionData[] = [
  // 研究
  {
    id: 'research',
    type: 'research',
    name: '研究',
    description: '研究室で研究を行う。研究スキルが向上するが、ストレスも増加する。',
    shortDescription: '研究を行う',
    icon: '🔬',
    researchSkillChange: 15,
    socialSkillChange: 0,
    professorAffectionChange: 2,
    stressChange: 8,
  },

  // 何もしない
  {
    id: 'rest',
    type: 'rest',
    name: '何もしない',
    description: 'ゆっくり休憩する。ストレスを軽減できる。',
    shortDescription: '休憩する',
    icon: '☕',
    researchSkillChange: 0,
    socialSkillChange: 0,
    professorAffectionChange: 0,
    stressChange: -5,
  },

  // 教授と相談
  {
    id: 'consult_professor',
    type: 'consult_professor',
    name: '教授と相談',
    description: '教授に研究や将来について相談する。教授との関係が良くなる。',
    shortDescription: '教授に相談',
    icon: '💬',
    researchSkillChange: 3,
    socialSkillChange: 5,
    professorAffectionChange: 8,
    stressChange: 2,
  },

  // 同期とおしゃべり
  {
    id: 'chat_peer',
    type: 'chat_peer',
    name: '同期とおしゃべり',
    description: '同期とおしゃべりする。人間関係スキルが向上し、ストレスも軽減される。',
    shortDescription: '同期と話す',
    icon: '👥',
    researchSkillChange: 0,
    socialSkillChange: 8,
    professorAffectionChange: 0,
    stressChange: -4,
  },

  // 先輩とおしゃべり
  {
    id: 'chat_senior',
    type: 'chat_senior',
    name: '先輩とおしゃべり',
    description: '先輩とおしゃべりする。研究のコツを教えてもらえる。',
    shortDescription: '先輩と話す',
    icon: '🎓',
    researchSkillChange: 5,
    socialSkillChange: 6,
    professorAffectionChange: 0,
    stressChange: -3,
  },
];

// 行動をIDで取得
export function getActionById(id: string): ActionData | undefined {
  return weeklyActions.find(action => action.id === id);
}

// 行動をタイプで取得
export function getActionsByType(type: string): ActionData[] {
  return weeklyActions.filter(action => action.type === type);
}

// 利用可能な行動を取得
export function getAvailableActions(): ActionData[] {
  return weeklyActions;
}
