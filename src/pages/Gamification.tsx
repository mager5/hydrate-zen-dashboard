
import React from 'react';
import Navigation from "@/components/Navigation";
import Achievements from "@/components/Achievements";
import Challenges from "@/components/Challenges";

const Gamification = () => {
  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6 pb-24 md:pb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Прогресс</h1>
        <Achievements />
        <Challenges />
      </div>
      <Navigation />
    </>
  );
};

export default Gamification;
