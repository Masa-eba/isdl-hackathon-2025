// RelationshipPanel.tsx - 親密度表示パネル

import type { Relationship } from '../../types/game';
import { getAllCharacters } from '../../data/characters/characters';
import './RelationshipPanel.css';

interface RelationshipPanelProps {
  relationships: Relationship[];
}

export function RelationshipPanel({ relationships }: RelationshipPanelProps) {
  const characters = getAllCharacters();

  // 親密度に基づく表示色を取得
  const getIntimacyColor = (intimacyLevel: number): string => {
    if (intimacyLevel >= 80) return '#FF69B4'; // ピンク（恋人レベル）
    if (intimacyLevel >= 60) return '#FF6B6B'; // 赤（親友レベル）
    if (intimacyLevel >= 40) return '#FFA500'; // オレンジ（友達レベル）
    if (intimacyLevel >= 20) return '#FFD700'; // 黄色（知り合いレベル）
    return '#87CEEB'; // 青（初対面レベル）
  };

  // 親密度に基づく関係性テキストを取得
  const getRelationshipText = (relationship: Relationship): string => {
    if (relationship.isDating) return '恋人';
    if (relationship.intimacyLevel >= 80) return '親友';
    if (relationship.intimacyLevel >= 60) return '友達';
    if (relationship.intimacyLevel >= 40) return '知り合い';
    if (relationship.intimacyLevel >= 20) return '少し知ってる';
    return '初対面';
  };

  // 人物情報を取得
  const getCharacterInfo = (characterId: string) => {
    return characters.find(char => char.id === characterId);
  };

  // 親密度が高い順にソート
  const sortedRelationships = relationships
    .filter(rel => rel.intimacyLevel > 0) // 親密度が0より大きいもののみ表示
    .sort((a, b) => b.intimacyLevel - a.intimacyLevel)
    .slice(0, 5); // 上位5名のみ表示

  if (sortedRelationships.length === 0) {
    return (
      <div className="relationship-panel">
        <h3 className="relationship-panel-title">親密度</h3>
        <div className="relationship-panel-content">
          <p className="relationship-empty">まだ誰とも親密になっていません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relationship-panel">
      <h3 className="relationship-panel-title">親密度</h3>
      <div className="relationship-panel-content">
        {sortedRelationships.map((relationship) => {
          const character = getCharacterInfo(relationship.characterId);
          if (!character) return null;

          const intimacyColor = getIntimacyColor(relationship.intimacyLevel);
          const relationshipText = getRelationshipText(relationship);

          return (
            <div key={relationship.characterId} className="relationship-item">
              <div className="relationship-character">
                <img 
                  src={character.imageUrl} 
                  alt={character.name} 
                  className="relationship-avatar"
                />
                <div className="relationship-info">
                  <div className="relationship-name">{character.name}</div>
                  <div className="relationship-grade">{character.grade}</div>
                </div>
              </div>
              <div className="relationship-status">
                <div 
                  className="relationship-text"
                  style={{ color: intimacyColor }}
                >
                  {relationshipText}
                </div>
                <div className="relationship-level">
                  {relationship.intimacyLevel}%
                </div>
                {relationship.isDating && (
                  <div className="dating-indicator">💕</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
