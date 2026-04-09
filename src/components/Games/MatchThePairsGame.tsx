import React, { useState, useEffect } from 'react';
import { GameWrapper } from './GameWrapper';

interface Pair {
    action: string;
    consequence: string;
}

interface Item {
    text: string;
    pairId: number;
    id: string;
}

interface Props {
    challenges: Pair[];
    onComplete: (score: number, total: number) => void;
    playSound: (sound: string, note: string) => void;
    title: string;
    timeLimit: number;
}

export const MatchThePairsGame: React.FC<Props> = ({ challenges, onComplete, playSound, title, timeLimit }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [selected, setSelected] = useState<Item[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    onComplete(matched.length, challenges.length);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, onComplete, matched, challenges]);

    useEffect(() => {
        const flatItems: Item[] = [];
        challenges.forEach((pair, i) => {
            flatItems.push({ text: pair.action, pairId: i, id: `action-${i}` });
            flatItems.push({ text: pair.consequence, pairId: i, id: `consequence-${i}` });
        });
        setItems(flatItems.sort(() => Math.random() - 0.5));
    }, [challenges]);

    const handleSelect = (item: Item) => {
        if (!isActive || isChecking || matched.includes(item.pairId) || selected.find(s => s.id === item.id)) return;
        
        playSound('click', 'C4');
        const newSelected = [...selected, item];
        setSelected(newSelected);
        
        if (newSelected.length === 2) {
            setIsChecking(true);
            if (newSelected[0].pairId === newSelected[1].pairId) {
                playSound('correct', 'F5');
                setTimeout(() => {
                    setMatched(m => [...m, newSelected[0].pairId]);
                    setSelected([]);
                    setIsChecking(false);
                }, 800);
            } else {
                playSound('incorrect', 'C3');
                setTimeout(() => {
                    setSelected([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    };

    useEffect(() => {
        if (challenges.length > 0 && matched.length === challenges.length) {
            setIsActive(false);
            onComplete(challenges.length, challenges.length);
        }
    }, [matched, challenges, onComplete]);

    const getItemClass = (item: Item) => {
        if (matched.includes(item.pairId)) return 'matched pop-animate';
        const isSelected = selected.find(s => s.id === item.id);
        if (isSelected) {
            if (selected.length === 2 && selected[0].pairId !== selected[1].pairId) {
                return 'incorrect shake';
            }
            return 'selected';
        }
        return '';
    };

    return (
        <GameWrapper title={title} score={matched.length} total={challenges.length} timeLeft={timeLeft} maxTime={timeLimit}>
            <div className="text-center mb-4 text-slate-300">Click a card, then find its matching pair!</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4">
                {items.map(item => (
                    <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`match-item h-24 sm:h-28 p-2 bg-slate-700/50 rounded-lg border-2 border-slate-600 cursor-pointer flex items-center justify-center text-center text-sm transition-all duration-200 ${getItemClass(item)} hover:bg-slate-700`}
                    >
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </GameWrapper>
    );
};
