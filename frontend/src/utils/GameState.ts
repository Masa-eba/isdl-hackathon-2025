// GameState.ts - ゲーム状態管理システム

import type { GameState, GameChapter, ChoiceEffect, LabRole, ResearchGroup, Relationship } from '../types/game';
import type { BackendLoadResponse } from '../types/save';
import { getAllCharacters } from '../data/characters/characters';

class GameStateManager {
  private static instance: GameStateManager;
  private gameState: GameState;
  private storageKey = 'isdl_game_state';

  private constructor() {
    this.gameState = this.getInitialState();
    this.loadGameState();
  }

  public static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  private getInitialState(): GameState {
    return {
      playerName: '',
      playerRole: '',
      currentChapter: 'title',
      currentEvent: '',
      researchSkill: 20,
      socialSkill: 30,
      professorAffection: 50,
      stressLevel: 30,
      dayCount: 1,
      birthMonth: 4,
      choices: [],
      currentDay: 'tuesday',
      labRoles: [], // 初期状態では役割なし
      researchGroups: [], // 初期状態では研究班なし
      actionCount: 0, // 行動回数を0に初期化
      completedEvents: [], // 完了したイベントを空配列で初期化
      relationships: [], // 初期状態では関係性なし
    };
  }

  // ゲーム状態の取得
  public getGameState(): GameState {
    return { ...this.gameState };
  }

  // ゲーム状態の更新
  public updateGameState(updates: Partial<GameState>): void {
    this.gameState = { ...this.gameState, ...updates };
    this.saveGameState();
  }

  // セーブデータからゲーム状態を読み込み
  public loadFromSaveData(saveData: BackendLoadResponse): void {
    if (saveData.game_data) {
      const data = saveData.game_data;
      
      // 関係性データの処理
      let relationships: Relationship[] = [];
      if (data.relationships) {
        if (typeof data.relationships === 'string') {
          try {
            relationships = JSON.parse(data.relationships) as Relationship[];
          } catch (e) {
            console.error('関係性データのパースエラー:', e);
            relationships = [];
          }
        } else {
          relationships = data.relationships;
        }
      }
      
      this.gameState = {
        playerName: data.player_name || '',
        playerRole: '学生',
        currentChapter: 'main-game',
        currentEvent: '',
        researchSkill: data.research_skill || 20,
        socialSkill: data.social_skill || 30,
        professorAffection: data.professor_affection || 50,
        stressLevel: data.stress_level || 30,
        dayCount: data.day_count || 1,
        birthMonth: data.birth_month || 4,
        choices: data.choices ? JSON.parse(data.choices) : [],
        currentDay: data.current_day === 'wednesday' ? 'wednesday' : 'tuesday',
        labRoles: data.lab_roles ? JSON.parse(data.lab_roles) : [],
        researchGroups: data.research_groups ? JSON.parse(data.research_groups) : [],
        actionCount: data.action_count || 0,
        completedEvents: data.completed_events ? JSON.parse(data.completed_events) : [],
        relationships: relationships,
      };
      
      this.saveGameState();
    }
  }

  // プレイヤー情報の設定
  public setPlayerInfo(name: string, role: string): void {
    this.gameState.playerName = name;
    this.gameState.playerRole = role;
    this.saveGameState();
  }

  public setBirthMonth(birthMonth: number): void {
    this.gameState.birthMonth = birthMonth;
    this.saveGameState();
  }

  // 現在の日付を設定
  public setCurrentDay(day: 'tuesday' | 'wednesday'): void {
    this.gameState.currentDay = day;
    this.gameState.actionCount = 0; // 日が変わったら行動回数をリセット
    this.saveGameState();
  }

  // 日数の進行
  public advanceDay(): void {
    this.gameState.dayCount++;
    this.saveGameState();
  }

  // 章の進行
  public advanceChapter(chapter: GameChapter): void {
    this.gameState.currentChapter = chapter;
    this.saveGameState();
  }

  // 研究スキルの更新
  public updateResearchSkill(change: number): void {
    this.gameState.researchSkill = Math.max(0, Math.min(100, this.gameState.researchSkill + change));
    this.saveGameState();
  }

