import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Mission, UserProfile } from '../../types';
import { Avatar } from '../Avatar';
import { ChooseYourResponseGame } from '../Games/ChooseYourResponseGame';
import { MatchThePairsGame } from '../Games/MatchThePairsGame';
import { PromptCheckerGame } from '../Games/PromptCheckerGame';
import { SocialMediaDetectiveGame } from '../Games/SocialMediaDetectiveGame';
import { DragAndDropGame } from '../Games/DragAndDropGame';
import { RewardSeekingGame } from '../Games/RewardSeekingGame';

interface MissionModalProps {
    mission: Mission;
    profile: UserProfile;
    onClose: () => void;
    onUpdateProfile: (updater: (p: UserProfile) => UserProfile) => void;
    playSound: (sound: string, note: string) => void;
    onMissionComplete: (missionId: string) => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({ mission, profile, onClose, onUpdateProfile, playSound, onMissionComplete }) => {
    const [stage, setStage] = useState<'overview' | 'knowledge' | 'training' | 'challenge' | 'results'>('overview');
    const progress = profile.missionProgress[mission.id];

    useEffect(() => {
        setStage('overview');
    }, [mission.id]);

    const handleStageComplete = (completedStage: 'knowledge' | 'training' | 'challenge') => {
        onUpdateProfile(p => {
            const newProgress = { ...p.missionProgress };
            newProgress[mission.id] = { ...newProgress[mission.id], [completedStage]: true };
            return { ...p, missionProgress: newProgress };
        });
    };
    
    const handleChallengeComplete = (stars: number, points: number) => {
        const isFirstCompletion = !progress.challenge;
        onUpdateProfile(p => {
            const newProgress = { ...p.missionProgress };
            newProgress[mission.id].challenge = true;
            if (stars > newProgress[mission.id].stars) {
                newProgress[mission.id].stars = stars;
            }
            const updatedBadges = isFirstCompletion && !p.badges.includes(mission.id)
                ? [...p.badges, mission.id]
                : p.badges;
                
            return {
                ...p,
                totalPoints: p.totalPoints + points,
                missionProgress: newProgress,
                badges: updatedBadges,
            };
        });
        if (isFirstCompletion) {
            onMissionComplete(mission.id);
        }
        setStage('results');
    };

    const renderContent = () => {
        switch (stage) {
            case 'knowledge':
                return <KnowledgeStage mission={mission} onComplete={() => { handleStageComplete('knowledge'); setStage('training'); }} onBack={() => setStage('overview')} playSound={playSound} />;
            case 'training':
                return <TrainingStage mission={mission} onComplete={() => { handleStageComplete('training'); setStage('challenge'); }} onBack={() => setStage('overview')} playSound={playSound} />;
            case 'challenge':
                return <ChallengeHost mission={mission} onComplete={handleChallengeComplete} playSound={playSound} />;
            case 'results':
                return <ResultsStage mission={mission} profile={profile} onClose={onClose} />;
            case 'overview':
            default:
                return <OverviewStage mission={mission} progress={progress} setStage={setStage} playSound={playSound} />;
        }
    };

    return <div className="text-white">{renderContent()}</div>;
};

const OverviewStage: React.FC<{ mission: Mission; progress: any; setStage: any; playSound: any }> = ({ mission, progress, setStage, playSound }) => {
    const stages = [
        { key: 'knowledge', name: 'Knowledge', completed: progress.knowledge, locked: false },
        { key: 'training', name: 'Training', completed: progress.training, locked: !progress.knowledge },
        { key: 'challenge', name: 'Challenge', completed: progress.challenge, locked: !progress.training },
    ];

    const handleStart = () => {
        playSound('click', 'D4');
        if (!progress.knowledge) setStage('knowledge');
        else if (!progress.training) setStage('training');
        else setStage('challenge');
    };
    
    return (
        <div className="text-center px-2 sm:px-0">
            <p className="text-slate-300 mb-8 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">{mission.description}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2 mb-10">
                {stages.map((s, i) => (
                    <React.Fragment key={s.key}>
                        <div className={`w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-2 rounded-xl sm:rounded-full text-sm font-bold sm:font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${s.completed ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : s.locked ? 'bg-slate-700 text-slate-500' : 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'}`}>
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black/20 text-[10px]">{i + 1}</span>
                            {s.name}
                        </div>
                        {i < stages.length - 1 && (
                            <div className="hidden sm:block w-8 h-px bg-slate-600" />
                        )}
                    </React.Fragment>
                ))}
            </div>
            {progress.challenge ? (
                 <div className="grid grid-cols-1 sm:flex sm:flex-row gap-4 justify-center">
                    <button onClick={() => { playSound('click', 'G4'); setStage('knowledge'); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 active:scale-95">Review Knowledge</button>
                    <button onClick={() => { playSound('click', 'A4'); setStage('training'); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 active:scale-95">Review Training</button>
                    <button onClick={() => { playSound('click', 'B4'); setStage('challenge'); }} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-600/20">Replay Challenge</button>
                </div>
            ) : (
                <button onClick={handleStart} className="w-full sm:w-auto text-white font-bold py-4 px-10 rounded-full text-lg btn-primary shadow-xl shadow-sky-500/20 transition-all hover:scale-105 active:scale-95">
                    {progress.knowledge ? (progress.training ? 'Start Challenge' : 'Start Training') : 'Start Knowledge'}
                </button>
            )}
        </div>
    );
};

const KnowledgeStage: React.FC<{ mission: Mission; onComplete: any; onBack: any; playSound: any }> = ({ mission, onComplete, onBack, playSound }) => {
    const [page, setPage] = useState(0);
    const isLastPage = page === mission.knowledge.pages.length - 1;

    const handleNext = () => {
        playSound('click', 'E4');
        if (isLastPage) {
            onComplete();
        } else {
            setPage(p => p + 1);
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-24 h-24 sm:w-32 sm:h-32 cybie-talk flex-shrink-0">
                    <Avatar avatarId="bot3" equipped={{ color: 'default', accessory: 'none' }} size="100%" />
                </div>
                <div className="w-full text-center sm:text-left bg-slate-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl">
                    <div className="min-h-[120px] sm:min-h-[150px] flex flex-col justify-center">
                        <p className="text-lg sm:text-xl text-slate-100 leading-relaxed mb-6">{mission.knowledge.pages[page].text}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-700/50">
                        <span className="text-sm font-bold text-sky-400 tracking-widest uppercase">{`Page ${page + 1} of ${mission.knowledge.pages.length}`}</span>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={onBack} className="flex-1 sm:flex-none bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95">Back</button>
                            <button onClick={handleNext} className="flex-1 sm:flex-none bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20">
                                {isLastPage ? "Train Now" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrainingStage: React.FC<{ mission: Mission; onComplete: any; onBack: any; playSound: any }> = ({ mission, onComplete, onBack, playSound }) => {
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setFlipped] = useState(false);
    const cards = mission.training.flashcards;

    const navigate = (direction: number) => {
        playSound('click', 'D4');
        setFlipped(false);
        setTimeout(() => setCardIndex(i => Math.max(0, Math.min(cards.length - 1, i + direction))), 150);
    };

    return (
        <div className="text-center">
            <p className="text-slate-300 mb-4">Click to flip the card. Use arrows to navigate.</p>
            <div className="flashcard-container w-full max-w-md mx-auto h-56 sm:h-64 mb-6" onClick={() => setFlipped(!isFlipped)}>
                <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
                    <div className="flashcard-face flashcard-front">
                        <h3 className="text-2xl font-bold text-center">{cards[cardIndex].term}</h3>
                    </div>
                    <div className="flashcard-face flashcard-back">
                        <p className="text-center">{cards[cardIndex].definition}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between max-w-md mx-auto">
                <button onClick={() => navigate(-1)} disabled={cardIndex === 0} className="p-3 bg-slate-600 rounded-full hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft />
                </button>
                <span className="font-bold">{`${cardIndex + 1} / ${cards.length}`}</span>
                <button onClick={() => navigate(1)} disabled={cardIndex === cards.length - 1} className="p-3 bg-slate-600 rounded-full hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight />
                </button>
            </div>
            {cardIndex === cards.length - 1 && (
                 <div className="flex justify-center gap-4 mt-8">
                    <button onClick={onBack} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-full transition-colors">Back</button>
                    <button onClick={onComplete} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors">Start Challenge!</button>
                 </div>
            )}
        </div>
    );
};

const ChallengeHost: React.FC<{ mission: Mission; onComplete: any; playSound: any }> = ({ mission, onComplete, playSound }) => {
    const [started, setStarted] = useState(false);
    
    const handleEndChallenge = (score: number, totalQuestions: number) => {
        playSound('complete', 'C5');
        const percentage = totalQuestions > 0 ? (score / totalQuestions) : 0;
        let stars = percentage >= 0.9 ? 3 : percentage >= 0.6 ? 2 : score > 0 ? 1 : 0;
        let points = stars === 3 ? 100 : (stars === 2 ? 75 : (stars === 1 ? 50 : 0));
        onComplete(stars, points);
    };

    if (!started) {
        return (
             <div className="max-w-3xl mx-auto">
                 <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                     <div className="w-24 h-24 sm:w-32 sm:h-32 cybie-talk flex-shrink-0">
                        <Avatar avatarId="bot1" equipped={{ color: 'green', accessory: 'none' }} size="100%" />
                     </div>
                     <div className="w-full text-center sm:text-left bg-slate-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl">
                         <p className="text-lg sm:text-xl text-slate-100 leading-relaxed mb-8">Bzzzt! Your training is complete, Hero! It's time to put your new skills to the test in the AI City simulator. Show me what you've learned. My circuits are buzzing with excitement!</p>
                         <button onClick={() => setStarted(true)} className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20">Start Challenge</button>
                    </div>
                </div>
            </div>
        );
    }
    
    const getRandomSubset = (arr: any[], size: number) => {
        if (!arr) return [];
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, size);
    };

    if (mission.challenge.gameType === 'chooseYourResponse') {
        const challenges = getRandomSubset(mission.challenge.content, 5);
        return <ChooseYourResponseGame challenges={challenges} onComplete={handleEndChallenge} playSound={playSound} title={mission.challenge.title} timeLimit={mission.challenge.timeLimit} />;
    }
    if (mission.challenge.gameType === 'matchThePairs') {
        const challenges = getRandomSubset(mission.challenge.content, 5);
        return <MatchThePairsGame challenges={challenges} onComplete={handleEndChallenge} playSound={playSound} title={mission.challenge.title} timeLimit={mission.challenge.timeLimit} />;
    }
    if (mission.challenge.gameType === 'promptChecker') {
        const challenges = getRandomSubset(mission.challenge.content, 3);
        return <PromptCheckerGame challenges={challenges} onComplete={handleEndChallenge} playSound={playSound} title={mission.challenge.title} timeLimit={mission.challenge.timeLimit} />;
    }
    if (mission.challenge.gameType === 'socialDetective') {
        return <SocialMediaDetectiveGame challenges={mission.challenge.content} onComplete={handleEndChallenge} playSound={playSound} title={mission.challenge.title} timeLimit={mission.challenge.timeLimit} />;
    }
    if (mission.challenge.gameType === 'dragAndDrop') {
        const challenges = getRandomSubset(mission.challenge.content, 10);
        return <DragAndDropGame challenges={challenges} onComplete={handleEndChallenge} playSound={playSound} title={mission.challenge.title} timeLimit={mission.challenge.timeLimit} />;
    }
    if (mission.challenge.gameType === 'rewardSeeking') {
        return <RewardSeekingGame challenges={mission.challenge.content[0]} onComplete={handleEndChallenge} playSound={playSound} title={mission.challenge.title} timeLimit={mission.challenge.timeLimit} />;
    }

    return <div>Unknown game type</div>;
};

const ResultsStage: React.FC<{ mission: Mission; profile: UserProfile; onClose: any }> = ({ mission, profile, onClose }) => {
    const progress = profile.missionProgress[mission.id];
    const stars = progress.stars;

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-green-400">Challenge Complete!</h2>
            <div className="flex justify-center my-6 gap-1">
                {[...Array(3)].map((_, i) => (
                    <Star key={i} size={40} fill={i < stars ? '#facc15' : 'transparent'} className={i < stars ? 'text-amber-400' : 'text-slate-600'} />
                ))}
            </div>
            <p className="text-lg mb-6">You earned the <span className="font-bold text-amber-300">{mission.badgeName}</span> badge!</p>
            <button onClick={onClose} className="mt-8 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-full transition-colors">Continue</button>
        </div>
    );
};
