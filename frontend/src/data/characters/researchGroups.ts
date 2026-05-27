// researchGroups.ts - 研究班情報

import type { ResearchGroup } from '../../types/game';

// 研究班情報の型定義
interface ResearchGroupInfo {
  id: ResearchGroup;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// 研究班情報
export const RESEARCH_GROUPS: Record<ResearchGroup, ResearchGroupInfo> = {
  opt: {
    id: 'opt',
    name: 'Opt班',
    description: '最適化理論を研究する班。',
    icon: '⚡',
    color: '#FF6B6B'
  },
  rec: {
    id: 'rec',
    name: 'Rec班',
    description: '推薦システムを研究する班。',
    icon: '🎯',
    color: '#4ECDC4'
  },
  gen: {
    id: 'gen',
    name: 'Gen班',
    description: '生成モデルを開発する班。',
    icon: '🎨',
    color: '#45B7D1'
  },
  bio: {
    id: 'bio',
    name: 'Bio班',
    description: '脳波を用いた研究を行う班。',
    icon: '🧬',
    color: '#96CEB4'
  },
  none: {
    id: 'none',
    name: '研究班なし',
    description: '研究班なし',
    icon: '🎓',
    color: '#000000'
  }
};


// 研究班IDから研究班情報を取得
export function getResearchGroupById(groupId: ResearchGroup): ResearchGroupInfo {
  return RESEARCH_GROUPS[groupId];
}