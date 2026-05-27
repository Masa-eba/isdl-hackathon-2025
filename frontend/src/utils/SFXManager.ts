// SFXManager.ts - 効果音管理システム

import { GAME_CONSTANTS } from '../constants/gameConstants';

export type SFXTrack = keyof typeof GAME_CONSTANTS.SFX_PATHS;

class SFXManager {
  private volume: number = GAME_CONSTANTS.SFX_SETTINGS.DEFAULT_VOLUME;
  private isMuted: boolean = false;
  private isEnabled: boolean = true;
  private activeAudioElements: HTMLAudioElement[] = [];

  constructor() {
    // ローカルストレージから設定を読み込み
    this.loadSettings();
  }

  /**
   * 効果音を再生する
   */
  async playSFX(track: SFXTrack, volume: number = this.volume): Promise<void> {
    if (!this.isEnabled || this.isMuted) return;

    try {
      // 同時再生数の制限
      if (this.activeAudioElements.length >= GAME_CONSTANTS.SFX_SETTINGS.MAX_CONCURRENT) {
        // 最も古い効果音を停止
        const oldestAudio = this.activeAudioElements.shift();
        if (oldestAudio) {
          oldestAudio.pause();
          oldestAudio.remove();
        }
      }

      // 新しい効果音を読み込み
      const audioPath = GAME_CONSTANTS.SFX_PATHS[track];
      const audioElement = new Audio(audioPath);
      audioElement.volume = this.isMuted ? 0 : volume;
      audioElement.loop = false;

      // 再生完了時のクリーンアップ
      audioElement.addEventListener('ended', () => {
        this.removeAudioElement(audioElement);
      });

      audioElement.addEventListener('error', () => {
        console.warn(`効果音再生エラー (${track}):`, audioElement.error);
        this.removeAudioElement(audioElement);
      });

      // 再生開始
      await audioElement.play();
      this.activeAudioElements.push(audioElement);

    } catch (error) {
      console.warn(`効果音再生エラー (${track}):`, error);
    }
  }

  /**
   * 共通ボタン押下効果音（Push button）
   */
  async playPushButton(): Promise<void> {
    await this.playSFX('PUSH_BUTTON');
  }

  /**
   * タイピング効果音（一文字表示時）
   */
  async playTyping(): Promise<void> {
    await this.playSFX('TYPING');
  }


  /**
   * 音量を設定する
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
  }

  /**
   * ミュート状態を切り替える
   */
  toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.saveSettings();
  }

  /**
   * 効果音有効/無効を切り替える
   */
  toggleEnabled(): void {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stopAllSFX();
    }
    this.saveSettings();
  }

  /**
   * すべての効果音を停止
   */
  stopAllSFX(): void {
    this.activeAudioElements.forEach(audio => {
      audio.pause();
      audio.remove();
    });
    this.activeAudioElements = [];
  }

  /**
   * オーディオエレメントをリストから削除
   */
  private removeAudioElement(audioElement: HTMLAudioElement): void {
    const index = this.activeAudioElements.indexOf(audioElement);
    if (index > -1) {
      this.activeAudioElements.splice(index, 1);
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
    localStorage.setItem('isdl_sfx_settings', JSON.stringify(settings));
  }

  /**
   * 設定をローカルストレージから読み込み
   */
  private loadSettings(): void {
    try {
      const saved = localStorage.getItem('isdl_sfx_settings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.volume = settings.volume ?? GAME_CONSTANTS.SFX_SETTINGS.DEFAULT_VOLUME;
        this.isMuted = settings.isMuted ?? false;
        this.isEnabled = settings.isEnabled ?? true;
      }
    } catch (error) {
      console.warn('効果音設定の読み込みエラー:', error);
    }
  }

  /**
   * 現在の状態を取得
   */
  getState() {
    return {
      volume: this.volume,
      isMuted: this.isMuted,
      isEnabled: this.isEnabled,
      activeCount: this.activeAudioElements.length
    };
  }
}

// シングルトンインスタンス
export const sfxManager = new SFXManager();
