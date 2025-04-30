
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import WeeklyChart from '@/components/WeeklyChart';

const mockWeekData = [
  { day: "Пн", amount: 1800, goal: 2000 },
  { day: "Вт", amount: 2100, goal: 2000 },
  { day: "Ср", amount: 1900, goal: 2000 },
  { day: "Чт", amount: 2300, goal: 2000 },
  { day: "Пт", amount: 1700, goal: 2000 },
  { day: "Сб", amount: 2000, goal: 2000 },
  { day: "Вс", amount: 1500, goal: 2000 },
];

const mockMonthData = [
  { week: "Неделя 1", amount: 14000, goal: 14000 },
  { week: "Неделя 2", amount: 13500, goal: 14000 },
  { week: "Неделя 3", amount: 14200, goal: 14000 },
  { week: "Неделя 4", amount: 13800, goal: 14000 },
];

const History = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white p-4 font-inter pb-24 md:pb-0 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">История питья</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Недельная статистика</h2>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-sm">
                  <WeeklyChart data={mockWeekData} />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Месячная статистика</h2>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-sm h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockMonthData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-2 rounded-lg shadow">
                                <p className="text-sm">{`${payload[0].value}мл`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="amount" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default History;
