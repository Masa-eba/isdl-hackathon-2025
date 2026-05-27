// time.ts - 時間管理システムの型定義


// 月の定義
export type Month = 
  | 'april' | 'may' | 'june' | 'july' | 'august' | 'september'
  | 'october' | 'november' | 'december' | 'january' | 'february' | 'march';

// 学期の定義
export type Semester = 'spring' | 'summer' | 'autumn' | 'winter';

// 時間情報
export interface TimeInfo {
  week: number;        // 週数（1-52）
  month: Month;        // 月
  semester: Semester;  // 学期
  isGameEnd?: boolean; // ゲーム終了フラグ
}


// 時間管理システム
export interface TimeManager {
  getCurrentTime(): TimeInfo;
  advanceWeek(): void;
}

