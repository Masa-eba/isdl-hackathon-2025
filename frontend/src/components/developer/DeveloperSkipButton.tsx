import { useDeveloperMode } from '../../contexts/DeveloperModeContext';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import './DeveloperSkipButton.css';

interface DeveloperSkipButtonProps {
  onSkip: () => void;
  label?: string;
  className?: string;
}

export const DeveloperSkipButton: React.FC<DeveloperSkipButtonProps> = ({ 
  onSkip, 
  label = "スキップ", 
  className = "" 
}) => {
  const { isDeveloperMode } = useDeveloperMode();
  const { playButtonSound } = useButtonSFX();

  if (!isDeveloperMode) {
    return null;
  }

  return (
    <button 
      className={`developer-skip-button ${className}`}
      onClick={() => {
        playButtonSound();
        onSkip();
      }}
      title="開発者モード: Xキーで切り替え"
    >
      🚀 {label}
    </button>
  );
};
