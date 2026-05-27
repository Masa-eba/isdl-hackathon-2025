import type { Relationship } from './game'

export interface BackendGameData {
  slot_number: number
  player_name: string
  birth_month: number
  research_skill: number
  social_skill: number
  professor_affection: number
  stress_level: number
  day_count: number
  current_week: number
  current_month: string
  current_semester: string
  choices: string
  current_day: string
  lab_roles: string
  research_groups: string
  action_count: number
  completed_events: string
  relationships?: string | Relationship[]
}

export interface BackendLoadResponse {
  slot_info?: Record<string, unknown>
  game_data?: BackendGameData
}

