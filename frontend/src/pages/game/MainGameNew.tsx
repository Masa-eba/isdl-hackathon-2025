// MainGameNew.tsx - 新しいメインゲーム画面

import { useEffect, useCallback } from 'react';
import { timeManager } from '../../utils/TimeManager';
import { gameStateManager } from '../../utils/GameState';
import { DialogueBox } from '../../components/conversation/DialogueBox';
import { GameMenu } from '../../components/game/GameMenu';
import { DeveloperSkipButton } from '../../components/developer/DeveloperSkipButton';
import { RoleSelectionBox } from '../../components/game/RoleSelectionBox';
import { TimeDisplay } from '../../components/ui/TimeDisplay';
import { CharacterSelectionBox } from '../../components/game/CharacterSelectionBox';
import { LabRolesDisplay } from '../../components/game/LabRolesDisplay';
import { ResearchGroupsDisplay } from '../../components/game/ResearchGroupsDisplay';
import { RelationshipPanel } from '../../components/layout/RelationshipPanel';
import { getConversationByChapter, getConversationById, getResearchConversationByGroup, getRandomProfessorConsultationConversation } from '../../data/conversations';
import { executeAction } from '../../data/actionSystem';
import { getCharacterConversation, getIntimacyChange, generateConfessionResponse } from '../../data/characters/characterConversations';
import { useGameState } from '../../hooks/useGameState';
import { useConversation } from '../../hooks/useConversation';
import { useParameterChange } from '../../hooks/useParameterChange';
import { useBGM } from '../../hooks/useBGM';
import { useButtonSFX } from '../../hooks/useButtonSFX';
import { ParameterChangeDisplay } from '../../components/ui/ParameterChangeDisplay';
import type { ActionableItem } from '../../data/actionSystem';
import type { ActionData } from '../../types/actions';
import type { Character, Choice, GameDialogueData } from '../../types/game';
import type { GameEvent } from '../../types/events';
import './MainGameNew.css';

const EVENT_CONVERSATION_MAPPING: Record<string, string> = {
  role_selection: 'role_selection',
  lab_orientation: 'tutorial',
  basic_seminar: 'tutorial',
  research_group_intro: 'tutorial',
  welcome_party: 'tutorial',
  cv_preparation: 'd_day',
  cv_rehearsal: 'd_day',
  cv_presentation: 'd_day',
  monthly_presentation_m1: 'd_day',
  monthly_presentation_mid: 'd_day',
  thesis_rehearsal: 'd_day',
  thesis_consultation: 'd_day',
  bachelor_rehearsal: 'd_day',
  bachelor_presentation: 'd_day',
  paper_reading: 'tutorial',
  paper_reading_creation: 'tutorial',
  year_end_journal: 'tutorial',
  grad_school_exam: 'life_events',
  hackathon: 'life_events',
  friendship_party: 'life_events',
  year_end_party: 'life_events',
};

interface MainGameNewProps {
  onBackToTitle: () => void;
  onGameEnd: () => void;
  currentSlotNumber?: number;
}

