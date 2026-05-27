// game.ts - 研究室シミュレーションゲームの型定義

// 研究室の役割
export type LabRole = 
  | "chief"        // チーフ
  | "media"        // メディア
  | "infrastructure" // インフラ
  | "intellectual_property" // 知的財産
  | "meeting"      // ミーティング
  | "tex"          // Tex
  | "event";       // イベント

// 研究班
export type ResearchGroup = 
  | "opt"          // Opt班
  | "rec"          // Rec班
  | "gen"          // Gen班
  | "bio"          // Bio班
  | "none";        // 研究班なし（教授用）


// ゲーム状態
export interface GameState {
  playerName: string;
  playerRole: string;
  currentChapter: GameChapter;
  currentEvent: string;
  researchSkill: number;        // 研究スキル (0-100)
  socialSkill: number;          // 人間関係スキル (0-100)
  professorAffection: number;   // 教授好感度 (0-100)
  stressLevel: number;          // ストレス (0-100)
  dayCount: number;
  birthMonth: number;           // 誕生月 (1-12)
  choices: string[]; // プレイヤーが選択した選択肢の履歴
  currentDay: 'tuesday' | 'wednesday'; // 現在の曜日
  labRoles: LabRole[]; // 所属している研究室の役割（最大2つ）
  researchGroups: ResearchGroup[]; // 所属している研究班（最大1つ）
  actionCount: number; // 現在の日の行動回数（0-3）
  completedEvents: string[]; // 完了したイベントのIDリスト
  relationships: Relationship[]; // 各人物との関係性
  showCharacterSelection?: boolean; // 人物選択画面を表示するかどうか
  selectedActionType?: 'chat_peer' | 'chat_senior'; // 選択された行動タイプ
}

// ゲームの章
export type GameChapter = 
  | "title"
  | "character_creation" 
  | "prologue"
  | "main-game"
  | "tutorial"
  | "d_day"
  | "life_events"
  | "epilogue"
  | "lab_orientation"
  | "basic_seminar"
  | "research_group_intro"
  | "meeting_handover"
  | "welcome_party"
  | "cv_preparation"
  | "cv_rehearsal"
  | "cv_presentation"
  | "paper_reading"
  | "monthly_presentation_m1"
  | "paper_reading_creation"
  | "grad_school_exam"
  | "friendship_party"
  | "monthly_presentation_mid"
  | "year_end_journal"
  | "year_end_party"
  | "thesis_rehearsal"
  | "thesis_consultation"
  | "bachelor_rehearsal"
  | "research_continuation"
  | "hackathon"
  | "bachelor_presentation"
  | "role_selection"
  | "research_group_selection"
  | "research_group_mtg"
  | "research_opt"
  | "research_rec"
  | "research_gen"
  | "research_bio"
  | "research_general"
  | "professor_consultation_research"
  | "professor_consultation_future"
  | "professor_consultation_lab_life"
  | "professor_consultation_technical";

// キャラクター関係性
export interface Relationship {
  characterId: string;
  characterName: string;
  friendshipLevel: number; // 0-100
  trustLevel: number; // 0-100
  intimacyLevel: number; // 親密度 0-100
  isDating: boolean; // 付き合っているかどうか
  hasBeenConfessed: boolean; // 告白されたことがあるかどうか
  lastInteraction: string;
  conversationCount: number; // 会話回数
  favoriteTopics: string[]; // 好きな話題
  dislikedTopics: string[]; // 嫌いな話題
}

// 選択肢
export interface Choice {
  id: string;
  text: string;
  nextDialogueId?: string;
  effect?: ChoiceEffect;
  condition?: ChoiceCondition;
}

// 選択肢の効果
export interface ChoiceEffect {
  relationshipChange?: { characterId: string; change: number };
  stressChange?: number;
  researchProgressChange?: number;
  unlockEvent?: string;
  confessionResponse?: { characterId: string; accepted: boolean }; // 告白への返答
  skillChange?: { type: string; amount: number }; // スキル変化
}

// 選択肢の条件
export interface ChoiceCondition {
  minFriendshipLevel?: { characterId: string; level: number };
  maxStressLevel?: number;
  requiredChoice?: string;
}


// キャラクター情報
export interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  grade: 'U4' | 'M1' | 'M2' | 'professor' | 'narrator';
  roles: LabRole[]; // 役割（最大2つ）
  researchGroup: ResearchGroup; // 研究班
  imageUrl: string;
  personality: string;
  background: string;
  isProfessor?: boolean; // 教授かどうか
  isNarrator?: boolean; // ナレーターかどうか
}

// 研究室の部屋
export interface Room {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// 研究室シミュレーション用の会話データ拡張
export interface GameDialogueData {
  id: string;
  text: string;
  characterId?: string; // キャラクターID（オプション）
  backgroundUrl?: string;
  characterUrl?: string;
  characterPosition?: "left" | "center" | "right";
  typingSpeed?: number;
  choices?: Choice[];
  gameEvent?: string;
  showStatus?: boolean;
  nextDialogueId?: string; // 次のダイアログのID（分岐用）
  showRoleSelection?: boolean; // 役割選択画面を表示するかどうか
  showResearchGroupSelection?: boolean; // 研究班選択画面を表示するかどうか
  randomizeResearchGroup?: boolean; // 研究班をランダム決定するかどうか
}

export interface GameConversationData {
  id: number;
  title: string;
  description: string;
  chapter: GameChapter;
  dialogues: GameDialogueData[];
  metadata?: {
    author?: string;
    version?: string;
    tags?: string[];
    estimatedDuration?: number;
    requiredProgress?: number;
  };
}
