import React from 'react';

interface GameWrapperProps {
    title: string;
    score?: number;
    total?: number;
    timeLeft?: number;
    maxTime?: number;
    children: React.ReactNode;
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ title, score, total, timeLeft, maxTime, children }) => {
    const progress = (timeLeft !== undefined && maxTime) ? (timeLeft / maxTime) * 100 : 100;
    
    return (
        <div className="game-wrapper w-full max-w-2xl mx-auto">
            <div className="bg-slate-900/50 p-4 flex justify-between items-center border-b border-slate-700/50">
                <h3 className="font-bold text-lg text-sky-400">{title}</h3>
                <div className="flex gap-4 font-mono text-sm">
                    {score !== undefined && (
                        <div className="bg-slate-800 px-3 py-1 rounded text-green-400 shadow-sm">
                            Score: {score}{total ? `/${total}` : ''}
                        </div>
                    )}
                    {timeLeft !== undefined && (
                        <div className={`bg-slate-800 px-3 py-1 rounded shadow-sm flex items-center gap-2 ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>
                            <span>Time:</span>
                            <span className="font-bold">{timeLeft}s</span>
                        </div>
                    )}
                </div>
            </div>
            {(timeLeft !== undefined && maxTime) && (
                <div className="w-full h-1 bg-slate-800">
                    <div 
                        className="h-full bg-gradient-to-r from-green-500 to-amber-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }} 
                    />
                </div>
            )}
            <div className="p-4 sm:p-6 relative">
                {children}
            </div>
        </div>
    );
};