export function MainGameNew({ onBackToTitle, onGameEnd, currentSlotNumber = 1 }: MainGameNewProps) {
  const {
    currentTime,
    gameState,
    showConversation,
    conversation,
    showMenu,
    selectableItems,
    selectedCharacter,
    activeTab,
    dispatch,
    updateSelectableItems,
    updateGameState,
    updateTime,
  } = useGameState();

  // BGMと効果音の設定
  useBGM({ 
    track: showConversation ? 'CONVERSATION' : 'MAIN_GAME', 
    autoPlay: true, 
    fadeIn: true 
  });
  const { playButtonSound } = useButtonSFX();

  const {
    currentDialogueIndex,
    setCurrentDialogueIndex,
  } = useConversation(conversation, () => {
    dispatch({ type: 'RESET_CONVERSATION' });
  });

  const {
    showParameterChange,
    parameterChanges,
    changeTitle,
    hideChanges,
    trackActionChanges,
  } = useParameterChange();

  // イベント結果の会話を表示
  const showEventResult = useCallback((item: ActionableItem) => {
    const event = item.data as GameEvent;

    // イベントIDに対応する会話を取得
    const eventConversation = getConversationById(event.conversationId);
    const targetConversation = eventConversation || getConversationByChapter(EVENT_CONVERSATION_MAPPING[event.type] || 'tutorial');

    if (targetConversation) {
      dispatch({ type: 'SET_CONVERSATION', payload: targetConversation });
      setCurrentDialogueIndex(0);
      dispatch({ type: 'SET_SHOW_CONVERSATION', payload: true });
    }
  }, [dispatch, setCurrentDialogueIndex]);

  // エンディング条件チェック
  useEffect(() => {
    if (currentTime.isGameEnd) {
      onGameEnd();
    }
  }, [currentTime.isGameEnd, onGameEnd]);

  // 研究班ランダム決定の処理
  useEffect(() => {
    if (showConversation && conversation) {
      const currentDialogue = conversation.dialogues[currentDialogueIndex];
      if (currentDialogue?.randomizeResearchGroup && gameState.researchGroups.length === 0) {
        // ランダムに研究班を決定
        const allGroups = ['opt', 'rec', 'gen', 'bio'] as const;
        const randomGroup = allGroups[Math.floor(Math.random() * allGroups.length)];
        gameStateManager.setResearchGroups([randomGroup]);
        gameStateManager.completeEvent('research_group_selection');
        updateGameState();
      }
    }
  }, [showConversation, conversation, currentDialogueIndex, gameState.researchGroups.length, updateGameState]);



  

  // 次の日に進む
  const handleNextDay = useCallback(() => {
    if (gameState.currentDay === 'tuesday') {
      gameStateManager.setCurrentDay('wednesday');
      updateGameState();
    } else {
      // 水曜日が終了したら週を進める
      gameStateManager.setCurrentDay('tuesday');
      gameStateManager.advanceDay(); // 日数を進める
      timeManager.advanceWeek();
      updateTime();
      updateGameState();
    }
    updateSelectableItems();
  }, [gameState.currentDay, updateGameState, updateTime, updateSelectableItems]);

  // 週をスキップする
  const handleSkipWeek = useCallback(() => {
    // 現在の週をスキップして次の週に進む
    timeManager.advanceWeek();
    updateTime();
    updateGameState();
    updateSelectableItems();
  }, [updateTime, updateGameState, updateSelectableItems]);

  // 週を戻る
  const handleGoBackWeek = useCallback(() => {
    // 現在の週を戻る
    timeManager.goBackWeek();
    updateTime();
    updateGameState();
    updateSelectableItems();
  }, [updateTime, updateGameState, updateSelectableItems]);

  // 行動を直接実行（クリックで実行）
  const handleDirectAction = useCallback((item: ActionableItem) => {
    if (item.isCompleted) return;

    // 同期とおしゃべりまたは先輩とおしゃべりの場合
    if (item.id === 'action_chat_peer' || item.id === 'action_chat_senior') {
      const actionType = item.id === 'action_chat_peer' ? 'chat_peer' : 'chat_senior';
      
      // おしゃべり行動のパラメータ変化を表示
      const action = item.data as ActionData;
      trackActionChanges(
        action.researchSkillChange || 0,
        action.socialSkillChange || 0,
        action.professorAffectionChange || 0,
        action.stressChange || 0,
        item.name
      );
      
      gameStateManager.setShowCharacterSelection(true, actionType);
      updateGameState();
      // 行動回数を増加（おしゃべりは行動としてカウント）
      gameStateManager.incrementActionCount();
      return;
    }

    // 研究行動の場合
    if (item.id === 'action_research') {
      // 研究班に応じた会話を取得
      const researchGroup = gameState.researchGroups.length > 0 ? gameState.researchGroups[0] : 'none';
      const researchConversation = getResearchConversationByGroup(researchGroup);
      
      if (researchConversation) {
        dispatch({ type: 'SET_CONVERSATION', payload: researchConversation });
        setCurrentDialogueIndex(0);
        dispatch({ type: 'SET_SHOW_CONVERSATION', payload: true });
      }
      
      // 行動回数を増加
      gameStateManager.incrementActionCount();
      return;
    }

    // 教授と相談行動の場合
    if (item.id === 'action_consult_professor') {
      // ランダムに教授相談の会話を取得
      const professorConversation = getRandomProfessorConsultationConversation();
      
      if (professorConversation) {
        dispatch({ type: 'SET_CONVERSATION', payload: professorConversation });
        setCurrentDialogueIndex(0);
        dispatch({ type: 'SET_SHOW_CONVERSATION', payload: true });
      }
      
      // 行動回数を増加
      gameStateManager.incrementActionCount();
      return;
    }

    // 通常行動の場合、パラメータ変化を追跡
    if (item.type === 'action') {
      const action = item.data as ActionData;
      trackActionChanges(
        action.researchSkillChange || 0,
        action.socialSkillChange || 0,
        action.professorAffectionChange || 0,
        action.stressChange || 0,
        item.name
      );
    }

    // 行動を実行
    executeAction(item, gameStateManager);

    // ゲーム状態を更新
    const updatedGameState = gameStateManager.getGameState();
    updateGameState();

    // 選択可能なアイテムを更新
    updateSelectableItems();

    // イベントの場合は会話を表示
    if (item.type === 'event') {
      showEventResult(item);
    }
    
    // 3回行動したら次の日に進む
    if (updatedGameState.actionCount >= 3) {
      handleNextDay();
    }
  }, [dispatch, gameState.researchGroups, setCurrentDialogueIndex, showEventResult, updateGameState, updateSelectableItems, handleNextDay, trackActionChanges]);

  // 人物選択時の処理
  const handleCharacterSelect = useCallback((character: Character) => {
    dispatch({ type: 'SET_SELECTED_CHARACTER', payload: character });
    
    // 人物選択画面を非表示
    gameStateManager.setShowCharacterSelection(false);
    
    // 親密度に基づく会話を生成
    const relationship = gameStateManager.getRelationship(character.id);
    const intimacyLevel = relationship?.intimacyLevel || 0;
    const hasBeenConfessed = relationship?.hasBeenConfessed || false;
    const dialogues = getCharacterConversation(character, intimacyLevel, hasBeenConfessed);
    
    // 会話データを作成
    const conversation = {
      id: 9999, // 一時的なID
      title: `${character.name}とのおしゃべり`,
      description: `${character.name}とおしゃべりします`,
      chapter: 'main-game' as const,
      dialogues: dialogues,
    };
    
    dispatch({ type: 'SET_CONVERSATION', payload: conversation });
    setCurrentDialogueIndex(0);
    dispatch({ type: 'SET_SHOW_CONVERSATION', payload: true });
    
    // ゲーム状態を更新
    updateGameState();
    
    // 選択可能なアイテムを更新
    updateSelectableItems();
    
    // 3回行動したら次の日に進む
    const updatedGameState = gameStateManager.getGameState();
    if (updatedGameState.actionCount >= 3) {
      handleNextDay();
    }
  }, [dispatch, setCurrentDialogueIndex, updateGameState, updateSelectableItems, handleNextDay]);

  // 人物選択キャンセル時の処理
  const handleCharacterSelectCancel = useCallback(() => {
    gameStateManager.setShowCharacterSelection(false);
    updateGameState();
  }, [updateGameState]);

  // 会話を進める（カスタムロジック追加）
  const handleNextDialogue = useCallback(() => {
    if (!conversation) return;

    const currentDialogue = conversation.dialogues[currentDialogueIndex];
    
    // 現在のダイアログにnextDialogueIdが設定されている場合は、そのダイアログに移動
    if (currentDialogue.nextDialogueId) {
        const nextDialogueIndex = conversation.dialogues.findIndex(
          (dialogue: GameDialogueData) => dialogue.id === currentDialogue.nextDialogueId
        );
      if (nextDialogueIndex !== -1) {
        setCurrentDialogueIndex(nextDialogueIndex);
        return;
      }
    }

    // 通常の進行：次のダイアログに進む
    if (currentDialogueIndex < conversation.dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      // 会話終了
      dispatch({ type: 'SET_SHOW_CONVERSATION', payload: false });
      
      // 人物との会話の場合、親密度を更新
      if (selectedCharacter) {
        const relationship = gameStateManager.getRelationship(selectedCharacter.id);
        const intimacyLevel = relationship?.intimacyLevel || 0;
        const intimacyChange = getIntimacyChange(selectedCharacter.id, intimacyLevel);
        
        // 女性キャラクターは親友レベル（60%）まで、男性キャラクターは恋人レベル（80%）まで
        const maxIntimacy = selectedCharacter.gender === 'female' ? 60 : 80;
        Math.min(maxIntimacy, intimacyLevel + intimacyChange);
        
        gameStateManager.updateIntimacyLevel(selectedCharacter.id, intimacyChange);
        
        
        updateGameState();
        dispatch({ type: 'SET_SELECTED_CHARACTER', payload: null });
      } else {
        // 研究や教授と相談の会話の場合、パラメータ変化を適用
        if (conversation.chapter?.startsWith('research_') || conversation.chapter?.startsWith('professor_consultation_')) {
          // 行動データを取得してパラメータ変化を適用
          let actionItem: ActionableItem | undefined;

          if (conversation.chapter?.startsWith('research_')) {
            actionItem = selectableItems.find((item: ActionableItem) => item.id === 'action_research');
          } else if (conversation.chapter?.startsWith('professor_consultation_')) {
            actionItem = selectableItems.find((item: ActionableItem) => item.id === 'action_consult_professor');
          }

          if (actionItem && actionItem.type === 'action') {
            const actionData = actionItem.data as ActionData;
            // パラメータ変化を適用
            gameStateManager.updateResearchSkill(actionData.researchSkillChange || 0);
            gameStateManager.updateSocialSkill(actionData.socialSkillChange || 0);
            gameStateManager.updateProfessorAffection(actionData.professorAffectionChange || 0);
            gameStateManager.updateStressLevel(actionData.stressChange || 0);

            // パラメータ変化を表示
            trackActionChanges(
              actionData.researchSkillChange || 0,
              actionData.socialSkillChange || 0,
              actionData.professorAffectionChange || 0,
              actionData.stressChange || 0,
              actionData.name
            );
          }

          updateGameState();
        }
      }
      
      // プロローグ会話が終了したらエンディングへ
      if (conversation.chapter === 'epilogue') {
        onGameEnd();
        return;
      }
    }
  }, [conversation, currentDialogueIndex, selectedCharacter, dispatch, updateGameState, onGameEnd, selectableItems, setCurrentDialogueIndex, trackActionChanges]);

  // 選択肢を選択（カスタムロジック追加）
  const handleChoiceSelect = useCallback((choice: Choice) => {
    // 選択肢の効果を適用
    if (choice.effect) {
      // 告白への返答の場合
      if (choice.effect.confessionResponse) {
        const { characterId, accepted } = choice.effect.confessionResponse;
        if (accepted) {
          // はいを選んだ場合：恋人になる
          gameStateManager.setDatingStatus(characterId, true);
        } else {
          // いいえを選んだ場合：親友になる（親密度を60%に設定）
          const relationship = gameStateManager.getRelationship(characterId);
          if (relationship) {
            const currentIntimacy = relationship.intimacyLevel;
            const targetIntimacy = 60; // 親友レベル
            const change = targetIntimacy - currentIntimacy;
            if (change > 0) {
              gameStateManager.updateIntimacyLevel(characterId, change);
            }
            // 告白済みフラグを設定（拒否された場合も）
            gameStateManager.setConfessedStatus(characterId, true);
          }
        }
      
        // 選択肢後の会話を動的に生成して追加
        if (conversation && selectedCharacter) {
          const responseDialogues = generateConfessionResponse(selectedCharacter, accepted);
          const newConversation = {
            ...conversation,
            dialogues: [...conversation.dialogues, ...responseDialogues]
          };
          dispatch({ type: 'SET_CONVERSATION', payload: newConversation });
          
          // 最初の返答会話に移動
          setCurrentDialogueIndex(conversation.dialogues.length);
          return;
        }
      } else {
        // 通常の効果を適用
        gameStateManager.applyChoiceEffect(choice.effect);
      }
      
      updateGameState();
      
      // 選択肢を記録
      gameStateManager.recordChoice(choice.id);
      
      // 分岐先のダイアログIDがある場合は、そのダイアログに移動
      if (choice.nextDialogueId && conversation) {
        const nextDialogueIndex = conversation.dialogues.findIndex(
          (dialogue: GameDialogueData) => dialogue.id === choice.nextDialogueId
        );
        if (nextDialogueIndex !== -1) {
          setCurrentDialogueIndex(nextDialogueIndex);
          return;
        }
      }
      
      // 分岐先がない場合のみ、次のダイアログに進む
      handleNextDialogue();
    }
  }, [conversation, selectedCharacter, dispatch, updateGameState, handleNextDialogue, setCurrentDialogueIndex]);

  // メニューを開く
  const handleOpenMenu = useCallback(() => {
    dispatch({ type: 'SET_SHOW_MENU', payload: true });
  }, [dispatch]);

  // セーブ完了時の処理
  const handleSaveGame = useCallback(() => {
    // slotNumberは現在使用されていないため、必要に応じて実装
  }, []);

  // 役割選択画面を表示中の場合
  if (showConversation && conversation) {
    const currentDialogue = conversation.dialogues[currentDialogueIndex];
    
    // 役割選択画面を表示するダイアログの場合
    if (currentDialogue.showRoleSelection) {
      return (
        <RoleSelectionBox 
          onRoleSelect={(roles) => {
            gameStateManager.setLabRoles(roles);
            // 役割選択イベントを完了として記録（行動回数は既にexecuteActionで増加済み）
            gameStateManager.completeEvent('role_selection');
            updateGameState();
            handleNextDialogue(); // 次のダイアログに進む
          }} 
          maxRoles={2} 
        />
      );
    }
    
    return (
      <div className="main-game-new-container">
        <DeveloperSkipButton onSkip={handleNextDialogue} label="会話スキップ" />
        <DialogueBox
          text={currentDialogue.text}
          characterId={currentDialogue.characterId}
          backgroundUrl={currentDialogue.backgroundUrl}
          characterUrl={currentDialogue.characterUrl}
          characterPosition={currentDialogue.characterPosition}
          typingSpeed={currentDialogue.typingSpeed}
          onNext={handleNextDialogue}
          choices={currentDialogue.choices}
          onChoiceSelect={handleChoiceSelect}
          showStatus={currentDialogue.showStatus}
          gameState={gameState}
        />
      </div>
    );
  }

  // 人物選択画面を表示中の場合
  if (gameState.showCharacterSelection) {
    const actionType = gameState.selectedActionType;
    if (actionType) {
      return (
        <div className="main-game-new-container">
          <CharacterSelectionBox
            actionType={actionType}
            relationships={gameState.relationships}
            onCharacterSelect={handleCharacterSelect}
            onCancel={handleCharacterSelectCancel}
          />
        </div>
      );
    }
  }

  // 通常のメイン画面
  return (
    <div className="main-game-new-container">
      {/* デベロッパーボタン */}
      <div className="developer-controls">
        <DeveloperSkipButton onSkip={() => onGameEnd()} label="エンディングへ" />
        <DeveloperSkipButton onSkip={handleNextDay} label="次の日" className="next-day-button" />
        <DeveloperSkipButton onSkip={handleSkipWeek} label="週スキップ" className="week-skip-button" />
        <DeveloperSkipButton onSkip={handleGoBackWeek} label="週戻る" className="week-back-button" />
      </div>

      {/* ヘッダー */}
      <header className="game-header">
        <div className="header-content">
          <div className="time-display-wrapper">
            <TimeDisplay currentTime={currentTime} currentDay={gameState.currentDay} />
          </div>
          <div className="header-actions">
            <button className="menu-button" onClick={handleOpenMenu}>
              <span className="menu-icon">☰</span>
              <span>メニュー</span>
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="main-content">
        <div className="content-container">
          {/* 情報パネル - 上部 */}
          <div className="info-panel">
            {/* プレイヤー情報 */}
            <div className="player-info">
              <div className="player-avatar-container">
                <img src="/images/characters/player-placeholder.svg" alt="プレイヤー" className="player-avatar" />
                <div className="avatar-ring"></div>
              </div>
              <div className="player-details">
                <h2 className="player-name">{gameState.playerName || "あなた"}</h2>
                <div className="action-indicator">
                  <div className="action-time">
                    {gameState.actionCount === 0 && "朝"}
                    {gameState.actionCount === 1 && "昼"}
                    {gameState.actionCount === 2 && "晩"}
                    {gameState.actionCount === 3 && "終了"}
                  </div>
                </div>
              </div>
            </div>

            {/* ステータス */}
            <div className="status-info">
              <div className="stat-item">
                <div className="stat-icon">📚</div>
                <span className="stat-label">研究</span>
                <span className="stat-value">{gameState.researchSkill}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">👥</div>
                <span className="stat-label">人間関係</span>
                <span className="stat-value">{gameState.socialSkill}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">👨‍🏫</div>
                <span className="stat-label">教授</span>
                <span className="stat-value">{gameState.professorAffection}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">😰</div>
                <span className="stat-label">ストレス</span>
                <span className="stat-value">{gameState.stressLevel}</span>
              </div>
            </div>

            {/* 研究室情報 */}
            <div className="lab-info">
              <LabRolesDisplay roles={gameState.labRoles} />
              <ResearchGroupsDisplay researchGroups={gameState.researchGroups} />
            </div>

            {/* 人間関係 */}
            <div className="relationships-info">
              <RelationshipPanel relationships={gameState.relationships} />
            </div>
          </div>

          {/* タブシステム */}
          <div className="tab-system">
            {/* タブナビゲーション */}
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => {
                  playButtonSound();
                  dispatch({ type: 'SET_ACTIVE_TAB', payload: 'events' });
                }}
              >
                <span className="tab-icon">イベント</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'actions' ? 'active' : ''}`}
                onClick={() => {
                  playButtonSound();
                  dispatch({ type: 'SET_ACTIVE_TAB', payload: 'actions' });
                }}
              >
                <span className="tab-icon">行動</span>
              </button>
            </div>

            {/* タブコンテンツ */}
            <div className="tab-content">
              {activeTab === 'events' && (
                <div className="events-section">
                  <div className="events-grid">
                    {selectableItems
                      .filter(item => item.type === 'event')
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`event-card ${item.isCompleted ? 'completed' : ''}`}
                          onClick={() => {
                            playButtonSound();
                            handleDirectAction(item);
                          }}
                        >
                          <div className="card-icon">{item.icon}</div>
                          <div className="card-content">
                            <h3 className="card-name">{item.name}</h3>
                            <p className="card-description">{item.description}</p>
                          </div>
                          {item.isCompleted && <div className="completed-badge">完了</div>}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'actions' && (
                <div className="actions-section">
                  <div className="actions-grid">
                    {selectableItems
                      .filter(item => item.type === 'action')
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`action-card ${item.isCompleted ? 'completed' : ''}`}
                          onClick={() => {
                            playButtonSound();
                            handleDirectAction(item);
                          }}
                        >
                          <div className="card-icon">{item.icon}</div>
                          <div className="card-content">
                            <h3 className="card-name">{item.name}</h3>
                            <p className="card-description">{item.description}</p>
                          </div>
                          {item.isCompleted && <div className="completed-badge">完了</div>}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ゲームメニュー */}
      <GameMenu
        isOpen={showMenu}
        onClose={() => dispatch({ type: 'SET_SHOW_MENU', payload: false })}
        onSaveGame={handleSaveGame}
        onBackToTitle={onBackToTitle}
        currentSlotNumber={currentSlotNumber}
      />

      {/* パラメータ変化表示 */}
      <ParameterChangeDisplay
        changes={parameterChanges}
        isVisible={showParameterChange}
        onClose={hideChanges}
        title={changeTitle}
      />
    </div>
  );
}
