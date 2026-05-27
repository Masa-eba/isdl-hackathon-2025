// SFXButton.tsx - 効果音付きボタンコンポーネント

import React from 'react';
import { useSFX } from '../../hooks/useSFX';
import './SFXButton.css';

interface SFXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  sfxType?: 'click' | 'none';
  className?: string;
}

export const SFXButton: React.FC<SFXButtonProps> = ({
  children,
  sfxType = 'click',
  className = '',
  onClick,
  ...props
}) => {
  const { playPushButton } = useSFX();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (sfxType === 'click') {
      playPushButton();
    }
    onClick?.(event);
  };

  return (
    <button
      className={`sfx-button ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
