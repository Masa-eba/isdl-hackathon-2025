// events.ts - イベントデータ

import type { GameEvent } from '../../types/events';
import type { Month } from '../../types/time';

// プレイヤーの誕生月を取得する関数
export function getPlayerBirthMonth(): number {
  try {
    const gameState = JSON.parse(localStorage.getItem('isdl_game_state') || '{}');
    return gameState.birthMonth || 4;
  } catch {
    return 4;
  }
}

// 誕生日イベントを動的に生成する関数
export function createBirthdayEvent(): GameEvent | null {
  const birthMonth = getPlayerBirthMonth();
  
  // 月名のマッピング
  const monthNames: Record<number, Month> = {
    1: 'january', 2: 'february', 3: 'march', 4: 'april',
    5: 'may', 6: 'june', 7: 'july', 8: 'august',
    9: 'september', 10: 'october', 11: 'november', 12: 'december'
  };
  
  const monthName = monthNames[birthMonth] ?? 'april';
  
  return {
    id: 'birthday_party',
    type: 'welcome_party' as const,
    name: '誕生日パーティー',
    description: '研究室のメンバーが誕生日を祝ってくれる。特別な一日。',
    month: monthName,
    week: 2,
    dayOfWeek: 'tuesday' as const,
    isRequired: false,
    conversationId: 9999, // 特別な会話ID
    consequences: [
      {
        type: 'relationship' as const,
        value: 'professor',
        amount: 15,
        message: '教授が誕生日を祝ってくれた'
      },
      {
        type: 'relationship' as const,
        value: 'assistant',
        amount: 12,
        message: '先輩が誕生日を祝ってくれた'
      },
      {
        type: 'relationship' as const,
        value: 'student',
        amount: 15,
        message: '学生01が誕生日を祝ってくれた'
      },
      {
        type: 'stress' as const,
        value: 'stress',
        amount: -10,
        message: 'とても嬉しかった'
      }
    ]
  };
}

// 4月 - 研究室所属編
const aprilEvents: GameEvent[] = [
  {
    id: 'role_selection',
    type: 'role_selection',
    name: '研究室役割決定',
    description: '4年生として研究室の役割を2つ選択する。この選択が一年間の活動に影響する。',
    month: 'april',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 1000,
    consequences: [
      {
        type: 'role_assignment',
        value: 'roles',
        amount: 0,
        message: '研究室の役割が決定された'
      }
    ]
  },
  {
    id: 'lab_orientation',
    type: 'lab_orientation',
    name: '研究室発対面',
    description: '研究室の教授や先輩たちと初めて対面する。緊張するが、新しい環境への第一歩。',
    month: 'april',
    week: 1,
    dayOfWeek: 'wednesday',
    isRequired: true,
    conversationId: 1001,
    consequences: [
      {
        type: 'relationship',
        value: 'professor',
        amount: 10,
        message: '教授との関係が深まった'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 5,
        message: '緊張したが、良い印象を与えられた'
      }
    ]
  },
  {
    id: 'basic_seminar',
    type: 'basic_seminar',
    name: '基礎ゼミ',
    description: '研究室の基礎ゼミに参加する。研究の基本を学ぶ重要な機会。',
    month: 'april',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 1002,
    consequences: [
      {
        type: 'skill',
        value: 'research',
        amount: 15,
        message: '研究の基礎知識を習得'
      },
      {
        type: 'relationship',
        value: 'assistant',
        amount: 5,
        message: '先輩との関係が深まった'
      }
    ]
  },
  {
    id: 'research_group_intro',
    type: 'research_group_intro',
    name: '研究グループ紹介',
    description: '研究グループのメンバーと自己紹介し合う。チームワークの始まり。',
    month: 'april',
    week: 2,
    dayOfWeek: 'wednesday',
    isRequired: true,
    conversationId: 1003,
    consequences: [
      {
        type: 'relationship',
        value: 'student',
        amount: 8,
        message: '学生01との関係が深まった'
      },
      {
        type: 'skill',
        value: 'communication',
        amount: 5,
        message: 'コミュニケーション能力が向上'
      }
    ]
  },
  {
    id: 'welcome_party',
    type: 'welcome_party',
    name: '新入生歓迎会',
    description: '新入生歓迎会に参加する。研究室の雰囲気を知る良い機会。',
    month: 'april',
    week: 3,
    dayOfWeek: 'wednesday',
    isRequired: false,
    conversationId: 1005,
    consequences: [
      {
        type: 'relationship',
        value: 'professor',
        amount: 5,
        message: '教授との距離が縮まった'
      },
      {
        type: 'relationship',
        value: 'student',
        amount: 10,
        message: '学生01との関係が深まった'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: -5,
        message: 'リラックスできた'
      }
    ]
  },
  {
    id: 'isdl_party',
    type: 'isdl_party',
    name: 'ラボパーティー',
    description: 'ラボパーティーに参加する。研究室の雰囲気を知る良い機会。',
    month: 'april',
    week: 4,
    dayOfWeek: 'wednesday',
    isRequired: false,
    conversationId: 4000,
    consequences: [
      {
        type: 'relationship',
        value: 'professor',
        amount: 10,
        message: '教授との関係が深まった'
      },
      {
        type: 'relationship',
        value: 'student',
        amount: 8,
        message: '研究室メンバーとの関係が深まった'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: -5,
        message: 'パーティーでリラックスできた'
      }
    ]
  },
];

