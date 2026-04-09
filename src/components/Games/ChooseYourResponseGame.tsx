import React, { useState, useEffect } from 'react';
import { GameWrapper } from './GameWrapper';

interface Option {
    text: string;
    feedback: string;
    correct: boolean;
}

interface Challenge {
    scenario: string;
    options: Option[];
}

interface Props {
    challenges: Challenge[];
    title: string;
    onComplete: (score: number, total: number) => void;
    playSound: (sound: string, note: string) => void;
    timeLimit: number;
}

export const ChooseYourResponseGame: React.FC<Props> = ({ challenges, title, onComplete, playSound, timeLimit }) => {
    const [qIndex, setQIndex] = useState(0);
    const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);
    const [localScore, setLocalScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    onComplete(localScore, challenges.length);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, onComplete, localScore, challenges]);

    const handleAnswer = (option: Option) => {
        if (feedback || !isActive) return;

        setFeedback({ text: option.feedback, correct: option.correct });
        if (option.correct) {
            playSound('correct', 'G5');
            setLocalScore(s => s + 1);
        } else {
            playSound('incorrect', 'C3');
        }

        setTimeout(() => {
            setFeedback(null);
            if (qIndex + 1 < challenges.length) {
                setQIndex(q => q + 1);
            } else {
                setIsActive(false);
                onComplete(localScore + (option.correct ? 1 : 0), challenges.length);
            }
        }, 3000);
    };

    const q = challenges[qIndex];
    
    return (
        <GameWrapper title={title} score={localScore} total={challenges.length} timeLeft={timeLeft} maxTime={timeLimit}>
            <h4 className="text-xl text-slate-200 mb-6 text-center">{q.scenario}</h4>
            <div className="flex flex-col gap-4">
                {q.options.map((o, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleAnswer(o)} 
                        disabled={!!feedback} 
                        className={`text-left p-4 bg-slate-700/50 rounded-lg border-2 border-slate-600 hover:bg-slate-600 hover:border-sky-500 transition disabled:opacity-70 ${feedback && (o.correct ? 'bg-green-500/20 border-green-400' : (o.text === feedback.text ? 'bg-red-500/20 border-red-400' : ''))}`}
                    >
                        {o.text}
                    </button>
                ))}
            </div>
            {feedback && (
                <div className="mt-6 text-center p-4 rounded-lg bg-slate-900 border border-slate-700 toast">
                    <p className={`font-bold ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>{feedback.correct ? "Great Choice!" : "Think Again..."}</p>
                    <p className="mt-1 text-slate-300">{feedback.text}</p>
                </div>
            )}
        </GameWrapper>
    );
};
