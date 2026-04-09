import React, { useState, useEffect } from 'react';
import { GameWrapper } from './GameWrapper';

interface ChallengeItem {
    text: string;
    type: string;
}

interface Props {
    challenges: ChallengeItem[];
    onComplete: (score: number, total: number) => void;
    playSound: (sound: string, note: string) => void;
    title: string;
    timeLimit: number;
}

export const DragAndDropGame: React.FC<Props> = ({ challenges, onComplete, playSound, title, timeLimit }) => {
    const [items, setItems] = useState(challenges);
    const [safeItems, setSafeItems] = useState<ChallengeItem[]>([]);
    const [unsafeItems, setUnsafeItems] = useState<ChallengeItem[]>([]);
    const [draggedItem, setDraggedItem] = useState<ChallengeItem | null>(null);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    onComplete(safeItems.length + unsafeItems.length, challenges.length);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, onComplete, safeItems, unsafeItems, challenges]);

    const handleDrop = (zone: string) => {
        if (!draggedItem || !isActive) return;
        if (draggedItem.type === zone) {
            playSound('correct', 'E5');
            setItems(i => i.filter(item => item.text !== draggedItem.text));
            if (zone === 'safe') setSafeItems(s => [...s, draggedItem]);
            else setUnsafeItems(u => [...u, draggedItem]);
        } else {
            playSound('incorrect', 'C3');
        }
        setDraggedItem(null);
    };

    const handleItemClick = (item: ChallengeItem) => {
        if (!isActive) return;
        if (draggedItem?.text === item.text) {
            setDraggedItem(null);
        } else {
            setDraggedItem(item);
        }
    };

    const handleZoneClick = (zone: string) => {
        if (draggedItem && isActive) {
            handleDrop(zone);
        }
    };

    useEffect(() => {
        if (items.length === 0) {
            setIsActive(false);
            onComplete(challenges.length, challenges.length);
        }
    }, [items, challenges, onComplete]);

    const DropZone = ({ type, items, children }: { type: string; items: ChallengeItem[]; children: React.ReactNode }) => {
        const [isOver, setIsOver] = useState(false);
        return (
            <div
                onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
                onDragLeave={() => setIsOver(false)}
                onDrop={() => { handleDrop(type); setIsOver(false); }}
                onClick={() => handleZoneClick(type)}
                className={`drop-zone bg-slate-800/50 rounded-lg p-4 border-2 border-dashed border-slate-600 flex-grow min-h-[150px] space-y-2 transition-all duration-300 cursor-pointer ${isOver ? 'active' : ''} ${draggedItem ? 'ring-2 ring-sky-500/50' : ''}`}
            >
                {children}
                {items.map(item => <div key={item.text} className="bg-slate-700 p-2 rounded text-sm animate-[toast-in_0.3s_ease]">{item.text}</div>)}
            </div>
        );
    };

    return (
        <GameWrapper title={title} score={safeItems.length + unsafeItems.length} total={challenges.length} timeLeft={timeLeft} maxTime={timeLimit}>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 min-h-[300px] bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                     <h4 className="text-lg font-bold text-center mb-2">Items to Sort</h4>
                    {items.map(item => (
                        <div 
                            key={item.text} 
                            draggable={true} 
                            onDragStart={() => setDraggedItem(item)} 
                            onClick={() => handleItemClick(item)}
                            className={`drag-item p-3 rounded-lg text-center cursor-grab hover:shadow-lg transition-all active:cursor-grabbing ${draggedItem?.text === item.text ? 'bg-sky-600 ring-2 ring-white' : 'bg-slate-700 hover:bg-sky-600'}`}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    <DropZone type='safe' items={safeItems}>
                        <h4 className="text-green-400 font-bold text-center mb-2">✅ Safe to Share</h4>
                    </DropZone>
                    <DropZone type='unsafe' items={unsafeItems}>
                        <h4 className="text-red-400 font-bold text-center mb-2">❌ Not Safe to Share</h4>
                    </DropZone>
                </div>
            </div>
        </GameWrapper>
    );
};