// 5月 - コンピュータビジョン編
const mayEvents: GameEvent[] = [
  {
    id: 'cv_preparation',
    type: 'cv_preparation',
    name: 'レジュメ・パワポ作成',
    description: 'コンピュータビジョンの発表に向けてレジュメとパワーポイントを作成する。',
    month: 'may',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 2001,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 15,
        message: 'プレゼンテーション能力が向上'
      },
      {
        type: 'skill',
        value: 'writing',
        amount: 10,
        message: '文章作成能力が向上'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 8,
        message: '準備に追われる'
      }
    ]
  },
  {
    id: 'cv_rehearsal',
    type: 'cv_rehearsal',
    name: '院生リハーサル',
    description: '院生の前でリハーサルを行う。緊張するが、良いフィードバックをもらえる。',
    month: 'may',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 2002,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 20,
        message: 'プレゼンテーション能力が大幅向上'
      },
      {
        type: 'relationship',
        value: 'assistant',
        amount: 8,
        message: '先輩からのアドバイスで関係が深まった'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 10,
        message: '緊張したが、良い経験になった'
      }
    ]
  },
  {
    id: 'cv_presentation',
    type: 'cv_presentation',
    name: 'コンピュータビジョン当日',
    description: 'コンピュータビジョンの発表本番。これまでの準備の成果を発揮する時。',
    month: 'may',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 2003,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 25,
        message: 'プレゼンテーション能力が飛躍的に向上'
      },
      {
        type: 'relationship',
        value: 'professor',
        amount: 15,
        message: '教授から高い評価を受けた'
      },
      {
        type: 'progress',
        value: 'research',
        amount: 20,
        message: '研究進捗が大幅に向上'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 15,
        message: '緊張したが、成功した'
      }
    ]
  },
];

