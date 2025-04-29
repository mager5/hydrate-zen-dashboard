
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types of achievements
export type AchievementType = 
  | 'first_glass'
  | 'daily_goal' 
  | 'three_day_streak'
  | 'weekly_goal'
  | 'level_up';

// Achievement data
export interface Achievement {
  id: AchievementType;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: Date;
}

// Challenge data
export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  completed: boolean;
  reward: number; // XP reward
}

// User level data
export interface LevelInfo {
  currentLevel: number;
  currentXP: number;
  requiredXP: number;
  progress: number; // percentage to next level
}

// Gamification context state
interface GamificationState {
  achievements: Achievement[];
  challenges: Challenge[];
  levelInfo: LevelInfo;
  streak: number;
  longestStreak: number;
  totalWaterConsumed: number;
  lastActive?: Date;
}

// Context props
interface GamificationContextProps {
  state: GamificationState;
  unlockAchievement: (type: AchievementType) => void;
  updateChallenge: (id: string, progress: number) => void;
  addXP: (amount: number) => void;
  recordWaterIntake: (amount: number) => void;
  checkAndUpdateStreak: () => void;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first_glass',
    title: 'Первые шаги',
    description: 'Запишите свой первый стакан воды',
    icon: 'droplet',
    unlocked: false,
  },
  {
    id: 'daily_goal',
    title: 'Дневная цель',
    description: 'Достигните дневной цели',
    icon: 'target',
    unlocked: false,
  },
  {
    id: 'three_day_streak',
    title: 'Постоянство',
    description: 'Достигайте цели 3 дня подряд',
    icon: 'flame',
    unlocked: false,
  },
  {
    id: 'weekly_goal',
    title: 'Недельный герой',
    description: 'Достигните недельной цели',
    icon: 'award',
    unlocked: false,
  },
  {
    id: 'level_up',
    title: 'Новый уровень',
    description: 'Достигните 2 уровня',
    icon: 'trophy',
    unlocked: false,
  },
];

const initialChallenges: Challenge[] = [
  {
    id: 'morning_hydration',
    title: 'Утренняя гидрация',
    description: 'Выпейте стакан воды в течение часа после пробуждения',
    target: 5,
    progress: 0,
    completed: false,
    reward: 50,
  },
  {
    id: 'consistent_hydration',
    title: 'Равномерное потребление',
    description: 'Пейте воду 8 раз в течение дня',
    target: 8,
    progress: 0,
    completed: false,
    reward: 100,
  },
];

const DEFAULT_STATE: GamificationState = {
  achievements: initialAchievements,
  challenges: initialChallenges,
  levelInfo: {
    currentLevel: 1,
    currentXP: 0,
    requiredXP: 100,
    progress: 0,
  },
  streak: 0,
  longestStreak: 0,
  totalWaterConsumed: 0,
};

// Create context
const GamificationContext = createContext<GamificationContextProps | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GamificationState>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('gamification');
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  });

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem('gamification', JSON.stringify(state));
  }, [state]);

  // Check if the user has been active today
  const checkAndUpdateStreak = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActive = state.lastActive ? new Date(state.lastActive) : undefined;
    
    if (!lastActive) {
      setState(prev => ({
        ...prev,
        lastActive: today,
      }));
      return;
    }

    const lastActiveDate = new Date(
      lastActive.getFullYear(),
      lastActive.getMonth(),
      lastActive.getDate()
    );

    const timeDiff = today.getTime() - lastActiveDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (dayDiff === 1) {
      // User was active yesterday, increase streak
      const newStreak = state.streak + 1;
      const newLongestStreak = Math.max(newStreak, state.longestStreak);
      
      setState(prev => ({
        ...prev,
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastActive: today,
      }));
      
      // Check for 3-day streak achievement
      if (newStreak >= 3 && !state.achievements.find(a => a.id === 'three_day_streak')?.unlocked) {
        unlockAchievement('three_day_streak');
      }
    } else if (dayDiff > 1) {
      // User missed days, reset streak
      setState(prev => ({
        ...prev,
        streak: 1,
        lastActive: today,
      }));
    } else if (dayDiff === 0) {
      // Same day, do nothing to streak
      setState(prev => ({
        ...prev,
        lastActive: today,
      }));
    }
  };

  const unlockAchievement = (type: AchievementType) => {
    setState(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.id === type && !achievement.unlocked) {
          return {
            ...achievement,
            unlocked: true,
            date: new Date(),
          };
        }
        return achievement;
      });

      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });

    // Add XP rewards for achievements
    addXP(50);
  };

  const updateChallenge = (id: string, progress: number) => {
    setState(prev => {
      const updatedChallenges = prev.challenges.map(challenge => {
        if (challenge.id === id) {
          const newProgress = Math.min(challenge.target, progress);
          const wasCompleted = challenge.completed;
          const isNowCompleted = newProgress >= challenge.target;
          
          // Give XP reward if challenge is newly completed
          if (!wasCompleted && isNowCompleted) {
            setTimeout(() => addXP(challenge.reward), 0);
          }
          
          return {
            ...challenge,
            progress: newProgress,
            completed: isNowCompleted,
          };
        }
        return challenge;
      });

      return {
        ...prev,
        challenges: updatedChallenges,
      };
    });
  };

  const addXP = (amount: number) => {
    setState(prev => {
      const currentXP = prev.levelInfo.currentXP + amount;
      const requiredXP = prev.levelInfo.requiredXP;
      let currentLevel = prev.levelInfo.currentLevel;
      let newXP = currentXP;
      let newRequiredXP = requiredXP;
      let leveledUp = false;

      // Level up if needed
      if (currentXP >= requiredXP) {
        currentLevel += 1;
        newXP = currentXP - requiredXP;
        newRequiredXP = Math.round(requiredXP * 1.5); // Increase XP needed for next level
        leveledUp = true;
      }

      const progress = Math.round((newXP / newRequiredXP) * 100);

      // Check for level up achievement
      if (leveledUp && currentLevel >= 2 && !prev.achievements.find(a => a.id === 'level_up')?.unlocked) {
        setTimeout(() => unlockAchievement('level_up'), 100);
      }

      return {
        ...prev,
        levelInfo: {
          currentLevel,
          currentXP: newXP,
          requiredXP: newRequiredXP,
          progress,
        },
      };
    });
  };

  const recordWaterIntake = (amount: number) => {
    // Update total water consumed
    setState(prev => ({
      ...prev,
      totalWaterConsumed: prev.totalWaterConsumed + amount,
    }));

    // Check for first glass achievement
    if (state.totalWaterConsumed === 0 && amount > 0) {
      unlockAchievement('first_glass');
    }

    // Add XP for drinking water (1 XP per 10ml)
    addXP(Math.floor(amount / 10));

    // Update the consistent hydration challenge
    updateChallenge('consistent_hydration', state.challenges.find(c => c.id === 'consistent_hydration')?.progress! + 1);
  };

  return (
    <GamificationContext.Provider
      value={{
        state,
        unlockAchievement,
        updateChallenge,
        addXP,
        recordWaterIntake,
        checkAndUpdateStreak,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

