// ChoiceBox.tsx - 選択肢表示コンポーネント

import { useState } from 'react';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import type { Choice } from '../../types/game';
import './ChoiceBox.css';

interface ChoiceBoxProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  disabled?: boolean;
}

export function ChoiceBox({ choices, onChoiceSelect, disabled = false }: ChoiceBoxProps) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const { playButtonSound } = useButtonSFX();

  const handleChoiceClick = (choice: Choice) => {
    if (disabled) return;
    
    // 効果音を再生
    playButtonSound();
    
    setSelectedChoiceId(choice.id);
    
    // 少し遅延を入れてから選択を実行（アニメーション効果のため）
    setTimeout(() => {
      onChoiceSelect(choice);
      setSelectedChoiceId(null);
    }, 200);
  };

  if (choices.length === 0) {
    return null;
  }

  return (
    <div className="choice-box">
      <div className="choice-container">
        {choices.map((choice, index) => (
          <button
            key={choice.id}
            className={`choice-button ${selectedChoiceId === choice.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => handleChoiceClick(choice)}
            disabled={disabled}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <span className="choice-text">{choice.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
