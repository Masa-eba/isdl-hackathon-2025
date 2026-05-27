import { useDeveloperMode } from '../../contexts/DeveloperModeContext';
import './DeveloperSkipButton.css';

export const DeveloperModeIndicator: React.FC = () => {
  const { isDeveloperMode } = useDeveloperMode();

  if (!isDeveloperMode) {
    return null;
  }

  return (
    <div className="developer-mode-indicator">
      DEV MODE - Xキーで切り替え
    </div>
  );
};
