import React, { createContext, useContext, useState, useEffect } from 'react';

interface DeveloperModeContextType {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
}

const DeveloperModeContext = createContext<DeveloperModeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useDeveloperMode = () => {
  const context = useContext(DeveloperModeContext);
  if (context === undefined) {
    throw new Error('useDeveloperMode must be used within a DeveloperModeProvider');
  }
  return context;
};

interface DeveloperModeProviderProps {
  children: React.ReactNode;
}

export const DeveloperModeProvider: React.FC<DeveloperModeProviderProps> = ({ children }) => {
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  const toggleDeveloperMode = () => {
    setIsDeveloperMode(prev => {
      const newState = !prev;
      // Developer mode: ${newState ? 'enabled' : 'disabled'}
      return newState;
    });
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // X キーで開発者モードを切り替え
      if (event.key === 'x' || event.key === 'X') {
        event.preventDefault();
        toggleDeveloperMode();
        // Developer mode toggled
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <DeveloperModeContext.Provider value={{ isDeveloperMode, toggleDeveloperMode }}>
      {children}
    </DeveloperModeContext.Provider>
  );
};
