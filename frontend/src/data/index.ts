// data/index.ts - データ関連の統合エクスポート

// キャラクター関連
export { LAB_CHARACTERS, getCharacterById, getAllCharacters } from './characters/characters';
export { RESEARCH_GROUPS } from './characters/researchGroups';

// 会話関連
export { 
  getConversationByChapter, 
  getConversationById, 
  getAllConversations,
  createPrologueConversation,
  createTutorialConversation,
  createEpilogueConversation,
  createBirthdayConversation,
  roleSelectionConversation,
  presentationConversations,
  lifeEventConversations
} from './conversations';

// 部屋関連
export { LAB_ROOMS, getRoomById, getAllRooms } from './rooms';

// 役割関連
export { LAB_ROLES } from './roles/roles';

// イベント関連
export { weeklyActions } from './events/weeklyActions';
export { getRoleEventsForWeek } from './events/roleEvents';
export { getEventsForWeek, createBirthdayEvent } from './events/events';

// アクションシステム
export { getAvailableActions } from './events/weeklyActions';
