
import React from 'react';
import { CogIcon, SparklesIcon } from './IconComponents';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <SparklesIcon className="w-7 h-7 text-cyan-400" />
        <h1 className="text-xl font-bold text-slate-100">Sandy Chat Bot</h1>
      </div>
      <button
        onClick={onSettingsClick}
        className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
        aria-label="Open settings"
      >
        <CogIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
