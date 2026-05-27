// EndingScreen.tsx - エンディング画面

import { useState, useEffect } from 'react';
import { gameStateManager } from '../../utils/GameState';
import { DeveloperSkipButton } from '../../components/developer/DeveloperSkipButton';
import { useBGM } from '../../hooks/useBGM';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import type { GameState } from '../../types/game';
import './EndingScreen.css';

interface EndingScreenProps {
  onBackToTitle: () => void;
  onRestartGame: () => void;
}

export function EndingScreen({ onBackToTitle, onRestartGame }: EndingScreenProps) {
  const [gameState] = useState<GameState>(gameStateManager.getGameState());
  const [showStats, setShowStats] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  
  // BGMと効果音の設定
  useBGM({ track: 'ENDING', autoPlay: true, fadeIn: true });
  const { playButtonSound } = useButtonSFX();

  useEffect(() => {
    // 3秒後に統計情報を表示
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showStats) {
      // 統計情報を順番に表示
      const interval = setInterval(() => {
        setCurrentStat(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showStats]);

  const getEndingMessage = () => {
    const researchSkill = gameState.researchSkill;
    const stress = gameState.stressLevel;

    if (researchSkill >= 80 && stress <= 30) {
      return "完璧な研究生活でした！";
    } else if (researchSkill >= 60) {
      return "充実した研究生活でした！";
    } else if (stress >= 70) {
      return "大変な研究生活でしたが、乗り越えました！";
    } else {
      return "研究室での貴重な経験でした！";
    }
  };

  const getGrade = () => {
    const researchSkill = gameState.researchSkill;
    if (researchSkill >= 90) return "S";
    if (researchSkill >= 80) return "A";
    if (researchSkill >= 70) return "B";
    if (researchSkill >= 60) return "C";
    return "D";
  };

  return (
    <div className="ending-screen">
      <DeveloperSkipButton onSkip={() => onBackToTitle()} label="タイトルに戻る" />
      <div className="ending-background">
        <div className="ending-content">
          {!showStats ? (
            <div className="ending-message">
              <h1 className="ending-title">研究室シミュレーション</h1>
              <h2 className="ending-subtitle">一年間の研究生活が終了しました</h2>
              <div className="ending-loading">
                <div className="loading-spinner"></div>
                <p>結果を計算中...</p>
              </div>
            </div>
          ) : (
            <div className="ending-stats">
              <h1 className="stats-title">研究生活の結果</h1>
              
              <div className="grade-section">
                <h2>最終評価</h2>
                <div className="grade">{getGrade()}</div>
              </div>

              <div className="stats-grid">
                {currentStat >= 1 && (
                  <div className="stat-item">
                    <h3>研究スキル</h3>
                    <div className="stat-value">{gameState.researchSkill}%</div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ width: `${gameState.researchSkill}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {currentStat >= 2 && (
                  <div className="stat-item">
                    <h3>ストレスレベル</h3>
                    <div className="stat-value">{gameState.stressLevel}%</div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill stress" 
                        style={{ width: `${gameState.stressLevel}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {currentStat >= 3 && (
                  <div className="stat-item">
                    <h3>人間関係スキル</h3>
                    <div className="stat-value">
                      {gameState.socialSkill}%
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill relationship" 
                        style={{ 
                          width: `${gameState.socialSkill}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {currentStat >= 4 && (
                  <div className="stat-item">
                    <h3>選択した選択肢</h3>
                    <div className="stat-value">{gameState.choices.length}個</div>
                  </div>
                )}
              </div>

              {currentStat >= 4 && (
                <div className="ending-message-final">
                  <h2>{getEndingMessage()}</h2>
                  <p>君の研究室での経験は、これからの人生の糧となるでしょう。</p>
                  <p>お疲れ様でした！</p>
                </div>
              )}

              {currentStat >= 4 && (
                <div className="ending-buttons">
                  <button className="back-to-title-button" onClick={() => {
                    playButtonSound();
                    onBackToTitle();
                  }}>
                    タイトルに戻る
                  </button>
                  <button className="restart-game-button" onClick={() => {
                    playButtonSound();
                    onRestartGame();
                  }}>
                    最初からやり直す
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
