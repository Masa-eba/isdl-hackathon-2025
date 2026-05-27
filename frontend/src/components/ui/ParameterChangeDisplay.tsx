// ParameterChangeDisplay.tsx - パラメータ変化表示コンポーネント

import './ParameterChangeDisplay.css';

export interface ParameterChange {
  researchSkill: number;
  socialSkill: number;
  professorAffection: number;
  stressLevel: number;
  intimacyChanges?: { [characterId: string]: number };
}

interface ParameterChangeDisplayProps {
  changes: ParameterChange;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

export function ParameterChangeDisplay({ 
  changes, 
  isVisible, 
  onClose, 
  title = "パラメータ変化" 
}: ParameterChangeDisplayProps) {
  if (!isVisible) return null;

  const formatChange = (value: number) => {
    if (value === 0) return '';
    return value > 0 ? `+${value}` : `${value}`;
  };

  const getChangeClass = (value: number) => {
    if (value === 0) return 'no-change';
    return value > 0 ? 'positive-change' : 'negative-change';
  };

  return (
    <div className="parameter-change-overlay">
      <div className="parameter-change-modal">
        <div className="parameter-change-header">
          <h3 className="parameter-change-title">{title}</h3>
          <button className="parameter-change-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="parameter-change-content">
          <div className="parameter-grid">
            <div className="parameter-item">
              <div className="parameter-icon">📚</div>
              <div className="parameter-info">
                <span className="parameter-label">研究スキル</span>
                <span className={`parameter-value ${getChangeClass(changes.researchSkill)}`}>
                  {formatChange(changes.researchSkill)}
                </span>
              </div>
            </div>
            
            <div className="parameter-item">
              <div className="parameter-icon">👥</div>
              <div className="parameter-info">
                <span className="parameter-label">人間関係</span>
                <span className={`parameter-value ${getChangeClass(changes.socialSkill)}`}>
                  {formatChange(changes.socialSkill)}
                </span>
              </div>
            </div>
            
            <div className="parameter-item">
              <div className="parameter-icon">👨‍🏫</div>
              <div className="parameter-info">
                <span className="parameter-label">教授好感度</span>
                <span className={`parameter-value ${getChangeClass(changes.professorAffection)}`}>
                  {formatChange(changes.professorAffection)}
                </span>
              </div>
            </div>
            
            <div className="parameter-item">
              <div className="parameter-icon">😰</div>
              <div className="parameter-info">
                <span className="parameter-label">ストレス</span>
                <span className={`parameter-value ${getChangeClass(changes.stressLevel)}`}>
                  {formatChange(changes.stressLevel)}
                </span>
              </div>
            </div>
          </div>
          
          {changes.intimacyChanges && Object.keys(changes.intimacyChanges).length > 0 && (
            <div className="intimacy-changes">
              <h4 className="intimacy-title">親密度変化</h4>
              <div className="intimacy-grid">
                {Object.entries(changes.intimacyChanges).map(([characterId, change]) => (
                  <div key={characterId} className="intimacy-item">
                    <span className="intimacy-character">{characterId}</span>
                    <span className={`intimacy-value ${getChangeClass(change)}`}>
                      {formatChange(change)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="parameter-change-footer">
          <button className="parameter-change-ok-button" onClick={onClose}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
}
