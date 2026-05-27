// RoleSelectionBox.tsx - 役割選択コンポーネント

import { useState } from 'react';
import type { LabRole } from '../../types/game';
import { getAllRoles } from '../../data/roles/roles';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import './RoleSelectionBox.css';

interface RoleSelectionBoxProps {
  onRoleSelect: (roles: LabRole[]) => void;
  maxRoles?: number;
}

export function RoleSelectionBox({ onRoleSelect, maxRoles = 2 }: RoleSelectionBoxProps) {
  const [selectedRoles, setSelectedRoles] = useState<LabRole[]>([]);
  const allRoles = getAllRoles();
  const { playButtonSound } = useButtonSFX();

  const handleRoleClick = (role: LabRole) => {
    playButtonSound();
    
    if (selectedRoles.includes(role)) {
      // 既に選択されている場合は削除
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      // 新しい役割を追加（最大数まで）
      if (selectedRoles.length < maxRoles) {
        setSelectedRoles([...selectedRoles, role]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedRoles.length > 0) {
      playButtonSound();
      onRoleSelect(selectedRoles);
    }
  };

  const isRoleSelected = (role: LabRole) => selectedRoles.includes(role);
  const canSelectMore = selectedRoles.length < maxRoles;

  return (
    <div className="role-selection-box">
      <div className="role-selection-header">
        <h2>研究室の役割を選択してください</h2>
        <p>4年生として、{maxRoles}つの役割に所属します</p>
        <div className="selection-status">
          選択済み: {selectedRoles.length}/{maxRoles}
        </div>
      </div>

      <div className="roles-grid">
        {allRoles.map((role) => (
          <div
            key={role.id}
            className={`role-card ${isRoleSelected(role.id) ? 'selected' : ''} ${
              !isRoleSelected(role.id) && !canSelectMore ? 'disabled' : ''
            }`}
            onClick={() => handleRoleClick(role.id)}
            style={{ borderColor: role.color }}
          >
            <div className="role-icon" style={{ color: role.color }}>
              {role.icon}
            </div>
            <div className="role-info">
              <h3 className="role-name">{role.name}</h3>
              <p className="role-description">{role.description}</p>
            </div>
            {isRoleSelected(role.id) && (
              <div className="selected-indicator">✓</div>
            )}
          </div>
        ))}
      </div>

      <div className="role-selection-footer">
        <button
          className="confirm-button"
          onClick={handleConfirm}
          disabled={selectedRoles.length === 0}
        >
          役割を決定する
        </button>
      </div>
    </div>
  );
}
