
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import WaveProgress from './WaveProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import AchievementPopup from './AchievementPopup';
import { useGamification } from '@/contexts/GamificationContext';
import { Link } from 'react-router-dom';

const MOTIVATION_MESSAGES = [
  "Вода - источник жизни и энергии!",
  "Каждый глоток приближает вас к цели!",
  "Оставайтесь гидратированными!",
  "Вода - ключ к хорошему самочувствию!"
];

const WaterTracker = () => {
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [dailyGoal] = useState<number>(2000);
  const [progress, setProgress] = useState<number>(0);
  const [isWaving, setIsWaving] = useState<boolean>(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showAchievement, setShowAchievement] = useState<boolean>(false);
  const [achievementType, setAchievementType] = useState<'daily' | 'weekly' | 'streak'>('daily');
  
  // Integrate gamification
  const { state, recordWaterIntake, unlockAchievement, checkAndUpdateStreak } = useGamification();
  
  useEffect(() => {
    // Check streak on component mount
    checkAndUpdateStreak();
  }, []);

  const handleAddWater = () => {
    if (waterAmount <= 0) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректное количество воды",
        variant: "destructive",
      });
      return;
    }

    const currentWaterAmount = progress * dailyGoal;
    const newTotal = currentWaterAmount + waterAmount;
    const newProgress = Math.min(newTotal / dailyGoal, 1);
    
    setProgress(newProgress);
    
    if (newProgress >= 0.3) {
      setIsWaving(true);
    }

    // Record water intake for gamification
    recordWaterIntake(waterAmount);

    // Check if daily goal is reached
    if (newTotal >= dailyGoal && currentWaterAmount < dailyGoal) {
      unlockAchievement('daily_goal');
      setAchievementType('daily');
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 5000);
    }

    toast({
      title: "Отлично!",
      description: `${MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)]} +${waterAmount}мл`,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWaving) {
      timer = setTimeout(() => setIsWaving(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isWaving]);

  const handleReminder = () => {
    toast({
      title: "Напоминание установлено",
      description: "Мы напомним вам пить воду каждые 2 часа",
    });
  };

  // Предустановленные значения для быстрого добавления
  const quickAddAmounts = [100, 200, 300];

  return (
    <>
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Водный баланс</h1>
        
        <div className="space-y-4">
          {/* Компактный прогресс */}
          <div className={`bg-gradient-to-br from-blue-50 to-white rounded-2xl p-3 shadow-sm transition-all duration-300 ${isWaving ? 'animate-wave-pulse' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Прогресс дня</h2>
              <p className="text-gray-600 font-medium">
                {Math.round(progress * dailyGoal)}мл / {dailyGoal}мл
              </p>
            </div>
            <div className="h-28 md:h-32">
              <WaveProgress progress={progress * 100} />
            </div>
          </div>

          {/* Блок добавления воды */}
          <div className="rounded-2xl p-3 bg-gradient-to-br from-blue-50 to-white shadow-sm">
            <div className="flex flex-col space-y-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Количество воды (мл)"
                  className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-blue-200 hover:shadow-sm"
                  value={waterAmount || ''}
                  onChange={(e) => setWaterAmount(Number(e.target.value))}
                />
                <Button 
                  onClick={handleAddWater} 
                  className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:inline">Добавить</span>
                </Button>
              </div>
              
              {/* Кнопки быстрого добавления */}
              <div className="flex justify-between gap-2">
                {quickAddAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="flex-1 border-blue-200 hover:bg-blue-50"
                    onClick={() => setWaterAmount(amount)}
                  >
                    {amount} мл
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleReminder}
              className="flex-1 border-blue-200 hover:bg-blue-50 transition-all duration-300"
            >
              <Bell className="h-4 w-4" />
              Напоминание
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-blue-200 hover:bg-blue-50 transition-all duration-300"
              asChild
            >
              <Link to="/history">
                Статистика
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <AchievementPopup type={achievementType} isVisible={showAchievement} />
    </>
  );
};

export default WaterTracker;
