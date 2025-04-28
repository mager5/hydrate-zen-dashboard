
import React from 'react';
import { Medal, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementPopupProps {
  type: 'daily' | 'weekly' | 'streak';
  isVisible: boolean;
}

const AchievementPopup = ({ type, isVisible }: AchievementPopupProps) => {
  if (!isVisible) return null;

  const achievementData = {
    daily: {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      title: "Дневная цель достигнута!",
      description: "Отличная работа! Продолжайте в том же духе!"
    },
    weekly: {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Недельная цель достигнута!",
      description: "Вы в отличной форме! Так держать!"
    },
    streak: {
      icon: <Medal className="w-8 h-8 text-blue-500" />,
      title: "3 дня подряд!",
      description: "Вы на правильном пути к здоровому образу жизни!"
    }
  };

  const { icon, title, description } = achievementData[type];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementPopup;
