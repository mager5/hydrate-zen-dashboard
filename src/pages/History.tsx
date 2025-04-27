
import React from 'react';
import { History as HistoryIcon, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Временные данные для демонстрации
const historyData = [
  { date: '2025-04-27', amount: 2100, goal: 2000 },
  { date: '2025-04-26', amount: 1800, goal: 2000 },
  { date: '2025-04-25', amount: 2300, goal: 2000 },
  { date: '2025-04-24', amount: 1950, goal: 2000 },
  { date: '2025-04-23', amount: 2200, goal: 2000 },
];

const History = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white p-4 font-inter">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <HistoryIcon className="h-8 w-8 text-blue-500" />
              История
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              {historyData.map((day) => (
                <div 
                  key={day.date}
                  className="flex items-center gap-4 p-4 mb-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                >
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        {new Date(day.date).toLocaleDateString('ru-RU', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <span className={`text-sm font-medium ${
                        day.amount >= day.goal ? 'text-green-500' : 'text-orange-500'
                      }`}>
                        {day.amount} / {day.goal} мл
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (day.amount / day.goal) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
