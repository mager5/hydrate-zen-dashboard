
import React from 'react';
import { Home, Settings, History, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:top-0 md:bottom-auto">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-around items-center h-16">
          <NavItem 
            icon={<Home className="w-6 h-6" />} 
            label="Главная" 
            to="/" 
            active={isActive('/')} 
          />
          <NavItem 
            icon={<History className="w-6 h-6" />} 
            label="История" 
            to="/history" 
            active={isActive('/history')} 
          />
          <NavItem 
            icon={<Trophy className="w-6 h-6" />} 
            label="Прогресс" 
            to="/gamification" 
            active={isActive('/gamification')} 
          />
          <NavItem 
            icon={<Settings className="w-6 h-6" />} 
            label="Настройки" 
            to="/settings" 
            active={isActive('/settings')} 
          />
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
}

const NavItem = ({ icon, label, to, active }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center justify-center w-full h-full px-2 transition-colors",
        active 
          ? "text-blue-500" 
          : "text-gray-500 hover:text-blue-400"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
      {active && (
        <div className="absolute bottom-0 md:top-0 md:bottom-auto w-full max-w-[40px] h-0.5 bg-blue-500" />
      )}
    </Link>
  );
};

export default Navigation;
