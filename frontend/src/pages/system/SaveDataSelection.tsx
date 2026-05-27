// SaveDataSelection.tsx - セーブデータ選択画面

import { useState, useEffect } from 'react';
import { getSaveSlots, deleteSaveData } from '../../services/apiService';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import type { SaveSlot } from '../../services/apiService';
import './SaveDataSelection.css';

interface SaveDataSelectionProps {
  onNewGame: () => void;
  onLoadGame: (slotNumber: number) => void;
  onBackToTitle: () => void;
}

export function SaveDataSelection({ onNewGame, onLoadGame, onBackToTitle }: SaveDataSelectionProps) {
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { playButtonSound } = useButtonSFX();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await loadSaveSlots(cancelled);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadSaveSlots = async (cancelled = false) => {
    try {
      setLoading(true);
      const response = await getSaveSlots();
      if (response.success) {
        if (!cancelled) {
          setSaveSlots(response.slots);
        }
      } else {
        setError('セーブスロットの読み込みに失敗しました');
      }
    } catch (error) {
      console.error('セーブスロット読み込みエラー:', error);
      setError('セーブスロットの読み込みに失敗しました');
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  const handleDeleteSave = async (slotNumber: number) => {
    if (!window.confirm('このセーブデータを削除しますか？')) {
      return;
    }

    try {
      const response = await deleteSaveData(slotNumber);
      if (response.success) {
        // セーブスロット一覧を再読み込み
        await loadSaveSlots();
      } else {
        alert('セーブデータの削除に失敗しました');
      }
    } catch (error) {
      console.error('セーブデータ削除エラー:', error);
      alert('セーブデータの削除に失敗しました');
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP');
  };

  if (loading) {
    return (
      <div className="save-selection-container">
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="save-selection-container">
        <div className="error-message">{error}</div>
        <button onClick={onBackToTitle} className="back-button">
          タイトルに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="save-selection-container">
      <div className="save-selection-content">
        <h1 className="selection-title">研究室シミュレーション</h1>
        <h2 className="selection-subtitle">セーブデータを選択してください</h2>
        
        <div className="save-slots">
          {saveSlots.map((slot) => (
            <div key={slot.slot_number} className="save-slot">
              <div className="slot-header">
                <h3 className="slot-name">{slot.slot_name}</h3>
                {slot.has_data && (
                  <button
                    className="delete-button"
                    onClick={() => {
                      playButtonSound();
                      handleDeleteSave(slot.slot_number);
                    }}
                    title="セーブデータを削除"
                  >
                    🗑️
                  </button>
                )}
              </div>
              
              {slot.has_data ? (
                <div className="slot-data">
                  <div className="player-info">
                    <p><strong>プレイヤー:</strong> {slot.player_name}</p>
                    <p><strong>最終保存:</strong> {formatDate(slot.last_save || slot.updated_at)}</p>
                  </div>
                  <button
                    className="load-button"
                    onClick={() => {
                      playButtonSound();
                      onLoadGame(slot.slot_number);
                    }}
                  >
                    このデータでゲームを開始
                  </button>
                </div>
              ) : (
                <div className="empty-slot">
                  <p>空のスロット</p>
                  <button
                    className="new-game-button"
                    onClick={() => {
                      playButtonSound();
                      onNewGame();
                    }}
                  >
                    新しいゲームを開始
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="selection-actions">
          <button onClick={() => {
            playButtonSound();
            onBackToTitle();
          }} className="back-button">
            タイトルに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
