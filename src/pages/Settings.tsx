
import React, { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';

const Settings = () => {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const { toast } = useToast();

  const handleReminderToggle = (checked: boolean) => {
    setRemindersEnabled(checked);
    toast({
      title: checked ? "Напоминания включены" : "Напоминания выключены",
      description: checked 
        ? "Мы будем напоминать вам пить воду каждые 2 часа" 
        : "Вы не будете получать напоминаний",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white p-4 font-inter pb-24 md:pb-0 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">Настройки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  {remindersEnabled ? (
                    <Bell className="h-5 w-5 text-blue-500 group-hover:animate-bell-ring" />
                  ) : (
                    <BellOff className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">Напоминания</h3>
                    <p className="text-sm text-gray-600">Получать уведомления о питье воды</p>
                  </div>
                </div>
                <Switch 
                  checked={remindersEnabled}
                  onCheckedChange={handleReminderToggle}
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default Settings;
