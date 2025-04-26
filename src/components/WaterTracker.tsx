
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const WaterTracker = () => {
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [dailyGoal] = useState<number>(2000); // 2L daily goal
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

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
    
    toast({
      title: "Отлично!",
      description: `Добавлено ${waterAmount}мл воды`,
    });
  };

  const handleReminder = () => {
    toast({
      title: "Напоминание установлено",
      description: "Мы напомним вам пить воду каждые 2 часа",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-inter">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Водный баланс</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Прогресс дня</h2>
              <Progress value={progress * 100} className="h-4" />
              <p className="mt-2 text-sm text-gray-600">
                {Math.round(progress * dailyGoal)}мл / {dailyGoal}мл
              </p>
            </div>

            <div className="flex gap-4">
              <Input
                type="number"
                placeholder="Количество воды (мл)"
                className="flex-1"
                value={waterAmount || ''}
                onChange={(e) => setWaterAmount(Number(e.target.value))}
              />
              <Button onClick={handleAddWater} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Добавить
              </Button>
            </div>

            <Button 
              variant="outline" 
              onClick={handleReminder}
              className="w-full border-blue-200 hover:bg-blue-50"
            >
              <Bell className="mr-2 h-4 w-4" />
              Установить напоминание
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
