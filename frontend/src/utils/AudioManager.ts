// AudioManager.ts - BGM管理システム

import { GAME_CONSTANTS } from '../constants/gameConstants';

export type BGMTrack = keyof typeof GAME_CONSTANTS.BGM_PATHS;

class AudioManager {
  private currentTrack: BGMTrack | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private volume: number = GAME_CONSTANTS.BGM_SETTINGS.DEFAULT_VOLUME;
  private isMuted: boolean = false;
  private isEnabled: boolean = true;

  constructor() {
    // ローカルストレージから設定を読み込み
    this.loadSettings();
  }

  /**
   * BGMを再生する
   */
  async playBGM(track: BGMTrack, fadeIn: boolean = true): Promise<void> {
    if (!this.isEnabled || this.isMuted) return;

    // 同じトラックが既に再生中の場合は何もしない
    if (this.currentTrack === track && this.audioElement && !this.audioElement.paused) {
      return;
    }

    try {
      // 現在のBGMを停止
      await this.stopBGM(fadeIn);

      // 新しいBGMを読み込み
      const audioPath = GAME_CONSTANTS.BGM_PATHS[track];
      this.audioElement = new Audio(audioPath);
      this.audioElement.loop = GAME_CONSTANTS.BGM_SETTINGS.LOOP;
      this.audioElement.volume = this.isMuted ? 0 : this.volume;

      // フェードイン効果
      if (fadeIn) {
        this.audioElement.volume = 0;
        await this.audioElement.play();
        await this.fadeIn();
      } else {
        await this.audioElement.play();
      }

      this.currentTrack = track;
    } catch (error) {
      console.warn(`BGM再生エラー (${track}):`, error);
    }
  }

  /**
   * BGMを停止する
   */
  async stopBGM(fadeOut: boolean = true): Promise<void> {
    if (!this.audioElement) return;

    try {
      if (fadeOut) {
        await this.fadeOut();
      }
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
      this.currentTrack = null;
    } catch (error) {
      console.warn('BGM停止エラー:', error);
    }
  }

  /**
   * 音量を設定する
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audioElement && !this.isMuted) {
      this.audioElement.volume = this.volume;
    }
    this.saveSettings();
  }

  /**
   * ミュート状態を切り替える
   */
  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.saveSettings();
  }

  /**
   * BGM有効/無効を切り替える
   */
  toggleEnabled(): void {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stopBGM(false);
    }
    this.saveSettings();
  }

  /**
   * フェードイン効果
   */
  private async fadeIn(): Promise<void> {
    if (!this.audioElement) return;

    const fadeDuration = GAME_CONSTANTS.BGM_SETTINGS.FADE_DURATION;
    const steps = 20;
    const stepDuration = fadeDuration / steps;
    const volumeStep = this.volume / steps;

    for (let i = 0; i <= steps; i++) {
      if (!this.audioElement) break;
      this.audioElement.volume = volumeStep * i;
      await new Promise(resolve => setTimeout(resolve, stepDuration));
    }
  }

  /**
   * フェードアウト効果
   */
  private async fadeOut(): Promise<void> {
    if (!this.audioElement) return;

    const fadeDuration = GAME_CONSTANTS.BGM_SETTINGS.FADE_DURATION;
    const steps = 20;
    const stepDuration = fadeDuration / steps;
    const volumeStep = this.audioElement.volume / steps;

    for (let i = steps; i >= 0; i--) {
      if (!this.audioElement) break;
      this.audioElement.volume = volumeStep * i;
      await new Promise(resolve => setTimeout(resolve, stepDuration));
    }
  }

  /**
   * 設定をローカルストレージに保存
   */
  private saveSettings(): void {
    const settings = {
      volume: this.volume,
      isMuted: this.isMuted,
      isEnabled: this.isEnabled
    };
    localStorage.setItem('isdl_audio_settings', JSON.stringify(settings));
  }

  /**
   * 設定をローカルストレージから読み込み
   */
  private loadSettings(): void {
    try {
      const saved = localStorage.getItem('isdl_audio_settings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.volume = settings.volume ?? GAME_CONSTANTS.BGM_SETTINGS.DEFAULT_VOLUME;
        this.isMuted = settings.isMuted ?? false;
        this.isEnabled = settings.isEnabled ?? true;
      }
    } catch (error) {
      console.warn('オーディオ設定の読み込みエラー:', error);
    }
  }

  /**
   * 現在の状態を取得
   */
  getState() {
    return {
      currentTrack: this.currentTrack,
      volume: this.volume,
      isMuted: this.isMuted,
      isEnabled: this.isEnabled,
      isPlaying: this.audioElement && !this.audioElement.paused
    };
  }
}

// シングルトンインスタンス
export const audioManager = new AudioManager();