  // 人間関係スキルの更新
  public updateSocialSkill(change: number): void {
    this.gameState.socialSkill = Math.max(0, Math.min(100, this.gameState.socialSkill + change));
    this.saveGameState();
  }

  // 教授好感度の更新
  public updateProfessorAffection(change: number): void {
    this.gameState.professorAffection = Math.max(0, Math.min(100, this.gameState.professorAffection + change));
    this.saveGameState();
  }

  // ストレスレベルの更新
  public updateStressLevel(change: number): void {
    this.gameState.stressLevel = Math.max(0, Math.min(100, this.gameState.stressLevel + change));
    this.saveGameState();
  }

  // 選択肢の記録
  public recordChoice(choiceId: string): void {
    if (!this.gameState.choices.includes(choiceId)) {
      this.gameState.choices.push(choiceId);
      this.saveGameState();
    }
  }

  // 選択肢効果の適用
  public applyChoiceEffect(effect: ChoiceEffect): void {
    if (effect.researchProgressChange) {
      this.updateResearchSkill(effect.researchProgressChange);
    }
    if (effect.stressChange) {
      this.updateStressLevel(effect.stressChange);
    }
  }


  // ローカルストレージを完全にクリア
  public clearLocalStorage(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('ローカルストレージのクリアに失敗しました:', error);
    }
  }

  // ゲーム状態を完全にリセット（ローカルストレージもクリア）
  public fullReset(): void {
    this.clearLocalStorage();
    this.gameState = this.getInitialState();
    this.saveGameState();
  }

  // 研究室の役割を設定
  public setLabRoles(roles: LabRole[]): void {
    // 最大2つの役割まで
    this.gameState.labRoles = roles.slice(0, 2);
    this.saveGameState();
  }


  // 研究班を設定
  public setResearchGroups(groups: ResearchGroup[]): void {
    // 最大1つの研究班まで
    this.gameState.researchGroups = groups.slice(0, 1);
    this.saveGameState();
  }


  // 行動回数を増加
  public incrementActionCount(): void {
    this.gameState.actionCount = Math.min(3, this.gameState.actionCount + 1);
    this.saveGameState();
  }

  // 行動回数を取得
  public getActionCount(): number {
    return this.gameState.actionCount;
  }


  // イベントを完了として記録
  public completeEvent(eventId: string): void {
    if (!this.gameState.completedEvents.includes(eventId)) {
      this.gameState.completedEvents.push(eventId);
      this.saveGameState();
    }
  }

  // イベントが完了済みかチェック
  public isEventCompleted(eventId: string): boolean {
    return this.gameState.completedEvents.includes(eventId);
  }


  // 親密度管理機能

  // 人物との関係性を初期化
  public initializeRelationships(): void {
    const characters = getAllCharacters();
    const relationships: Relationship[] = characters
      .filter(char => char.id !== 'player') // プレイヤー自身は除外
      .map(character => ({
        characterId: character.id,
        characterName: character.name,
        friendshipLevel: 0,
        trustLevel: 0,
        intimacyLevel: 0,
        isDating: false,
        hasBeenConfessed: false,
        lastInteraction: '',
        conversationCount: 0,
        favoriteTopics: [],
        dislikedTopics: [],
      }));
    
    this.gameState.relationships = relationships;
    this.saveGameState();
  }

  // 人物との関係性を取得
  public getRelationship(characterId: string): Relationship | undefined {
    return this.gameState.relationships.find((rel: Relationship) => rel.characterId === characterId);
  }


  // 親密度を更新
  public updateIntimacyLevel(characterId: string, change: number): void {
    const relationship = this.getRelationship(characterId);
    if (relationship) {
      relationship.intimacyLevel = Math.max(0, Math.min(100, relationship.intimacyLevel + change));
      relationship.conversationCount++;
      relationship.lastInteraction = new Date().toISOString();
      this.saveGameState();
    }
  }

  // 付き合い状態を設定
  public setDatingStatus(characterId: string, isDating: boolean): void {
    const relationship = this.getRelationship(characterId);
    if (relationship) {
      relationship.isDating = isDating;
      // 告白されたことを記録
      if (isDating) {
        relationship.hasBeenConfessed = true;
      }
      this.saveGameState();
    }
  }

  // 告白済みフラグを設定
  public setConfessedStatus(characterId: string, hasBeenConfessed: boolean): void {
    const relationship = this.getRelationship(characterId);
    if (relationship) {
      relationship.hasBeenConfessed = hasBeenConfessed;
      this.saveGameState();
    }
  }

  // 人物選択画面の表示状態を設定
  public setShowCharacterSelection(show: boolean, actionType?: 'chat_peer' | 'chat_senior'): void {
    this.gameState.showCharacterSelection = show;
    this.gameState.selectedActionType = actionType;
    this.saveGameState();
  }

  // 人物選択画面の表示状態を取得
  public getShowCharacterSelection(): boolean {
    return this.gameState.showCharacterSelection || false;
  }

  // 選択された行動タイプを取得
  public getSelectedActionType(): 'chat_peer' | 'chat_senior' | undefined {
    return this.gameState.selectedActionType;
  }

  // ローカルストレージへの保存
  private saveGameState(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.gameState));
    } catch (error) {
      console.error('ゲーム状態の保存に失敗しました:', error);
    }
  }
  
  // セーブデータ用のゲーム状態を取得
  public getSaveData() {
    return {
      player_name: this.gameState.playerName,
      research_skill: this.gameState.researchSkill,
      social_skill: this.gameState.socialSkill,
      professor_affection: this.gameState.professorAffection,
      stress_level: this.gameState.stressLevel,
      day_count: this.gameState.dayCount,
      current_week: Math.ceil(this.gameState.dayCount / 7),
      current_month: this.getCurrentMonth(),
      current_semester: this.getCurrentSemester(),
      choices: JSON.stringify(this.gameState.choices),
      current_day: this.gameState.currentDay,
      lab_roles: JSON.stringify(this.gameState.labRoles),
      research_groups: JSON.stringify(this.gameState.researchGroups),
      action_count: this.gameState.actionCount,
      completed_events: JSON.stringify(this.gameState.completedEvents),
      relationships: JSON.stringify(this.gameState.relationships)
    };
  }
  
  // 現在の月を取得
  private getCurrentMonth(): string {
    const rawMonth = Math.floor((this.gameState.dayCount - 1) / 30) + 4;
    const month = rawMonth > 12 ? rawMonth - 12 : rawMonth;
    return `${month}月`;
  }
  
  // 現在の学期を取得
  private getCurrentSemester(): string {
    const month = Math.floor((this.gameState.dayCount - 1) / 30) + 4;
    if (month >= 4 && month <= 9) return '前期';
    return '後期';
  }

  // ローカルストレージからの読み込み
  private loadGameState(): void {
    try {
      const savedState = localStorage.getItem(this.storageKey);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // 新しいパラメータが存在しない場合は初期値を設定
        if (parsedState.researchSkill === undefined) parsedState.researchSkill = 20;
        if (parsedState.socialSkill === undefined) parsedState.socialSkill = 30;
        if (parsedState.professorAffection === undefined) parsedState.professorAffection = 50;
        if (parsedState.stressLevel === undefined) parsedState.stressLevel = 30;
        if (parsedState.birthMonth === undefined) parsedState.birthMonth = 4;
        if (parsedState.currentDay === undefined) parsedState.currentDay = 'tuesday';
        if (parsedState.labRoles === undefined) parsedState.labRoles = [];
        if (parsedState.researchGroups === undefined) parsedState.researchGroups = [];
        if (parsedState.actionCount === undefined) parsedState.actionCount = 0;
        if (parsedState.completedEvents === undefined) parsedState.completedEvents = [];
        if (parsedState.relationships === undefined) parsedState.relationships = [];
        this.gameState = { ...this.getInitialState(), ...parsedState };
      }
    } catch (error) {
      console.error('ゲーム状態の読み込みに失敗しました:', error);
    }
  }
}

export const gameStateManager = GameStateManager.getInstance();
