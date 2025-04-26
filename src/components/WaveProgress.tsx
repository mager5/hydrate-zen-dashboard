
import React from 'react';

interface WaveProgressProps {
  progress: number;
}

const WaveProgress = ({ progress }: WaveProgressProps) => {
  const waveHeight = 100 - progress;
  
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
      <div 
        className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out"
        style={{ 
          height: `${progress}%`,
          background: `linear-gradient(180deg, rgba(147,197,253,0.3) 0%, rgba(147,197,253,0.8) 100%)`,
        }}
      >
        <svg
          className="absolute bottom-0 left-0 w-[200%] animate-[wave_5s_linear_infinite] fill-blue-300/40"
          viewBox="0 0 1000 50"
          preserveAspectRatio="none"
        >
          <path d="M0,50 C250,0 350,50 500,50 C650,50 750,0 1000,50 L1000,100 L0,100 Z"></path>
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] animate-[wave_7s_linear_reverse_infinite] fill-blue-400/30"
          viewBox="0 0 1000 50"
          preserveAspectRatio="none"
        >
          <path d="M0,50 C250,0 350,50 500,50 C650,50 750,0 1000,50 L1000,100 L0,100 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default WaveProgress;
