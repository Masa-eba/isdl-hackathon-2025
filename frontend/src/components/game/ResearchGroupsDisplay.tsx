// ResearchGroupsDisplay.tsx - 研究班表示コンポーネント

import type { ResearchGroup } from '../../types/game';
import { getResearchGroupById } from '../../data/characters/researchGroups';
import './ResearchGroupsDisplay.css';

interface ResearchGroupsDisplayProps {
  researchGroups: ResearchGroup[];
}

export function ResearchGroupsDisplay({ researchGroups }: ResearchGroupsDisplayProps) {
  if (researchGroups.length === 0) {
    return (
      <div className="research-groups-display">
        <h3>研究班</h3>
        <div className="no-research-groups">
          <p>まだ研究班が決定されていません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="research-groups-display">
      <h3>研究班</h3>
      <div className="research-groups-list">
        {researchGroups.map((groupId) => {
          const group = getResearchGroupById(groupId);
          return (
            <div
              key={group.id}
              className="research-group-item"
              style={{ borderColor: group.color }}
            >
              <div className="research-group-icon" style={{ color: group.color }}>
                {group.icon}
              </div>
              <div className="research-group-details">
                <span className="research-group-name">{group.name}</span>
                <span className="research-group-description">{group.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
