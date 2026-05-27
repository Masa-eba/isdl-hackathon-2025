// saveMapper.ts - GameState/TimeStateからAPI用セーブデータを生成
import { gameStateManager } from '../utils/GameState'
import { timeManager } from '../utils/TimeManager'
import type { SaveData } from './apiService'

export function buildSaveData(slotNumber: number): SaveData {
  const gameState = gameStateManager.getGameState()
  const timeInfo = timeManager.getCurrentTime()

  return {
    slot_number: slotNumber,
    player_name: gameState.playerName,
    birth_month: gameState.birthMonth,
    research_skill: gameState.researchSkill,
    social_skill: gameState.socialSkill,
    professor_affection: gameState.professorAffection,
    stress_level: gameState.stressLevel,
    day_count: gameState.dayCount,
    current_week: timeInfo.week,
    current_month: timeInfo.month,
    current_semester: timeInfo.semester,
    choices: JSON.stringify(gameState.choices),
    current_day: gameState.currentDay || 'tuesday',
    lab_roles: JSON.stringify(gameState.labRoles),
    research_groups: JSON.stringify(gameState.researchGroups),
    action_count: gameState.actionCount,
    completed_events: JSON.stringify(gameState.completedEvents),
    relationships: JSON.stringify(gameState.relationships)
  }
}

