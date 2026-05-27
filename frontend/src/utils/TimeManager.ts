// TimeManager.ts - 時間管理エンジン

import type { 
  TimeInfo, 
  Month, 
  Semester
} from '../types/time';
import type { BackendLoadResponse } from '../types/save';

class TimeManagerEngine {
  private static instance: TimeManagerEngine;
  private currentTime: TimeInfo;
  private storageKey = 'isdl_time_state';

  private constructor() {
    this.currentTime = this.getInitialTime();
    this.loadTimeState();
  }

  public static getInstance(): TimeManagerEngine {
    if (!TimeManagerEngine.instance) {
      TimeManagerEngine.instance = new TimeManagerEngine();
    }
    return TimeManagerEngine.instance;
  }

  private getInitialTime(): TimeInfo {
    return {
      week: 1,
      month: 'april',
      semester: 'spring',
      isGameEnd: false,
    };
  }

  // 現在の時間情報を取得
  public getCurrentTime(): TimeInfo {
    return { ...this.currentTime };
  }

  // セーブデータから時間状態を読み込み
  public loadFromSaveData(saveData: BackendLoadResponse): void {
    if (saveData.game_data) {
      const data = saveData.game_data;
      
      // 保存された週数を直接使用
      const week = data.current_week || 1;
      
      this.currentTime = {
        week: week,
        month: this.getMonthFromString(data.current_month) || 'april',
        semester: this.getSemesterFromString(data.current_semester) || 'spring',
      };
      
      // 月と学期を週数に基づいて更新
      this.updateMonthAndSemester();
      
      this.saveTimeState();
    }
  }

  // 文字列から月を取得
  private getMonthFromString(monthString: string): Month | null {
    const monthMap: { [key: string]: Month } = {
      '4月': 'april', '5月': 'may', '6月': 'june',
      '7月': 'july', '8月': 'august', '9月': 'september',
      '10月': 'october', '11月': 'november', '12月': 'december',
      '1月': 'january', '2月': 'february', '3月': 'march',
      // 英語の月名も対応
      'april': 'april', 'may': 'may', 'june': 'june',
      'july': 'july', 'august': 'august', 'september': 'september',
      'october': 'october', 'november': 'november', 'december': 'december',
      'january': 'january', 'february': 'february', 'march': 'march'
    };
    return monthMap[monthString] || null;
  }

  // 文字列から学期を取得
  private getSemesterFromString(semesterString: string): Semester | null {
    const semesterMap: { [key: string]: Semester } = {
      '前期': 'spring', '夏休み': 'summer', '後期': 'autumn', '冬休み': 'winter',
      // 英語の学期名も対応
      'spring': 'spring', 'summer': 'summer', 'autumn': 'autumn', 'winter': 'winter'
    };
    return semesterMap[semesterString] || null;
  }

  // 週を進める
  public advanceWeek(): void {
    this.currentTime.week++;
    
    // 52週で一年終了
    if (this.currentTime.week > 52) {
      this.currentTime.week = 52;
      // エンディングフラグを設定
      this.currentTime.isGameEnd = true;
      this.saveTimeState();
      return;
    }

    // 月と学期の更新
    this.updateMonthAndSemester();
    
    this.saveTimeState();
  }

  // 週を戻る
  public goBackWeek(): void {
    this.currentTime.week--;
    
    // 1週未満には戻らない
    if (this.currentTime.week < 1) {
      this.currentTime.week = 1;
      return;
    }

    // 月と学期の更新
    this.updateMonthAndSemester();
    
    this.saveTimeState();
  }


  // 月と学期の更新
  private updateMonthAndSemester(): void {
    const monthOrder: Month[] = [
      'april', 'may', 'june', 'july', 'august', 'september',
      'october', 'november', 'december', 'january', 'february', 'march'
    ];
    
    const semesterMap: { [key in Month]: Semester } = {
      'april': 'spring', 'may': 'spring', 'june': 'spring',
      'july': 'summer', 'august': 'summer', 'september': 'summer',
      'october': 'autumn', 'november': 'autumn', 'december': 'autumn',
      'january': 'winter', 'february': 'winter', 'march': 'winter'
    };

    // 週数に基づいて月を決定（より正確な計算）
    // 1週目 = 4月第1週、2週目 = 4月第2週、... 17週目 = 7月第5週
    const weekToMonth = Math.floor((this.currentTime.week - 1) / 4.33);
    const monthIndex = weekToMonth % 12;
    this.currentTime.month = monthOrder[monthIndex];
    this.currentTime.semester = semesterMap[this.currentTime.month];
  }



  // 時間状態の保存
  private saveTimeState(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.currentTime));
    } catch (error) {
      console.error('時間状態の保存に失敗しました:', error);
    }
  }

  // 時間状態の読み込み
  private loadTimeState(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const loadedTime = JSON.parse(stored);
        this.currentTime = { ...this.getInitialTime(), ...loadedTime };
      }
    } catch (error) {
      console.error('時間状態の読み込みに失敗しました:', error);
    }
  }

  // 時間状態のリセット
  public resetTimeState(): void {
    this.currentTime = this.getInitialTime();
    localStorage.removeItem(this.storageKey);
  }
}

export const timeManager = TimeManagerEngine.getInstance();
