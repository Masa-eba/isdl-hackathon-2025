// useConversation.ts - 会話処理のカスタムフック

import { useState, useCallback } from 'react';
import type { GameConversationData, Choice } from '../types/game';

interface UseConversationReturn {
  currentDialogueIndex: number;
  setCurrentDialogueIndex: (index: number) => void;
  handleNextDialogue: () => void;
  handleChoiceSelect: (choice: Choice) => void;
}

export function useConversation(
  conversation: GameConversationData | null,
  onComplete?: () => void,
  onChoiceEffect?: (choice: Choice) => void
): UseConversationReturn {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const handleNextDialogue = useCallback(() => {
    if (!conversation) return;

    const currentDialogue = conversation.dialogues[currentDialogueIndex];
    
    // 現在のダイアログにnextDialogueIdが設定されている場合は、そのダイアログに移動
    if (currentDialogue.nextDialogueId) {
      const nextDialogueIndex = conversation.dialogues.findIndex(
        (dialogue) => dialogue.id === currentDialogue.nextDialogueId
      );
      if (nextDialogueIndex !== -1) {
        setCurrentDialogueIndex(nextDialogueIndex);
        return;
      }
    }

    // 通常の進行：次のダイアログに進む
    if (currentDialogueIndex < conversation.dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      // 会話終了
      onComplete?.();
    }
  }, [conversation, currentDialogueIndex, onComplete]);

  const handleChoiceSelect = useCallback((choice: Choice) => {
    // 選択肢の効果を適用
    if (choice.effect) {
      onChoiceEffect?.(choice);
    }
    
    // 分岐先のダイアログIDがある場合は、そのダイアログに移動
    if (choice.nextDialogueId && conversation) {
      const nextDialogueIndex = conversation.dialogues.findIndex(
        (dialogue) => dialogue.id === choice.nextDialogueId
      );
      if (nextDialogueIndex !== -1) {
        setCurrentDialogueIndex(nextDialogueIndex);
        return;
      }
    }
    
    // 分岐先がない場合は次のダイアログに進む
    handleNextDialogue();
  }, [conversation, handleNextDialogue, onChoiceEffect]);

  return {
    currentDialogueIndex,
    setCurrentDialogueIndex,
    handleNextDialogue,
    handleChoiceSelect,
  };
}
