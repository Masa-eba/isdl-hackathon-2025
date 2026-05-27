// CharacterCreation.tsx - 個人情報入力画面

import { useState } from 'react';
import { gameStateManager } from '../../utils/GameState';
import { savePlayerInfo, checkBackendConnection } from '../../services/apiService';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import './CharacterCreation.css';

interface CharacterCreationProps {
  onComplete: () => void;
  onBackToTitle: () => void;
}

export function CharacterCreation({ onComplete, onBackToTitle }: CharacterCreationProps) {
  const [playerName, setPlayerName] = useState('');
  const [birthMonth, setBirthMonth] = useState(4);
  const { playButtonSound } = useButtonSFX();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playButtonSound();
    
    if (!playerName.trim()) {
      alert('名前を入力してください');
      return;
    }

    try {
      // バックエンドの接続を確認
      const isConnected = await checkBackendConnection();
      
      if (isConnected) {
        // バックエンドにプレイヤー情報を保存
        await savePlayerInfo({
          name: playerName,
          birth_month: birthMonth,
        });
        // Player info saved to backend
      } else {
        console.warn('バックエンドに接続できないため、ローカルストレージのみに保存します');
      }
    } catch (error) {
      console.error('プレイヤー情報の保存に失敗しました:', error);
      alert('プレイヤー情報の保存に失敗しました。ローカルストレージのみに保存します。');
    }

    // ゲーム状態にプレイヤー情報を保存（ローカル）
    gameStateManager.setPlayerInfo(playerName, '学生');
    gameStateManager.setBirthMonth(birthMonth);
    
    // 完了処理
    onComplete();
  };

  return (
    <div className="character-creation-container">
      <div className="character-creation-content">
        <h1 className="creation-title">研究室シミュレーション</h1>
        <h2 className="creation-subtitle">あなたの情報を入力してください</h2>
        
        <form onSubmit={handleSubmit} className="creation-form">
          <div className="form-group">
            <label htmlFor="playerName">名前</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="あなたの名前を入力"
              maxLength={20}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthMonth">誕生月</label>
            <select
              id="birthMonth"
              value={birthMonth}
              onChange={(e) => setBirthMonth(Number(e.target.value))}
            >
              <option value={1}>1月</option>
              <option value={2}>2月</option>
              <option value={3}>3月</option>
              <option value={4}>4月</option>
              <option value={5}>5月</option>
              <option value={6}>6月</option>
              <option value={7}>7月</option>
              <option value={8}>8月</option>
              <option value={9}>9月</option>
              <option value={10}>10月</option>
              <option value={11}>11月</option>
              <option value={12}>12月</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => {
              playButtonSound();
              onBackToTitle();
            }} className="back-button">
              タイトルに戻る
            </button>
            <button type="submit" className="start-button">
              ゲームを開始
            </button>
          </div>
        </form>

        <div className="character-preview">
          <h3>あなたのプロフィール</h3>
          <div className="profile-card">
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <p><strong>名前:</strong> {playerName || '未入力'}</p>
              <p><strong>誕生月:</strong> {birthMonth}月</p>
              <p><strong>役割:</strong> 学生</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
