
import WaterTracker from "@/components/WaterTracker";
import Navigation from "@/components/Navigation";
import LevelProgress from "@/components/LevelProgress";
import StreakCounter from "@/components/StreakCounter";
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6 pb-20 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LevelProgress />
          <StreakCounter />
        </div>
        <WaterTracker />
      </div>
      <Navigation />
    </>
  );
};

export default Index;