// 6月 - 論文輪講編
const juneEvents: GameEvent[] = [
  {
    id: 'research_group_selection',
    type: 'research_group_selection',
    name: '研究班決定',
    description: '6月に研究班を決定する。この選択が一年間の研究活動に影響する。',
    month: 'june',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 3000,
    consequences: [
      {
        type: 'research_group_assignment',
        value: 'research_groups',
        amount: 0,
        message: '研究班が決定された'
      }
    ]
  },
  {
    id: 'research_group_mtg_june_1',
    type: 'research_group_mtg',
    name: '研究班MTG（6月第1回）',
    description: '研究班の定例ミーティング。研究進捗の共有と今後の方針を話し合う。',
    month: 'june',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 3001,
    consequences: [
      {
        type: 'skill',
        value: 'research',
        amount: 10,
        message: '研究班での議論で知識が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'paper_reading',
    type: 'paper_reading',
    name: '論文輪講',
    description: '論文輪講に参加する。最新の研究動向を学ぶ重要な機会。',
    month: 'june',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 3001,
    consequences: [
      {
        type: 'skill',
        value: 'reading',
        amount: 15,
        message: '論文読解能力が向上'
      },
      {
        type: 'skill',
        value: 'knowledge',
        amount: 20,
        message: '専門知識が大幅に向上'
      },
      {
        type: 'relationship',
        value: 'assistant',
        amount: 5,
        message: '先輩との議論で関係が深まった'
      }
    ]
  },
];

// 7月
const julyEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_july_1',
    type: 'research_group_mtg',
    name: '研究班MTG（7月第1回）',
    description: '研究班の定例ミーティング。夏休み前の研究計画を立てる。',
    month: 'july',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 4000,
    consequences: [
      {
        type: 'skill',
        value: 'planning',
        amount: 12,
        message: '研究計画立案能力が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'monthly_presentation_m1',
    type: 'monthly_presentation_m1',
    name: '月例発表会（M1）',
    description: 'M1として初めての月例発表会に参加する。緊張するが、成長の機会。',
    month: 'july',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 4001,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 20,
        message: 'プレゼンテーション能力が向上'
      },
      {
        type: 'progress',
        value: 'research',
        amount: 15,
        message: '研究進捗が向上'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 12,
        message: '緊張したが、良い経験になった'
      }
    ]
  },
  {
    id: 'paper_reading_creation',
    type: 'paper_reading_creation',
    name: '論文輪講作成',
    description: '論文輪講の資料を作成する。理解を深める良い機会。',
    month: 'july',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 4002,
    consequences: [
      {
        type: 'skill',
        value: 'writing',
        amount: 15,
        message: '文章作成能力が向上'
      },
      {
        type: 'skill',
        value: 'analysis',
        amount: 10,
        message: '分析能力が向上'
      }
    ]
  },
  {
    id: 'grad_school_exam',
    type: 'grad_school_exam',
    name: '大学院試験',
    description: '大学院進学のための試験を受ける。将来を決める重要な試験。',
    month: 'july',
    week: 4,
    dayOfWeek: 'tuesday',
    isRequired: false,
    conversationId: 4003,
    consequences: [
      {
        type: 'skill',
        value: 'academic',
        amount: 25,
        message: '学術能力が大幅に向上'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 20,
        message: '試験で緊張した'
      },
      {
        type: 'unlock',
        value: 'grad_school_path',
        amount: 1,
        message: '大学院進学の道が開かれた'
      }
    ]
  },
];

