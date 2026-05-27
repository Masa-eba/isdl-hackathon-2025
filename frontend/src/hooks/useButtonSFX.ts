// useButtonSFX.ts - ボタン効果音のグローバルフック

import { useCallback } from 'react';
import { sfxManager } from '../utils/SFXManager';

/**
 * 既存のボタンに効果音を追加するためのフック
 * すべてのボタンクリックで共通の「Push button」音を再生
 */
export function useButtonSFX() {
  const playButtonSound = useCallback(async () => {
    await sfxManager.playPushButton();
  }, []);

  return {
    playButtonSound
  };
}
