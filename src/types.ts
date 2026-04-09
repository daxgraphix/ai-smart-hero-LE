import React from 'react';

export interface MissionProgress {
  knowledge: boolean;
  training: boolean;
  challenge: boolean;
  stars: number;
}

export interface EquippedItems {
  color: string;
  accessory: string;
}

export interface UserProfile {
  username: string | null;
  avatarId: string | null;
  colorId: string;
  totalPoints: number;
  missionProgress: Record<string, MissionProgress>;
  badges: string[];
  unlockedItems: string[];
  equipped: EquippedItems;
  settings: {
    soundEnabled: boolean;
  };
}

export interface Mission {
  id: string;
  title: string;
  badgeName: string;
  icon: React.ReactNode;
  badgeIcon: React.ReactNode;
  description: string;
  knowledge: {
    title: string;
    pages: { text: string }[];
  };
  training: {
    title: string;
    flashcards: { term: string; definition: string }[];
  };
  challenge: {
    title: string;
    gameType: 'matchThePairs' | 'chooseYourResponse' | 'promptChecker' | 'socialDetective' | 'dragAndDrop' | 'rewardSeeking';
    timeLimit: number;
    content: any[];
  };
}
