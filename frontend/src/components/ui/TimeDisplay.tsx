// TimeDisplay.tsx - 時間表示コンポーネント

import type { TimeInfo } from '../../types/time';
import './TimeDisplay.css';

interface TimeDisplayProps {
  currentTime: TimeInfo;
  currentDay: 'tuesday' | 'wednesday';
}

export function TimeDisplay({ currentTime, currentDay }: TimeDisplayProps) {
  const getDayName = (day: 'tuesday' | 'wednesday') => {
    return day === 'tuesday' ? '火曜日' : '水曜日';
  };

  const getMonthName = (month: string) => {
    const monthMap: { [key: string]: string } = {
      'april': '4月',
      'may': '5月',
      'june': '6月',
      'july': '7月',
      'august': '8月',
      'september': '9月',
      'october': '10月',
      'november': '11月',
      'december': '12月',
      'january': '1月',
      'february': '2月',
      'march': '3月',
    };
    return monthMap[month] || month;
  };

  const getSemesterName = (semester: string) => {
    const semesterMap: { [key: string]: string } = {
      'spring': '前期',
      'summer': '夏休み',
      'autumn': '後期',
      'winter': '冬休み',
    };
    return semesterMap[semester] || semester;
  };

  return (
    <div className="time-display">
      <div className="time-content">
        <div className="time-main">
          <div className="time-week">第{currentTime.week}週</div>
          <div className="time-month">{getMonthName(currentTime.month)}</div>
          <div className="time-semester">{getSemesterName(currentTime.semester)}</div>
        </div>
        <div className="time-day">{getDayName(currentDay)}</div>
      </div>
    </div>
  );
}
