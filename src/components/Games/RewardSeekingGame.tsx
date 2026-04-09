import React, { useState, useEffect, useCallback } from 'react';
import { GameWrapper } from './GameWrapper';
import { Trophy, AlertTriangle, User } from 'lucide-react';

interface Props {
    challenges: { grid: number[][]; targetCount: number };
    title: string;
    onComplete: (score: number, total: number) => void;
    playSound: (sound: string, note: string) => void;
    timeLimit: number;
}

// Grid values: 0 = empty, 1 = reward, 2 = obstacle
export const RewardSeekingGame: React.FC<Props> = ({ challenges, title, onComplete, playSound, timeLimit }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [grid, setGrid] = useState<number[][]>([]);
    const [collected, setCollected] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isActive, setIsActive] = useState(true);
    const [message, setMessage] = useState<string | null>("Collect all the star rewards! Avoid the red triangles.");

    useEffect(() => {
        if (challenges && challenges.grid) {
            setGrid(challenges.grid.map(row => [...row]));
        }
    }, [challenges]);

    const handleMove = useCallback((dx: number, dy: number) => {
        if (!isActive) return;

        setPos(prev => {
            const nx = prev.x + dx;
            const ny = prev.y + dy;

            // Boundary check
            if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) return prev;

            // Obstacle check
            if (grid[ny][nx] === 2) {
                playSound('incorrect', 'C3');
                setMessage("Ouch! That's an obstacle. Try another way.");
                return prev;
            }

            // Reward check
            if (grid[ny][nx] === 1) {
                playSound('correct', 'G5');
                const newGrid = [...grid];
                newGrid[ny][nx] = 0;
                setGrid(newGrid);
                setCollected(c => {
                    const next = c + 1;
                    if (next === challenges.targetCount) {
                        setIsActive(false);
                        setTimeout(() => onComplete(next, challenges.targetCount), 1000);
                    }
                    return next;
                });
                setMessage("Great! You found a reward.");
            } else {
                setMessage(null);
            }

            return { x: nx, y: ny };
        });
    }, [grid, isActive, playSound, challenges.targetCount, onComplete]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') handleMove(0, -1);
            if (e.key === 'ArrowDown') handleMove(0, 1);
            if (e.key === 'ArrowLeft') handleMove(-1, 0);
            if (e.key === 'ArrowRight') handleMove(1, 0);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleMove]);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    onComplete(collected, challenges.targetCount);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, onComplete, collected, challenges.targetCount]);

    return (
        <GameWrapper title={title} score={collected} total={challenges.targetCount} timeLeft={timeLeft} maxTime={timeLimit}>
            <div className="flex flex-col items-center gap-6">
                <div className="grid grid-cols-5 gap-2 bg-slate-800 p-4 rounded-xl border-4 border-slate-700 shadow-inner">
                    {grid.map((row, y) => (
                        row.map((cell, x) => (
                            <div 
                                key={`${x}-${y}`} 
                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                    pos.x === x && pos.y === y ? 'bg-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.8)] z-10' : 
                                    cell === 2 ? 'bg-red-500/20' : 'bg-slate-700/30'
                                }`}
                            >
                                {pos.x === x && pos.y === y ? (
                                    <User className="text-white" size={32} />
                                ) : cell === 1 ? (
                                    <Trophy className="text-amber-400 animate-pulse" size={28} />
                                ) : cell === 2 ? (
                                    <AlertTriangle className="text-red-500" size={28} />
                                ) : null}
                            </div>
                        ))
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-2 sm:hidden">
                    <div />
                    <button onClick={() => handleMove(0, -1)} className="p-4 bg-slate-700 rounded-lg active:bg-slate-600">↑</button>
                    <div />
                    <button onClick={() => handleMove(-1, 0)} className="p-4 bg-slate-700 rounded-lg active:bg-slate-600">←</button>
                    <button onClick={() => handleMove(0, 1)} className="p-4 bg-slate-700 rounded-lg active:bg-slate-600">↓</button>
                    <button onClick={() => handleMove(1, 0)} className="p-4 bg-slate-700 rounded-lg active:bg-slate-600">→</button>
                </div>

                <p className="text-sm text-slate-400 hidden sm:block italic">Use Arrow Keys to navigate the environment</p>
                
                {message && (
                    <div className="bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700 text-sm text-sky-300 animate-bounce">
                        {message}
                    </div>
                )}
            </div>
        </GameWrapper>
    );
};