// 8月 - 夏休み編
const augustEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_august_1',
    type: 'research_group_mtg',
    name: '研究班MTG（8月第1回）',
    description: '夏休み中の研究班ミーティング。夏休みの成果を共有する。',
    month: 'august',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 4500,
    consequences: [
      {
        type: 'skill',
        value: 'research',
        amount: 15,
        message: '夏休みの研究成果で知識が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 10,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'research_group_mtg_august_3',
    type: 'research_group_mtg',
    name: '研究班MTG（8月第3回）',
    description: '夏休み明けの研究班ミーティング。新学期の研究計画を立てる。',
    month: 'august',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 4501,
    consequences: [
      {
        type: 'skill',
        value: 'planning',
        amount: 12,
        message: '新学期の研究計画立案能力が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  }
];

// 9月 - ハッカソン編
const septemberEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_september_1',
    type: 'research_group_mtg',
    name: '研究班MTG（9月第1回）',
    description: '新学期の研究班ミーティング。夏休みの成果を踏まえて今後の方針を決める。',
    month: 'september',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 5000,
    consequences: [
      {
        type: 'skill',
        value: 'research',
        amount: 12,
        message: '研究班での議論で知識が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'hackathon',
    type: 'hackathon',
    name: 'ハッカソン',
    description: 'ハッカソンに参加する。新しい技術に触れる刺激的な機会。',
    month: 'september',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: false,
    conversationId: 5001,
    consequences: [
      {
        type: 'skill',
        value: 'programming',
        amount: 20,
        message: 'プログラミング能力が向上'
      },
      {
        type: 'skill',
        value: 'creativity',
        amount: 15,
        message: '創造性が向上'
      },
      {
        type: 'relationship',
        value: 'student',
        amount: 10,
        message: 'チームメンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'friendship_party',
    type: 'friendship_party',
    name: '親睦会',
    description: '研究室の親睦会に参加する。メンバーとの関係を深める良い機会。',
    month: 'september',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: false,
    conversationId: 5002,
    consequences: [
      {
        type: 'relationship',
        value: 'professor',
        amount: 8,
        message: '教授との関係が深まった'
      },
      {
        type: 'relationship',
        value: 'student',
        amount: 12,
        message: '学生01との関係が深まった'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: -8,
        message: 'リラックスできた'
      }
    ]
  },
];

// 10月
const octoberEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_october_1',
    type: 'research_group_mtg',
    name: '研究班MTG（10月第1回）',
    description: '研究班の定例ミーティング。中間発表に向けた準備を話し合う。',
    month: 'october',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 6000,
    consequences: [
      {
        type: 'skill',
        value: 'research',
        amount: 12,
        message: '研究班での議論で知識が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'monthly_presentation_mid',
    type: 'monthly_presentation_mid',
    name: '月例発表会（研究中間発表）',
    description: '研究中間発表を行う。これまでの成果をまとめる重要な機会。',
    month: 'october',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 6001,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 25,
        message: 'プレゼンテーション能力が大幅向上'
      },
      {
        type: 'progress',
        value: 'research',
        amount: 30,
        message: '研究進捗が大幅に向上'
      },
      {
        type: 'relationship',
        value: 'professor',
        amount: 15,
        message: '教授から高い評価を受けた'
      }
    ]
  },
];

// 11月 - 研究継続編
const novemberEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_november_1',
    type: 'research_group_mtg',
    name: '研究班MTG（11月第1回）',
    description: '研究班の定例ミーティング。年末に向けた研究計画を立てる。',
    month: 'november',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 6500,
    consequences: [
      {
        type: 'skill',
        value: 'research',
        amount: 12,
        message: '研究班での議論で知識が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'research_group_mtg_november_3',
    type: 'research_group_mtg',
    name: '研究班MTG（11月第3回）',
    description: '研究班の定例ミーティング。年末ジャーナルの準備について話し合う。',
    month: 'november',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 6501,
    consequences: [
      {
        type: 'skill',
        value: 'writing',
        amount: 10,
        message: '年末ジャーナル作成の準備ができた'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  }
];

// 12月
const decemberEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_december_1',
    type: 'research_group_mtg',
    name: '研究班MTG（12月第1回）',
    description: '研究班の定例ミーティング。年末ジャーナルの作成について話し合う。',
    month: 'december',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 7000,
    consequences: [
      {
        type: 'skill',
        value: 'writing',
        amount: 12,
        message: '年末ジャーナル作成の準備ができた'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'year_end_journal',
    type: 'year_end_journal',
    name: '年末ジャーナル',
    description: '年末ジャーナルの作成に取り組む。一年の成果をまとめる。',
    month: 'december',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 7001,
    consequences: [
      {
        type: 'skill',
        value: 'writing',
        amount: 20,
        message: '文章作成能力が向上'
      },
      {
        type: 'progress',
        value: 'research',
        amount: 15,
        message: '研究進捗が向上'
      }
    ]
  },
  {
    id: 'year_end_party',
    type: 'year_end_party',
    name: '忘年会',
    description: '研究室の忘年会に参加する。一年を振り返る良い機会。',
    month: 'december',
    week: 4,
    dayOfWeek: 'tuesday',
    isRequired: false,
    conversationId: 7002,
    consequences: [
      {
        type: 'relationship',
        value: 'professor',
        amount: 10,
        message: '教授との関係が深まった'
      },
      {
        type: 'relationship',
        value: 'student',
        amount: 15,
        message: '学生01との関係が深まった'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: -10,
        message: '一年の疲れを癒せた'
      }
    ]
  },
];

// 1月
const januaryEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_january_1',
    type: 'research_group_mtg',
    name: '研究班MTG（1月第1回）',
    description: '研究班の定例ミーティング。新年の研究計画を立てる。',
    month: 'january',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 8000,
    consequences: [
      {
        type: 'skill',
        value: 'planning',
        amount: 12,
        message: '新年の研究計画立案能力が向上'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 8,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'thesis_rehearsal',
    type: 'thesis_rehearsal',
    name: '修論発表リハーサル',
    description: '修論発表のリハーサルを行う。本番に向けて準備を整える。',
    month: 'january',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 8001,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 30,
        message: 'プレゼンテーション能力が飛躍的に向上'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 15,
        message: '緊張したが、良い準備ができた'
      }
    ]
  },
  {
    id: 'thesis_consultation',
    type: 'thesis_consultation',
    name: '修論諮問会',
    description: '修論の諮問会に参加する。最終的な指導を受ける。',
    month: 'january',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 8002,
    consequences: [
      {
        type: 'skill',
        value: 'research',
        amount: 25,
        message: '研究能力が大幅に向上'
      },
      {
        type: 'relationship',
        value: 'professor',
        amount: 20,
        message: '教授との関係が深まった'
      }
    ]
  },
];

// 2月
const februaryEvents: GameEvent[] = [
  {
    id: 'research_group_mtg_february_1',
    type: 'research_group_mtg',
    name: '研究班MTG（2月第1回）',
    description: '研究班の定例ミーティング。卒論発表に向けた最終調整を行う。',
    month: 'february',
    week: 1,
    dayOfWeek: 'tuesday',
    isRequired: false,
    prerequisites: ['research_group_selection'],
    conversationId: 9000,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 15,
        message: '卒論発表の準備が整った'
      },
      {
        type: 'relationship',
        value: 'research_group_members',
        amount: 10,
        message: '研究班メンバーとの関係が深まった'
      }
    ]
  },
  {
    id: 'bachelor_rehearsal',
    type: 'bachelor_rehearsal',
    name: '卒論発表リハーサル',
    description: '卒論発表のリハーサルを行う。最後の準備。',
    month: 'february',
    week: 2,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 9001,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 25,
        message: 'プレゼンテーション能力が向上'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 10,
        message: '緊張したが、準備ができた'
      }
    ]
  },
  {
    id: 'bachelor_presentation',
    type: 'bachelor_presentation',
    name: '卒論発表会',
    description: '卒論発表会本番。これまでの研究の集大成を発表する。',
    month: 'february',
    week: 3,
    dayOfWeek: 'tuesday',
    isRequired: true,
    conversationId: 9002,
    consequences: [
      {
        type: 'skill',
        value: 'presentation',
        amount: 40,
        message: 'プレゼンテーション能力が飛躍的に向上'
      },
      {
        type: 'progress',
        value: 'research',
        amount: 50,
        message: '研究が完成した'
      },
      {
        type: 'relationship',
        value: 'professor',
        amount: 25,
        message: '教授から最高の評価を受けた'
      },
      {
        type: 'stress',
        value: 'stress',
        amount: 20,
        message: '緊張したが、成功した'
      }
    ]
  },
];

