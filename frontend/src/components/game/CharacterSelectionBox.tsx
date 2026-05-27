// CharacterSelectionBox.tsx - 人物選択コンポーネント

import { useState } from 'react';
import type { Character, Relationship } from '../../types/game';
import { getAllCharacters } from '../../data/characters/characters';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import './CharacterSelectionBox.css';

// 役割名のマッピング
const ROLE_NAMES: Record<string, string> = {
  'chief': 'チーフ',
  'media': 'メディア',
  'infrastructure': 'インフラ',
  'intellectual_property': '知的財産',
  'meeting': 'ミーティング',
  'tex': 'Tex',
  'event': 'イベント'
};

interface CharacterSelectionBoxProps {
  actionType: 'chat_peer' | 'chat_senior';
  relationships: Relationship[];
  onCharacterSelect: (character: Character) => void;
  onCancel: () => void;
}

export function CharacterSelectionBox({ 
  actionType, 
  relationships, 
  onCharacterSelect, 
  onCancel 
}: CharacterSelectionBoxProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const allCharacters = getAllCharacters();
  const { playButtonSound } = useButtonSFX();

  // 同期（U4）または先輩（M1, M2）をフィルタリング
  const filteredCharacters = allCharacters.filter(character => {
    if (actionType === 'chat_peer') {
      return character.grade === 'U4' && character.id !== 'player';
    } else if (actionType === 'chat_senior') {
      return character.grade === 'M1' || character.grade === 'M2';
    }
    return false;
  });

  // 人物との関係性を取得
  const getRelationship = (characterId: string): Relationship | undefined => {
    return relationships.find(rel => rel.characterId === characterId);
  };

  // 親密度に基づく表示色を取得
  const getIntimacyColor = (intimacyLevel: number): string => {
    if (intimacyLevel >= 80) return '#FF69B4'; // ピンク（恋人レベル）
    if (intimacyLevel >= 60) return '#FF6B6B'; // 赤（親友レベル）
    if (intimacyLevel >= 40) return '#FFA500'; // オレンジ（友達レベル）
    if (intimacyLevel >= 20) return '#FFD700'; // 黄色（知り合いレベル）
    return '#87CEEB'; // 青（初対面レベル）
  };

  // 親密度に基づく関係性テキストを取得
  const getRelationshipText = (relationship: Relationship | undefined): string => {
    if (!relationship) return '初対面';
    if (relationship.isDating) return '恋人';
    if (relationship.intimacyLevel >= 80) return '親友';
    if (relationship.intimacyLevel >= 60) return '友達';
    if (relationship.intimacyLevel >= 40) return '知り合い';
    if (relationship.intimacyLevel >= 20) return '少し知ってる';
    return '初対面';
  };

  const handleCharacterClick = (character: Character) => {
    playButtonSound();
    setSelectedCharacter(character);
  };

  const handleConfirm = () => {
    if (selectedCharacter) {
      playButtonSound();
      onCharacterSelect(selectedCharacter);
    }
  };

  const actionTypeText = actionType === 'chat_peer' ? '同期とおしゃべり' : '先輩とおしゃべり';

  return (
    <div className="character-selection-box">
      <div className="character-selection-header">
        <h2>{actionTypeText}</h2>
        <p>誰とおしゃべりしますか？</p>
        <button className="cancel-button" onClick={() => {
          playButtonSound();
          onCancel();
        }}>
          キャンセル
        </button>
      </div>

      <div className="characters-grid">
        {filteredCharacters.map((character) => {
          const relationship = getRelationship(character.id);
          const intimacyColor = getIntimacyColor(relationship?.intimacyLevel || 0);
          const relationshipText = getRelationshipText(relationship);

          return (
            <div
              key={character.id}
              className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
              onClick={() => handleCharacterClick(character)}
              style={{ borderColor: intimacyColor }}
            >
              <div className="character-image">
                <img src={character.imageUrl} alt={character.name} />
              </div>
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <p className="character-grade">{character.grade}</p>
                <p className="character-roles">
                  {character.roles.map((role: string) => ROLE_NAMES[role] || role).join('・')}
                </p>
                <div className="relationship-info">
                  <span 
                    className="relationship-text"
                    style={{ color: intimacyColor }}
                  >
                    {relationshipText}
                  </span>
                  {relationship && (
                    <span className="intimacy-level">
                      親密度: {relationship.intimacyLevel}%
                    </span>
                  )}
                </div>
                {relationship?.isDating && (
                  <div className="dating-badge">
                    💕 付き合い中
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedCharacter && (
        <div className="character-selection-footer">
          <div className="selected-character-info">
            <p>選択中: <strong>{selectedCharacter.name}</strong></p>
            <p>{selectedCharacter.personality}</p>
          </div>
          <button 
            className="confirm-button"
            onClick={handleConfirm}
          >
            この人とおしゃべりする
          </button>
        </div>
      )}
    </div>
  );
}
