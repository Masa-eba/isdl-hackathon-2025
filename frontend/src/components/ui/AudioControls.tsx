// AudioControls.tsx - BGM制御UI

import { useState, useEffect } from 'react';
import { audioManager } from '../../utils/AudioManager';
import { sfxManager } from '../../utils/SFXManager';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import './AudioControls.css';

export const AudioControls: React.FC = () => {
  const [audioState, setAudioState] = useState(audioManager.getState());
  const [sfxState, setSfxState] = useState(sfxManager.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const { playButtonSound } = useButtonSFX();

  useEffect(() => {
    // 状態更新のためのポーリング（実際の実装ではイベントベースにする）
    const interval = setInterval(() => {
      setAudioState(audioManager.getState());
      setSfxState(sfxManager.getState());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    audioManager.setVolume(volume);
    setAudioState(audioManager.getState());
  };

  const handleMuteToggle = () => {
    audioManager.toggleMute();
    setAudioState(audioManager.getState());
  };

  const handleEnabledToggle = () => {
    audioManager.toggleEnabled();
    setAudioState(audioManager.getState());
  };

  const handleSFXVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    sfxManager.setVolume(volume);
    setSfxState(sfxManager.getState());
  };

  const handleSFXMuteToggle = () => {
    sfxManager.toggleMute();
    setSfxState(sfxManager.getState());
  };

  const handleSFXEnabledToggle = () => {
    sfxManager.toggleEnabled();
    setSfxState(sfxManager.getState());
  };

  return (
    <div className={`audio-controls ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="audio-toggle"
        onClick={() => {
          playButtonSound();
          setIsExpanded(!isExpanded);
        }}
        title="オーディオ設定"
      >
        {audioState.isEnabled ? '🔊' : '🔇'}
      </button>

      {isExpanded && (
        <div className="audio-panel">
          {/* BGM設定 */}
          <div className="audio-section">
            <h4>BGM</h4>
            <div className="audio-control-group">
              <label>
                <input
                  type="checkbox"
                  checked={audioState.isEnabled}
                  onChange={handleEnabledToggle}
                />
                BGM有効
              </label>
            </div>

            {audioState.isEnabled && (
              <>
                <div className="audio-control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={!audioState.isMuted}
                      onChange={handleMuteToggle}
                    />
                    ミュート解除
                  </label>
                </div>

                <div className="audio-control-group">
                  <label>
                    音量: {Math.round(audioState.volume * 100)}%
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={audioState.volume}
                      onChange={handleVolumeChange}
                      disabled={audioState.isMuted}
                    />
                  </label>
                </div>

                {audioState.currentTrack && (
                  <div className="current-track">
                    再生中: {audioState.currentTrack}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 効果音設定 */}
          <div className="audio-section">
            <h4>効果音</h4>
            <div className="audio-control-group">
              <label>
                <input
                  type="checkbox"
                  checked={sfxState.isEnabled}
                  onChange={handleSFXEnabledToggle}
                />
                効果音有効
              </label>
            </div>

            {sfxState.isEnabled && (
              <>
                <div className="audio-control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={!sfxState.isMuted}
                      onChange={handleSFXMuteToggle}
                    />
                    ミュート解除
                  </label>
                </div>

                <div className="audio-control-group">
                  <label>
                    音量: {Math.round(sfxState.volume * 100)}%
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={sfxState.volume}
                      onChange={handleSFXVolumeChange}
                      disabled={sfxState.isMuted}
                    />
                  </label>
                </div>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
