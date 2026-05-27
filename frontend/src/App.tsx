
import { useState } from 'react';
import { 
  TitleScreen, 
  SaveDataSelection, 
  CharacterCreation, 
  PrologueScreen, 
  MainGameNew, 
  EpilogueScreen, 
  EndingScreen 
} from './pages';
import { loadGameData } from './services/apiService';
import { gameStateManager, timeManager } from './game';
import { DeveloperModeProvider } from './contexts/DeveloperModeContext';
import { DeveloperModeIndicator } from './components/developer/DeveloperModeIndicator';
import { AudioControls } from './components/ui/AudioControls';
import './styles/App.css';

function App() {
  //画面遷移
  const [currentScreen, setCurrentScreen] = useState<'title' | 'save_selection' | 'character_creation' | 'prologue' | 'main-game' | 'epilogue' | 'ending'>('title');
  const [currentSlotNumber, setCurrentSlotNumber] = useState(1);

  const handleStartGame = () => {
    setCurrentScreen('save_selection');
  };

  const handleNewGame = async () => {
    try {
      // ローカルストレージをクリア
      gameStateManager.fullReset();
      timeManager.resetTimeState();
      
      setCurrentScreen('character_creation');
    } catch (error) {
      console.error('新しいゲーム開始エラー:', error);
      alert('新しいゲームの開始に失敗しました');
    }
  };

  const handleLoadGame = async (slotNumber: number) => {
    try {
      const response = await loadGameData(slotNumber);
      
      if (response.success && response.data) {
        // ゲーム状態を読み込み
        gameStateManager.loadFromSaveData(response.data);
        timeManager.loadFromSaveData(response.data);
        
        setCurrentSlotNumber(slotNumber);
        setCurrentScreen('main-game');
      } else {
        alert('セーブデータの読み込みに失敗しました');
      }
    } catch (error) {
      console.error('セーブデータ読み込みエラー:', error);
      alert('セーブデータの読み込みに失敗しました');
    }
  };

  const handleCharacterCreationComplete = () => {
    setCurrentScreen('prologue');
  };

  const handlePrologueComplete = () => {
    setCurrentScreen('main-game');
  };

  const handleBackToTitle = () => {
    // タイトルに戻る際にゲーム状態をクリア
    gameStateManager.fullReset();
    timeManager.resetTimeState();
    setCurrentScreen('title');
  };

  const handleGameEnd = () => {
    setCurrentScreen('epilogue');
  };

  const handleEpilogueComplete = () => {
    setCurrentScreen('ending');
  };

  const handleRestartGame = () => {
    setCurrentScreen('title');
  };

  return (
    <DeveloperModeProvider>
      <div className="App">
        <DeveloperModeIndicator />
        <AudioControls />
        {currentScreen === 'title' ? (
          <TitleScreen onStartGame={handleStartGame} />
        ) : currentScreen === 'save_selection' ? (
          <SaveDataSelection 
            onNewGame={handleNewGame}
            onLoadGame={handleLoadGame}
            onBackToTitle={handleBackToTitle}
          />
        ) : currentScreen === 'character_creation' ? (
          <CharacterCreation 
            onComplete={handleCharacterCreationComplete}
            onBackToTitle={handleBackToTitle}
          />
        ) : currentScreen === 'prologue' ? (
          <PrologueScreen 
            onComplete={handlePrologueComplete}
            onBackToTitle={handleBackToTitle}
          />
        ) : currentScreen === 'main-game' ? (
          <MainGameNew 
            onBackToTitle={handleBackToTitle} 
            onGameEnd={handleGameEnd}
            currentSlotNumber={currentSlotNumber}
          />
        ) : currentScreen === 'epilogue' ? (
          <EpilogueScreen 
            onComplete={handleEpilogueComplete}
            onBackToTitle={handleBackToTitle}
          />
        ) : (
          <EndingScreen onBackToTitle={handleBackToTitle} onRestartGame={handleRestartGame} />
        )}
      </div>
    </DeveloperModeProvider>
  );
}

export default App;