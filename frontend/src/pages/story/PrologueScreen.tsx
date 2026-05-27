// PrologueScreen.tsx - プロローグ画面

import { useState, useEffect } from 'react';
import { DialogueBox } from '@/components/conversation/DialogueBox';
import { DeveloperSkipButton } from '@/components/developer/DeveloperSkipButton';
import { getConversationByChapter } from '@/data/conversations';
import { gameStateManager } from '@/utils/GameState';
import { useConversation } from '@/hooks/useConversation';
import { useButtonSFX } from '@/hooks/useButtonSFX';
import { useBGM } from '@/hooks/useBGM';
import type { GameState } from '@/types/game';
import './PrologueScreen.css';

interface PrologueScreenProps {
  onComplete: () => void;
  onBackToTitle: () => void;
}

export function PrologueScreen({ onComplete, onBackToTitle }: PrologueScreenProps) {
  const [conversation] = useState(getConversationByChapter('prologue'));
  const [gameState, setGameState] = useState<GameState>(gameStateManager.getGameState());
  const { playButtonSound } = useButtonSFX();
  
  // BGMの設定
  useBGM({ track: 'PROLOGUE', autoPlay: true, fadeIn: true });
  
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

  // プロローグ会話の開始
  useEffect(() => {
    if (conversation) {
      gameStateManager.advanceChapter('prologue');
    }
  }, [conversation]);



  if (!conversation) {
    return (
      <div className="prologue-error">
        <h2>プロローグデータが見つかりません</h2>
        <button onClick={() => {
          playButtonSound();
          onBackToTitle();
        }}>タイトルに戻る</button>
      </div>
    );
  }

  const currentDialogue = conversation.dialogues[currentDialogueIndex];

  return (
    <div className="prologue-container">
      <DeveloperSkipButton onSkip={onComplete} label="プロローグスキップ" />
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
      
      {/* プロローグ中の操作ボタン */}
      <div className="prologue-controls">
        <button 
          className="prologue-back-button"
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
