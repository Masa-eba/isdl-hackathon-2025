"use client"

import { useState, useEffect, useCallback } from "react"
import type { Choice, GameState } from "../../types/game"
import { ChoiceBox } from "./ChoiceBox"
import { DeveloperSkipButton } from "../developer/DeveloperSkipButton"
import { getCharacterById } from "../../data/characters/characters"
import "./DialogueBox.css"

interface DialogueBoxProps {
  /** 表示するテキスト */
  text: string
  /** キャラクターID（オプション） */
  characterId?: string
  /** 次のダイアログに進む際のコールバック */
  onNext?: () => void
  /** タイピング速度（ミリ秒） */
  typingSpeed?: number
  /** カスタムクラス名 */
  className?: string
  /** 背景画像のURL */
  backgroundUrl?: string
  /** キャラクター立ち絵のURL */
  characterUrl?: string
  /** キャラクター立ち絵の位置 */
  characterPosition?: "left" | "center" | "right"
  /** 選択肢 */
  choices?: Choice[]
  /** 選択肢選択時のコールバック */
  onChoiceSelect?: (choice: Choice) => void
  /** ゲーム状態表示 */
  showStatus?: boolean
  /** ゲーム状態 */
  gameState?: GameState
}

export function DialogueBox({
  text,
  characterId,
  onNext,
  typingSpeed = 150,
  className,
  backgroundUrl,
  characterUrl,
  characterPosition = "right",
  choices,
  onChoiceSelect,
  showStatus = false,
  gameState,
}: DialogueBoxProps) {
  // キャラクターIDからキャラクター情報を取得
  const character = characterId ? getCharacterById(characterId) : null;
  
  // キャラクター情報から名前と画像を取得
  const displayName = character?.name || "不明";
  const displayCharacterUrl = character ? character.imageUrl : characterUrl;
  
  // 研究班名をテキストに埋め込む
  const processedText = text.replace('{research_group}', () => {
    if (gameState?.researchGroups && gameState.researchGroups.length > 0) {
      const groupId = gameState.researchGroups[0];
      const groupNames = {
        'opt': 'Opt班',
        'rec': 'Rec班',
        'gen': 'Gen班',
        'bio': 'Bio班',
        'none': '研究班なし'
      };
      return groupNames[groupId] || '研究班';
    }
    return '研究班';
  });
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [backgroundError, setBackgroundError] = useState(false)
  const [characterError, setCharacterError] = useState(false)
  const [showChoices, setShowChoices] = useState(false)

  // タイピングエフェクト
  useEffect(() => {
    if (currentIndex < processedText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(processedText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
        
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [currentIndex, processedText, typingSpeed])

  // テキストが変更されたときにリセット
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
    setIsTyping(true)
    setBackgroundError(false)
    setCharacterError(false)
    setShowChoices(false)
  }, [processedText])

  // クリック・キーボードハンドラー
  const handleInteraction = useCallback(() => {
    if (isTyping) {
      // タイピング中なら全文表示
      setDisplayedText(processedText)
      setCurrentIndex(processedText.length)
      setIsTyping(false)
    } else {
      // 全文表示後、選択肢がある場合は選択肢を表示
      if (choices && choices.length > 0 && !showChoices) {
        setShowChoices(true)
      } else {
        // 選択肢がない、または既に選択肢が表示されている場合は次へ
        onNext?.()
      }
    }
  }, [isTyping, processedText, onNext, choices, showChoices])

  // キーボードイベント
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 選択肢表示中はキーボードイベントを無効にする
      if (choices && choices.length > 0 && !isTyping) return;
      
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault()
        handleInteraction()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleInteraction, choices, isTyping])

  // 背景画像エラーハンドラー
  const handleBackgroundError = () => {
    console.error(`背景画像の読み込みに失敗しました: ${backgroundUrl}`)
    setBackgroundError(true)
  }

  // 選択肢が表示される条件
  const shouldShowChoices = choices && choices.length > 0 && !isTyping && showChoices

  // キャラクター画像エラーハンドラー
  const handleCharacterError = () => {
    console.error(`キャラクター画像の読み込みに失敗しました: ${characterUrl}`)
    setCharacterError(true)
  }

  return (
    <div
      className={`dialogue-container ${className || ""}`}
      onClick={shouldShowChoices ? undefined : handleInteraction}
    >
      <DeveloperSkipButton onSkip={onNext || (() => {})} label="スキップ" />
      {backgroundUrl && !backgroundError && (
        <div className="dialogue-background">
          <img 
            src={backgroundUrl} 
            alt="Background" 
            onError={handleBackgroundError}
          />
        </div>
      )}

      {/* フォールバック背景 */}
      {(!backgroundUrl || backgroundError) && (
        <div className="dialogue-fallback-bg" />
      )}

      {displayCharacterUrl && !characterError && (
        <div className={`dialogue-character ${characterPosition}`}>
          <img
            src={displayCharacterUrl}
            alt={displayName}
            onError={handleCharacterError}
          />
        </div>
      )}

      {/* ゲーム状態表示 */}
      {showStatus && gameState && (
        <div className="game-status-overlay">
          <div className="status-item">
            <span>研究スキル: {gameState.researchSkill}%</span>
          </div>
          <div className="status-item">
            <span>ストレス: {gameState.stressLevel}%</span>
          </div>
          <div className="status-item">
            <span>日数: {gameState.dayCount}日目</span>
          </div>
        </div>
      )}

      {/* ダイアログボックス - 選択肢表示時は非表示 */}
      {!shouldShowChoices && (
        <div className="dialogue-box">
          <div className="dialogue-content dialogue-fade-in">
            {/* 装飾的なボーダー */}
            <div className="dialogue-border" />

            {/* コンテンツ */}
            <div className="relative z-10">
              {/* 名前表示エリア */}
              <div className="dialogue-name">
                <div className="dialogue-name-badge">
                  <span className="dialogue-name-text">{displayName}</span>
                </div>
              </div>

              {/* テキスト表示エリア */}
              <div className="dialogue-text-container">
                <p className="dialogue-text">
                  {displayedText}
                  {isTyping && <span className="typing-cursor" />}
                </p>
              </div>

              {/* 続行インジケーター */}
              {!isTyping && (
                <div className="continue-indicator">
                  <div className="continue-arrow" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 選択肢表示 */}
      {shouldShowChoices && onChoiceSelect && (
        <ChoiceBox
          choices={choices}
          onChoiceSelect={onChoiceSelect}
        />
      )}

      {/* 選択肢があるがまだ表示されていない場合のインジケーター */}
      {choices && choices.length > 0 && !isTyping && !showChoices && (
        <div className="choice-indicator">
          <div className="choice-arrow" />
        </div>
      )}
    </div>
  )
}