// 全イベントをまとめる（誕生日イベントは除外）
export function getAllEvents(): GameEvent[] {
  const baseEvents = [
    ...aprilEvents,
    ...mayEvents,
    ...juneEvents,
    ...julyEvents,
    ...augustEvents,
    ...septemberEvents,
    ...octoberEvents,
    ...novemberEvents,
    ...decemberEvents,
    ...januaryEvents,
    ...februaryEvents
  ];
  
  return baseEvents;
}

// 週数からイベントを取得
export function getEventsForWeek(week: number): GameEvent[] {
  const allEvents = getAllEvents();
  return allEvents.filter(event => {
    // 週数を月と週に変換（概算）
    const monthIndex = Math.floor((week - 1) / 4.33);
    const weekInMonth = ((week - 1) % 4) + 1;
    
    const monthOrder: Month[] = [
      'april', 'may', 'june', 'july', 'august', 'september',
      'october', 'november', 'december', 'january', 'february', 'march'
    ];
    
    const targetMonth = monthOrder[monthIndex % 12];
    return event.month === targetMonth && event.week === weekInMonth;
  });
}

// 月からイベントを取得
export function getEventsForMonth(month: Month): GameEvent[] {
  const allEvents = getAllEvents();
  return allEvents.filter(event => event.month === month);
}

// イベントをIDで取得
export function getEventById(id: string): GameEvent | undefined {
  const allEvents = getAllEvents();
  return allEvents.find(event => event.id === id);
}
