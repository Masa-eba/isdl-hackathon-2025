// roleEvents.ts - 役割別イベントシステム

import type { GameEvent } from '../../types/events';
import type { LabRole } from '../../types/game';

// 役割別イベントの定義
const roleSpecificEvents: Record<LabRole, GameEvent[]> = {
  chief: [
    {
      id: 'chief_meeting',
      type: 'chief_meeting',
      name: 'チーフ会議',
      description: '研究室の運営について話し合うチーフ会議に参加する。',
      month: 'may',
      week: 2,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2001,
      consequences: [
        {
          type: 'skill',
          value: 'management',
          amount: 15,
          message: '管理能力が向上'
        },
        {
          type: 'relationship',
          value: 'professor',
          amount: 10,
          message: '教授との関係が深まった'
        }
      ]
    },
    {
      id: 'lab_planning',
      type: 'lab_planning',
      name: '研究室計画策定',
      description: '研究室の年間計画を策定する。重要な責任。',
      month: 'june',
      week: 3,
      dayOfWeek: 'tuesday',
      isRequired: true,
      conversationId: 2002,
      consequences: [
        {
          type: 'skill',
          value: 'planning',
          amount: 20,
          message: '計画策定能力が向上'
        },
        {
          type: 'stress',
          value: 'stress',
          amount: 8,
          message: '責任を感じる'
        }
      ]
    }
  ],
  media: [
    {
      id: 'social_media_update',
      type: 'social_media_update',
      name: 'SNS更新',
      description: '研究室のSNSアカウントを更新する。',
      month: 'may',
      week: 1,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2101,
      consequences: [
        {
          type: 'skill',
          value: 'communication',
          amount: 10,
          message: 'コミュニケーション能力が向上'
        },
        {
          type: 'relationship',
          value: 'student',
          amount: 5,
          message: '学生01との関係が深まった'
        }
      ]
    },
    {
      id: 'lab_website_maintenance',
      type: 'lab_website_maintenance',
      name: '研究室ウェブサイト更新',
      description: '研究室のウェブサイトを更新する。',
      month: 'july',
      week: 2,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2102,
      consequences: [
        {
          type: 'skill',
          value: 'web_design',
          amount: 15,
          message: 'Webデザイン能力が向上'
        }
      ]
    }
  ],
  infrastructure: [
    {
      id: 'server_maintenance',
      type: 'server_maintenance',
      name: 'サーバー保守',
      description: '研究室のサーバーを保守する。',
      month: 'may',
      week: 3,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2201,
      consequences: [
        {
          type: 'skill',
          value: 'system_admin',
          amount: 15,
          message: 'システム管理能力が向上'
        }
      ]
    },
    {
      id: 'network_setup',
      type: 'network_setup',
      name: 'ネットワーク設定',
      description: '新しいネットワーク環境を設定する。',
      month: 'september',
      week: 1,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2202,
      consequences: [
        {
          type: 'skill',
          value: 'networking',
          amount: 20,
          message: 'ネットワーク技術が向上'
        }
      ]
    }
  ],
  intellectual_property: [
    {
      id: 'patent_research',
      type: 'patent_research',
      name: '特許調査',
      description: '関連する特許を調査する。',
      month: 'june',
      week: 1,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2301,
      consequences: [
        {
          type: 'skill',
          value: 'research',
          amount: 15,
          message: '研究能力が向上'
        }
      ]
    },
    {
      id: 'copyright_application',
      type: 'copyright_application',
      name: '著作権申請',
      description: '研究成果の著作権申請を行う。',
      month: 'october',
      week: 3,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2302,
      consequences: [
        {
          type: 'skill',
          value: 'legal',
          amount: 15,
          message: '法的知識が向上'
        }
      ]
    }
  ],
  meeting: [
    {
      id: 'meeting_minutes',
      type: 'meeting_minutes',
      name: '議事録作成',
      description: '研究室会議の議事録を作成する。',
      month: 'may',
      week: 2,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2401,
      consequences: [
        {
          type: 'skill',
          value: 'writing',
          amount: 10,
          message: '文章作成能力が向上'
        }
      ]
    },
    {
      id: 'meeting_facilitation',
      type: 'meeting_facilitation',
      name: '会議進行',
      description: '研究室会議の進行を担当する。',
      month: 'july',
      week: 1,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2402,
      consequences: [
        {
          type: 'skill',
          value: 'facilitation',
          amount: 15,
          message: 'ファシリテーション能力が向上'
        }
      ]
    }
  ],
  tex: [
    {
      id: 'tex_template_creation',
      type: 'tex_template_creation',
      name: 'Texテンプレート作成',
      description: '研究室用のTexテンプレートを作成する。',
      month: 'may',
      week: 1,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2501,
      consequences: [
        {
          type: 'skill',
          value: 'tex',
          amount: 15,
          message: 'Tex技術が向上'
        }
      ]
    },
    {
      id: 'document_formatting',
      type: 'document_formatting',
      name: '文書フォーマット統一',
      description: '研究室の文書フォーマットを統一する。',
      month: 'august',
      week: 2,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2502,
      consequences: [
        {
          type: 'skill',
          value: 'documentation',
          amount: 10,
          message: '文書作成能力が向上'
        }
      ]
    }
  ],
  event: [
    {
      id: 'event_planning',
      type: 'event_planning',
      name: 'イベント企画',
      description: '研究室のイベントを企画する。',
      month: 'june',
      week: 2,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2601,
      consequences: [
        {
          type: 'skill',
          value: 'planning',
          amount: 15,
          message: '企画能力が向上'
        }
      ]
    },
    {
      id: 'event_coordination',
      type: 'event_coordination',
      name: 'イベント調整',
      description: 'イベントの調整を行う。',
      month: 'september',
      week: 3,
      dayOfWeek: 'wednesday',
      isRequired: true,
      conversationId: 2602,
      consequences: [
        {
          type: 'skill',
          value: 'coordination',
          amount: 15,
          message: '調整能力が向上'
        }
      ]
    }
  ]
};

// プレイヤーの役割に基づいてイベントを取得
export function getRoleSpecificEvents(playerRoles: LabRole[]): GameEvent[] {
  const events: GameEvent[] = [];
  
  playerRoles.forEach(role => {
    if (roleSpecificEvents[role]) {
      events.push(...roleSpecificEvents[role]);
    }
  });
  
  return events;
}

// 特定の役割のイベントを取得
export function getEventsForRole(role: LabRole): GameEvent[] {
  return roleSpecificEvents[role] || [];
}

// 役割別イベントを週に基づいて取得
export function getRoleEventsForWeek(week: number, playerRoles: LabRole[]): GameEvent[] {
  const roleEvents = getRoleSpecificEvents(playerRoles);
  
  return roleEvents.filter(event => {
    // 週数を月と週に変換（概算）
    const monthIndex = Math.floor((week - 1) / 4.33);
    const weekInMonth = ((week - 1) % 4) + 1;
    
    const monthOrder = [
      'april', 'may', 'june', 'july', 'august', 'september',
      'october', 'november', 'december', 'january', 'february', 'march'
    ];
    
    const targetMonth = monthOrder[monthIndex % 12];
    return event.month === targetMonth && event.week === weekInMonth;
  });
}
