
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, History } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-lg md:top-0 md:bottom-auto z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 py-4">
          <Link 
            to="/" 
            className={`flex items-center gap-2 transition-colors ${isActive('/') ? 'text-blue-500 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
          >
            <Home className="h-5 w-5" />
            <span className="text-sm font-medium">Главная</span>
          </Link>
          <Link 
            to="/settings" 
            className={`flex items-center gap-2 transition-colors ${isActive('/settings') ? 'text-blue-500 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Настройки</span>
          </Link>
          <Link 
            to="/history" 
            className={`flex items-center gap-2 transition-colors ${isActive('/history') ? 'text-blue-500 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
          >
            <History className="h-5 w-5" />
            <span className="text-sm font-medium">История</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
