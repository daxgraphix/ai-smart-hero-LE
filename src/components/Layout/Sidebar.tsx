import React from 'react';
import { Shield, Book, Volume2, VolumeX, Sun, Moon, Monitor, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Props {
    profile: any;
    soundEnabled: boolean;
    toggleSound: () => void;
    handleReset: () => void;
    openHQ: () => void;
    openHandbook: () => void;
}

export const SidebarContent: React.FC<Props> = ({ 
    profile, soundEnabled, toggleSound, handleReset, openHQ, openHandbook 
}) => {
    const { theme, resolvedTheme, toggleTheme } = useTheme();

    const getThemeIcon = () => {
        if (theme === 'system') return <Monitor size={20} className="text-yellow-400" />;
        return resolvedTheme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-sky-500" />;
    };

    const getThemeLabel = () => {
        if (theme === 'system') return 'System';
        return resolvedTheme === 'dark' ? 'Light' : 'Dark';
    };

    return (
         <div className="flex flex-col p-4 sm:p-6 h-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text">Hero Menu</h2>
        <nav className="flex flex-col gap-2 sm:gap-4">
             <button onClick={openHQ} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-200/50 transition-colors text-sm sm:text-base">
                <Shield className="text-purple-400" /> <span>Ally HQ</span>
            </button>
             <button onClick={openHandbook} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-200/50 transition-colors text-sm sm:text-base">
                <Book className="text-sky-400" /> <span>AI Handbook</span>
            </button>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-700/50 dark:border-slate-700/50 border-slate-200/50">
            <button onClick={toggleSound} className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-200/50 transition-colors text-sm sm:text-base">
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />} <span>Sound {soundEnabled ? 'On' : 'Off'}</span>
            </button>
            <button onClick={toggleTheme} className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-200/50 transition-colors mt-2 text-sm sm:text-base">
                 {getThemeIcon()} <span>{getThemeLabel()} Mode</span>
            </button>
            <button onClick={handleReset} className="flex items-center gap-3 p-3 w-full text-red-400 rounded-lg hover:bg-red-500/10 transition-colors mt-2 text-sm sm:text-base">
                <RotateCcw size={20} /> <span>Reset Progress</span>
            </button>
        </div>
    </div>
    );
};
