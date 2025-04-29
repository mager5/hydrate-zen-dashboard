
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/contexts/GamificationContext';
import { Trophy } from 'lucide-react';

const LevelProgress = () => {
  const { state } = useGamification();
  const { levelInfo } = state;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 w-8 h-8 rounded-full flex items-center justify-center">
            <Trophy className="text-amber-500 w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-gray-500">Уровень</span>
            <h3 className="font-bold text-xl">{levelInfo.currentLevel}</h3>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500">XP до следующего уровня</span>
          <p className="font-semibold">{levelInfo.currentXP}/{levelInfo.requiredXP}</p>
        </div>
      </div>
      
      <Progress value={levelInfo.progress} className="h-2" />
    </div>
  );
};

export default LevelProgress;
