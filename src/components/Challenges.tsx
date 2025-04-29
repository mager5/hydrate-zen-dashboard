
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/contexts/GamificationContext';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Challenges = () => {
  const { state } = useGamification();
  const { challenges } = state;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Вызовы</h2>
      
      <div className="space-y-4">
        {challenges.map((challenge) => {
          const progressPercent = (challenge.progress / challenge.target) * 100;
          
          return (
            <div 
              key={challenge.id}
              className={`bg-white rounded-lg p-4 border transition-all ${
                challenge.completed 
                  ? 'border-green-200 bg-green-50/50' 
                  : 'border-blue-100'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{challenge.title}</h3>
                <Badge variant={challenge.completed ? "default" : "outline"} className={challenge.completed ? "bg-green-500" : ""}>
                  {challenge.completed ? "Выполнено" : `+${challenge.reward} XP`}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс</span>
                  <span className="font-medium">{challenge.progress}/{challenge.target}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;
