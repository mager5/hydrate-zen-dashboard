
import React from 'react';
import { useGamification } from '@/contexts/GamificationContext';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const StreakCounter = () => {
  const { state } = useGamification();
  const { streak, longestStreak } = state;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            streak > 0 ? "bg-orange-500" : "bg-gray-200"
          )}>
            <Flame className={cn(
              "w-6 h-6",
              streak > 0 ? "text-white animate-pulse" : "text-gray-400"
            )} />
          </div>
          <div>
            <h3 className="font-bold text-xl">{streak} {
              streak === 1 
                ? "день" 
                : streak > 1 && streak < 5 
                  ? "дня" 
                  : "дней"
            }</h3>
            <span className="text-sm text-gray-500">Текущая серия</span>
          </div>
        </div>
        
        <div className="text-right">
          <h3 className="font-bold text-xl">{longestStreak} {
            longestStreak === 1 
              ? "день" 
              : longestStreak > 1 && longestStreak < 5 
                ? "дня" 
                : "дней"
          }</h3>
          <span className="text-sm text-gray-500">Рекорд</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
