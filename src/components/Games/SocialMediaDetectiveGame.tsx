import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { GameWrapper } from './GameWrapper';

interface Clue {
    id: string;
    target: string;
    feedback: string;
}

interface Comment {
    id: string;
    user: string;
    text: string;
}

interface Challenge {
    id: string;
    user: string;
    avatarColor: string;
    imageLabel: string;
    imageContent: string;
    caption: string;
    comments: Comment[];
    clues: Clue[];
}

interface Props {
    challenges: Challenge[];
    onComplete: (score: number, total: number) => void;
    playSound: (sound: string, note: string) => void;
    title: string;
    timeLimit: number;
}

export const SocialMediaDetectiveGame: React.FC<Props> = ({ challenges, onComplete, playSound, title, timeLimit }) => {
    const [pIndex, setPIndex] = useState(0);
    const [foundClues, setFoundClues] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isActive, setIsActive] = useState(true);
    const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

    const post = challenges[pIndex];
    const totalCluesInPost = post.clues.length;

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    onComplete(score, challenges.reduce((acc, c) => acc + c.clues.length, 0));
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, onComplete, score, challenges]);

    const handleRegionClick = (targetType: string, specificId: string | null = null) => {
        if (!isActive) return;

        const clue = post.clues.find(c => {
            if (c.target === targetType) return true;
            if (targetType === 'comment' && c.target === `comment-${specificId}`) return true;
            return false;
        });

        if (clue) {
            if (!foundClues.includes(clue.id)) {
                playSound('correct', 'E5');
                const newFound = [...foundClues, clue.id];
                setFoundClues(newFound);
                setScore(s => s + 1);
                setFeedbackMsg({ text: clue.feedback, type: 'success' });
                
                if (newFound.length === totalCluesInPost) {
                    setTimeout(() => {
                        setFeedbackMsg(null);
                        if (pIndex + 1 < challenges.length) {
                             setPIndex(p => p + 1);
                             setFoundClues([]);
                        } else {
                             setIsActive(false);
                             onComplete(score + 1, challenges.reduce((acc, c) => acc + c.clues.length, 0));
                        }
                    }, 2000);
                }
            }
        } else {
            playSound('incorrect', 'C3');
            setFeedbackMsg({ text: "Nothing suspicious about this specific part.", type: 'info' });
            setTimeout(() => setFeedbackMsg(null), 1500);
        }
    };

    const isFound = (targetType: string, specificId: string | null = null) => {
        return post.clues.some(c => {
            if (foundClues.includes(c.id)) {
                if (targetType === 'comment') return c.target === `comment-${specificId}`;
                return c.target === targetType;
            }
            return false;
        });
    };

    return (
        <GameWrapper title={title} score={foundClues.length} total={totalCluesInPost} timeLeft={timeLeft} maxTime={timeLimit}>
            <div className="text-center mb-4 text-slate-300">Tap on suspicious elements (Image, Caption, or Comments)!</div>
            
            <div className="social-post flex flex-col">
                <div className="p-3 flex items-center gap-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: post.avatarColor }} />
                    <div className="font-bold text-sm">{post.user}</div>
                </div>
                
                <div 
                    onClick={() => handleRegionClick('image')}
                    className={`detective-region bg-slate-200 h-64 flex items-center justify-center p-4 text-center relative ${isFound('image') ? 'found' : ''}`}
                >
                    <div className="text-slate-800">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="font-semibold">{post.imageLabel}</p>
                        <p className="text-xs mt-1 opacity-70">{post.imageContent}</p>
                    </div>
                </div>

                <div className="p-3 flex gap-4 text-slate-400">
                    <ThumbsUp size={20} /> <MessageCircle size={20} /> <Share2 size={20} />
                </div>

                <div 
                    onClick={() => handleRegionClick('caption')}
                    className={`detective-region p-3 pt-0 text-sm border-b border-slate-100 ${isFound('caption') ? 'found' : ''}`}
                >
                    <span className="font-bold mr-2">{post.user}</span>
                    {post.caption}
                </div>

                <div className="p-3 bg-slate-50 flex-grow">
                    {post.comments.map(comment => (
                        <div 
                            key={comment.id}
                            onClick={(e) => { e.stopPropagation(); handleRegionClick('comment', comment.id); }}
                            className={`detective-region mb-2 p-2 rounded flex gap-2 text-xs ${isFound('comment', comment.id) ? 'found' : ''}`}
                        >
                            <span className="font-bold">{comment.user}</span>
                            <span>{comment.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {feedbackMsg && (
                <div className="mt-4 p-3 rounded-lg text-center bg-slate-800 border border-slate-700 toast">
                    <p className={`font-bold ${feedbackMsg.type === 'success' ? 'text-green-400' : 'text-slate-300'}`}>{feedbackMsg.text}</p>
                </div>
            )}
        </GameWrapper>
    );
};
