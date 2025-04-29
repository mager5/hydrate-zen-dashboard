
import React from 'react';
import { 
  Award, 
  Droplet, 
  Target, 
  Trophy, 
  Flame,
  CheckCircle
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useGamification, AchievementType } from '@/contexts/GamificationContext';
import { cn } from '@/lib/utils';

// Icon mapping for achievements
const iconMap = {
  'first_glass': Droplet,
  'daily_goal': Target,
  'three_day_streak': Flame,
  'weekly_goal': Award,
  'level_up': Trophy
};

const Achievements = () => {
  const { state } = useGamification();
  const { achievements } = state;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Достижения</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.map((achievement) => {
          const Icon = iconMap[achievement.id as keyof typeof iconMap];
          
          return (
            <div 
              key={achievement.id}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-all relative",
                achievement.unlocked 
                  ? "bg-gradient-to-br from-blue-100 to-blue-50 shadow-sm" 
                  : "bg-gray-100 opacity-60"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                achievement.unlocked ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-medium text-center">{achievement.title}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{achievement.description}</p>
              
              {achievement.unlocked && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
