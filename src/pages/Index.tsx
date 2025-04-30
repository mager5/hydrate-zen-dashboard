
import WaterTracker from "@/components/WaterTracker";
import Navigation from "@/components/Navigation";
import LevelProgress from "@/components/LevelProgress";
import StreakCounter from "@/components/StreakCounter";

const Index = () => {
  return (
    <>
      <div className="container mx-auto max-w-4xl px-3 py-4 space-y-4 pb-24 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
