// TitleScreen.tsx - タイトル画面

import { useState, useEffect } from 'react';
import { useBGM } from '../../hooks/useBGM';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import './TitleScreen.css';

interface TitleScreenProps {
  onStartGame: () => void;
}

// room画像のリスト
const roomImages = [
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg',
  '/images/room/placeholder.svg'
];

export function TitleScreen({ onStartGame }: TitleScreenProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // BGMと効果音の設定
  useBGM({ track: 'TITLE', autoPlay: true, fadeIn: true });
  const { playButtonSound } = useButtonSFX();

  // スライドショーの自動切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % roomImages.length
      );
    }, 3000); // 3秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="title-screen">
      {/* 背景スライドショー */}
      <div className="title-background">
        {roomImages.map((image, index) => (
          <div
            key={index}
            className={`background-slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="background-overlay" />
      </div>

      <div className="title-content">
        {/* ロゴ */}
        <div className="title-logo">
          <img src="/images/logo-placeholder.svg" alt="Lab Simulator" className="logo-image" />
        </div>

        {/* ゲームスタートボタン */}
        <button
          className={`start-button ${isHovered ? 'hovered' : ''}`}
          onClick={() => {
            playButtonSound();
            onStartGame();
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="button-text">ゲームスタート</span>
          <span className="button-icon">▶</span>
        </button>

        <div className="title-footer">
          <p>Hackathon Team</p>
          <p>2025 9月</p>
        </div>
      </div>
    </div>
  );
}
