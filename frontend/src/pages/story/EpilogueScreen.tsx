// EpilogueScreen.tsx - エピローグ画面

import { useState, useEffect } from 'react';
import { DialogueBox } from '@/components/conversation/DialogueBox';
import { DeveloperSkipButton } from '@/components/developer/DeveloperSkipButton';
import { getConversationByChapter } from '@/data/conversations';
import { gameStateManager } from '@/utils/GameState';
import { useConversation } from '@/hooks/useConversation';
import { useBGM } from '@/hooks/useBGM';
import { useButtonSFX } from '@/hooks/useButtonSFX';
import type { GameState } from '@/types/game';
import './EpilogueScreen.css';

interface EpilogueScreenProps {
  onComplete: () => void;
  onBackToTitle: () => void;
}

export function EpilogueScreen({ onComplete, onBackToTitle }: EpilogueScreenProps) {
  const [conversation] = useState(getConversationByChapter('epilogue'));
  const [gameState, setGameState] = useState<GameState>(gameStateManager.getGameState());
  
  // BGMと効果音の設定
  useBGM({ track: 'EPILOGUE', autoPlay: true, fadeIn: true });
  const { playButtonSound } = useButtonSFX();
  
  const {
    currentDialogueIndex,
    handleNextDialogue,
    handleChoiceSelect,
  } = useConversation(conversation, onComplete, (choice) => {
    if (choice.effect) {
      gameStateManager.applyChoiceEffect(choice.effect);
      setGameState(gameStateManager.getGameState());
    }
    gameStateManager.recordChoice(choice.id);
  });

  // エピローグ会話の開始
  useEffect(() => {
    if (conversation) {
      gameStateManager.advanceChapter('epilogue');
    }
  }, [conversation]);



  if (!conversation) {
    return (
      <div className="epilogue-error">
        <h2>エピローグデータが見つかりません</h2>
        <button onClick={() => {
          playButtonSound();
          onBackToTitle();
        }}>タイトルに戻る</button>
      </div>
    );
  }

  const currentDialogue = conversation.dialogues[currentDialogueIndex];

  return (
    <div className="epilogue-container">
      <DeveloperSkipButton onSkip={onComplete} label="エピローグスキップ" />
      <DialogueBox
        text={currentDialogue.text}
        characterId={currentDialogue.characterId}
        backgroundUrl={currentDialogue.backgroundUrl}
        characterUrl={currentDialogue.characterUrl}
        characterPosition={currentDialogue.characterPosition}
        typingSpeed={currentDialogue.typingSpeed}
        onNext={handleNextDialogue}
        choices={currentDialogue.choices}
        onChoiceSelect={handleChoiceSelect}
        showStatus={currentDialogue.showStatus}
        gameState={gameState}
      />
      
      {/* エピローグ中の操作ボタン */}
      <div className="epilogue-controls">
        <button 
          className="epilogue-back-button"
          onClick={() => {
            playButtonSound();
            onBackToTitle();
          }}
        >
          ← タイトルに戻る
        </button>
      </div>
    </div>
  );
}
