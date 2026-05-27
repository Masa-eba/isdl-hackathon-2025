// GameMenu.tsx - ゲームメニューコンポーネント

import { useState } from 'react';
import { saveGameData } from '../../services/apiService';
import { useDeveloperMode } from '../../contexts/DeveloperModeContext';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import { buildSaveData } from '../../services/saveMapper';
import { gameStateManager } from '../../utils/GameState';
import { timeManager } from '../../utils/TimeManager';
import type { SaveData } from '../../services/apiService';
import './GameMenu.css';

interface GameMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveGame: (slotNumber: number) => void;
  onBackToTitle: () => void;
  currentSlotNumber: number;
}

export function GameMenu({ isOpen, onClose, onSaveGame, onBackToTitle, currentSlotNumber }: GameMenuProps) {
  const [selectedSlot, setSelectedSlot] = useState(currentSlotNumber);
  const [saving, setSaving] = useState(false);
  const { isDeveloperMode } = useDeveloperMode();
  const { playButtonSound } = useButtonSFX();

  const handleSaveGame = async () => {
    playButtonSound();
    setSaving(true);
    try {
      const saveData: SaveData = buildSaveData(selectedSlot);

      const response = await saveGameData(saveData);
      
      if (response.success) {
        alert('ゲームを保存しました！');
        onSaveGame(selectedSlot);
        onClose();
      } else {
        alert('セーブに失敗しました');
      }
    } catch (error) {
      console.error('セーブエラー:', error);
      alert('セーブに失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const handleBackToTitle = () => {
    playButtonSound();
    if (window.confirm('タイトルに戻りますか？保存していない進行状況は失われます。')) {
      onBackToTitle();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="game-menu-overlay" onClick={onClose}>
      <div className="game-menu" onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h2>メニュー</h2>
          <button className="close-button" onClick={() => {
            playButtonSound();
            onClose();
          }}>
            ✕
          </button>
        </div>
        
        <div className="menu-content">
          <div className="menu-section">
            <h3>セーブ</h3>
            <div className="save-options">
              <div className="slot-selection">
                <label>セーブスロット:</label>
                <select 
                  value={selectedSlot} 
                  onChange={(e) => setSelectedSlot(Number(e.target.value))}
                >
                  <option value={1}>スロット 1</option>
                  <option value={2}>スロット 2</option>
                  <option value={3}>スロット 3</option>
                </select>
              </div>
              <button 
                className="save-button"
                onClick={handleSaveGame}
                disabled={saving}
              >
                {saving ? '保存中...' : 'ゲームを保存'}
              </button>
            </div>
          </div>
          
          <div className="menu-section">
            <h3>ゲーム</h3>
            <button className="menu-button" onClick={handleBackToTitle}>
              タイトルに戻る
            </button>
          </div>
          
          {isDeveloperMode && (
            <div className="menu-section developer-section">
              <h3>開発者ツール</h3>
              <button 
                className="menu-button developer-button" 
                onClick={() => {
                  playButtonSound();
                  // ゲーム状態を最大値に設定
                  gameStateManager.updateResearchSkill(100 - gameStateManager.getGameState().researchSkill);
                  gameStateManager.updateSocialSkill(100 - gameStateManager.getGameState().socialSkill);
                  gameStateManager.updateProfessorAffection(100 - gameStateManager.getGameState().professorAffection);
                  gameStateManager.updateStressLevel(-gameStateManager.getGameState().stressLevel);
                  onClose();
                }}
              >
                スキルを最大にする
              </button>
              <button 
                className="menu-button developer-button" 
                onClick={() => {
                  playButtonSound();
                  // 週を52週（1年分）に進める
                  for (let i = 0; i < 52; i++) {
                    timeManager.advanceWeek();
                  }
                  onClose();
                }}
              >
                1年分進める
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
