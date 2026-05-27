// useSFX.ts - 効果音管理のカスタムフック

import { useCallback } from 'react';
import { sfxManager, type SFXTrack } from '../utils/SFXManager';

export function useSFX() {
  const playSFX = useCallback(async (track: SFXTrack, volume?: number) => {
    await sfxManager.playSFX(track, volume);
  }, []);

  const playPushButton = useCallback(async () => {
    await sfxManager.playPushButton();
  }, []);

  const playTyping = useCallback(async () => {
    await sfxManager.playTyping();
  }, []);

  return {
    playSFX,
    playPushButton,
    playTyping,
    sfxState: sfxManager.getState()
  };
}
