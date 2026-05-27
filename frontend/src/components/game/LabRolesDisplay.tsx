// LabRolesDisplay.tsx - 研究室役割表示コンポーネント


import type { LabRole } from '../../types/game';
import { getRoleById } from '../../data/roles/roles';
import './LabRolesDisplay.css';

interface LabRolesDisplayProps {
  roles: LabRole[];
}

export function LabRolesDisplay({ roles }: LabRolesDisplayProps) {
  if (roles.length === 0) {
    return (
      <div className="lab-roles-display">
        <div className="roles-header">
          <h3>研究室役割</h3>
        </div>
        <div className="no-roles">
          <span>役割が未設定です</span>
        </div>
      </div>
    );
  }

  return (
    <div className="lab-roles-display">
      <div className="roles-header">
        <h3>研究室役割</h3>
      </div>
      <div className="roles-list">
        {roles.map((roleId) => {
          const role = getRoleById(roleId);
          return (
            <div
              key={roleId}
              className="role-badge"
              style={{ 
                borderColor: role.color,
                backgroundColor: `${role.color}20`
              }}
            >
              <span className="role-icon" style={{ color: role.color }}>
                {role.icon}
              </span>
              <span className="role-name">{role.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
