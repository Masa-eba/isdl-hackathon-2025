// useParameterChange.ts - パラメータ変化追跡のカスタムフック

import { useState, useCallback } from 'react';
import type { ParameterChange } from '../components/ui/ParameterChangeDisplay';

export function useParameterChange() {
  const [showParameterChange, setShowParameterChange] = useState(false);
  const [parameterChanges, setParameterChanges] = useState<ParameterChange>({
    researchSkill: 0,
    socialSkill: 0,
    professorAffection: 0,
    stressLevel: 0,
    intimacyChanges: {}
  });
  const [changeTitle, setChangeTitle] = useState('パラメータ変化');

  // パラメータ変化を表示
  const showChanges = useCallback((changes: ParameterChange, title?: string) => {
    setParameterChanges(changes);
    setChangeTitle(title || 'パラメータ変化');
    setShowParameterChange(true);
  }, []);

  // パラメータ変化を隠す
  const hideChanges = useCallback(() => {
    setShowParameterChange(false);
    // 変化をリセット
    setParameterChanges({
      researchSkill: 0,
      socialSkill: 0,
      professorAffection: 0,
      stressLevel: 0,
      intimacyChanges: {}
    });
  }, []);

  // 通常行動のパラメータ変化を追跡
  const trackActionChanges = useCallback((
    researchSkillChange: number,
    socialSkillChange: number,
    professorAffectionChange: number,
    stressChange: number,
    actionName: string
  ) => {
    const changes: ParameterChange = {
      researchSkill: researchSkillChange,
      socialSkill: socialSkillChange,
      professorAffection: professorAffectionChange,
      stressLevel: stressChange
    };
    
    showChanges(changes, `${actionName}の結果`);
  }, [showChanges]);

  // おしゃべりのパラメータ変化を追跡
  const trackChatChanges = useCallback((
    researchSkillChange: number,
    socialSkillChange: number,
    professorAffectionChange: number,
    stressChange: number,
    intimacyChanges: { [characterId: string]: number },
    characterName: string
  ) => {
    const changes: ParameterChange = {
      researchSkill: researchSkillChange,
      socialSkill: socialSkillChange,
      professorAffection: professorAffectionChange,
      stressLevel: stressChange,
      intimacyChanges
    };
    
    showChanges(changes, `${characterName}とのおしゃべりの結果`);
  }, [showChanges]);

  // 複数の行動の合計パラメータ変化を追跡
  const trackMultipleActionChanges = useCallback((
    totalChanges: ParameterChange,
    actionCount: number
  ) => {
    showChanges(totalChanges, `${actionCount}回の行動の結果`);
  }, [showChanges]);

  return {
    showParameterChange,
    parameterChanges,
    changeTitle,
    showChanges,
    hideChanges,
    trackActionChanges,
    trackChatChanges,
    trackMultipleActionChanges
  };
}
