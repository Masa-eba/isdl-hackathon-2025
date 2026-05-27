// useBGM.ts - BGM管理のカスタムフック

import { useEffect, useRef } from 'react';
import { audioManager, type BGMTrack } from '../utils/AudioManager';

interface UseBGMProps {
  track: BGMTrack;
  autoPlay?: boolean;
  fadeIn?: boolean;
}

export function useBGM({ track, autoPlay = true, fadeIn = true }: UseBGMProps) {
  const previousTrack = useRef<BGMTrack | null>(null);

  useEffect(() => {
    if (autoPlay) {
      // 前のトラックと異なる場合のみ再生
      if (previousTrack.current !== track) {
        audioManager.playBGM(track, fadeIn);
        previousTrack.current = track;
      }
    }

    // クリーンアップ関数
    return () => {
      // コンポーネントがアンマウントされる際の処理
      // 必要に応じてBGMを停止するかどうかを決定
    };
  }, [track, autoPlay, fadeIn]);

  return {
    playBGM: (newTrack: BGMTrack, shouldFadeIn = true) => {
      audioManager.playBGM(newTrack, shouldFadeIn);
      previousTrack.current = newTrack;
    },
    stopBGM: (fadeOut = true) => audioManager.stopBGM(fadeOut),
    audioState: audioManager.getState()
  };
}
