import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import WaveProgress from './WaveProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import Navigation from './Navigation';
import AchievementPopup from './AchievementPopup';
import WeeklyChart from './WeeklyChart';

const MOTIVATION_MESSAGES = [
  "Вода - источник жизни и энергии!",
  "Каждый глоток приближает вас к цели!",
  "Оставайтесь гидратированными!",
  "Вода - ключ к хорошему самочувствию!"
];

const mockWeekData = [
  { day: "Пн", amount: 1800, goal: 2000 },
  { day: "Вт", amount: 2100, goal: 2000 },
  { day: "Ср", amount: 1900, goal: 2000 },
  { day: "Чт", amount: 2300, goal: 2000 },
  { day: "Пт", amount: 1700, goal: 2000 },
  { day: "Сб", amount: 2000, goal: 2000 },
  { day: "Вс", amount: 1500, goal: 2000 },
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

  const handleAddWater = () => {
    if (waterAmount <= 0) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректное количество воды",
        variant: "destructive",
      });
      return;
    }

    const newProgress = Math.min(((progress * dailyGoal + waterAmount) / dailyGoal) * 100, 100);
    setProgress(newProgress / 100);
    
    if (newProgress >= 30) {
      setIsWaving(true);
    }

    if (newProgress >= 100 && !showAchievement) {
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white font-inter pb-20 md:pb-0 md:pt-20">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Водный баланс</h1>
            
            <div className="space-y-6">
              <div className={`bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-sm transition-all duration-300 ${isWaving ? 'animate-wave-pulse' : ''}`}>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Прогресс дня</h2>
                <WaveProgress progress={progress * 100} />
                <p className="mt-4 text-center text-gray-600">
                  {Math.round(progress * dailyGoal)}мл / {dailyGoal}мл
                </p>
              </div>

              <div className={`flex gap-4 ${isMobile ? 'flex-col' : ''}`}>
                <Input
                  type="number"
                  placeholder="Количество воды (мл)"
                  className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-blue-200 hover:shadow-sm"
                  value={waterAmount || ''}
                  onChange={(e) => setWaterAmount(Number(e.target.value))}
                />
                <Button 
                  onClick={handleAddWater} 
                  className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                >
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                  Добавить
                </Button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Статистика недели</h2>
                <WeeklyChart data={mockWeekData} />
              </div>

              <Button 
                variant="outline" 
                onClick={handleReminder}
                className="w-full border-blue-200 hover:bg-blue-50 transition-all duration-300 transform hover:scale-102 active:scale-98 group"
              >
                <Bell className="mr-2 h-4 w-4 group-hover:animate-bell-ring" />
                Установить напоминание
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AchievementPopup type={achievementType} isVisible={showAchievement} />
      <Navigation />
    </>
  );
};

export default WaterTracker;
