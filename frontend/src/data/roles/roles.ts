// roles.ts - 研究室の役割情報

import type { LabRole } from '../../types/game';

// 役割情報の型定義
interface RoleInfo {
  id: LabRole;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// 研究室の役割情報
export const LAB_ROLES: Record<LabRole, RoleInfo> = {
  chief: {
    id: 'chief',
    name: 'チーフ',
    description: '研究室の運営を統括する重要な役割。メンバーの管理や研究方針の決定に関わる。',
    icon: '👑',
    color: '#FFD700'
  },
  media: {
    id: 'media',
    name: 'メディア',
    description: '研究室の広報活動を担当。SNSやウェブサイトの管理、研究成果の発信を行う。',
    icon: '📱',
    color: '#FF6B6B'
  },
  infrastructure: {
    id: 'infrastructure',
    name: 'インフラ',
    description: '研究室のIT環境を管理。サーバーやネットワークの保守、開発環境の整備を行う。',
    icon: '🖥️',
    color: '#4ECDC4'
  },
  intellectual_property: {
    id: 'intellectual_property',
    name: '知的財産',
    description: '特許や著作権の管理を担当。研究成果の保護と活用を図る。',
    icon: '📋',
    color: '#45B7D1'
  },
  meeting: {
    id: 'meeting',
    name: 'ミーティング',
    description: '月例発表等の準備や司会進行を行う。',
    icon: '📝',
    color: '#96CEB4'
  },
  tex: {
    id: 'tex',
    name: 'Tex',
    description: '論文や資料のTex作成を担当。美しい文書作成と技術文書の管理を行う。',
    icon: '📄',
    color: '#FFEAA7'
  },
  event: {
    id: 'event',
    name: 'イベント',
    description: '研究室のイベント企画・運営を担当。懇親会やセミナーの開催を行う。',
    icon: '🎉',
    color: '#DDA0DD'
  }
};

// 役割の一覧を取得
export function getAllRoles(): RoleInfo[] {
  return Object.values(LAB_ROLES);
}

// 役割IDから役割情報を取得
export function getRoleById(roleId: LabRole): RoleInfo {
  return LAB_ROLES[roleId];
}

