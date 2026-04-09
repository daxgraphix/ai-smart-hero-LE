import React, { memo } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../../types';
import { missions } from '../../constants/missions';
import { Avatar } from '../Avatar';
import { Confetti } from '../Layout/Confetti';

interface Props {
    profile: UserProfile;
    onOpenMission: (id: string) => void;
    openSidebar: () => void;
    lastCompleted: string | null;
}

const MissionCard: React.FC<{
    mission: typeof missions[string];
    progress: UserProfile['missionProgress'][string];
    isNewlyCompleted: boolean;
    onOpen: () => void;
}> = memo(({ mission, progress, isNewlyCompleted, onOpen }) => {
    const isCompleted = progress.challenge;
    let stagesComplete = 0;
    if (progress.knowledge) stagesComplete++;
    if (progress.training) stagesComplete++;
    if (progress.challenge) stagesComplete++;
    
    const percentage = Math.round((stagesComplete / 3) * 100);
    const completedClass = isCompleted 
        ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
        : 'border-slate-700';

    return (
        <motion.div
            key={mission.id}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpen}
            className={`relative cursor-pointer bg-slate-800/50 rounded-xl p-4 sm:p-6 flex flex-col text-center border-2 transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] ${completedClass}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpen()}
            aria-label={`Open ${mission.title} mission`}
        >
            {isNewlyCompleted && <Confetti />}
            {isCompleted && (
                <div className={`absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full ${isNewlyCompleted ? 'done-badge-animate' : ''}`}>
                    DONE!
                </div>
            )}
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-3 sm:mb-4 flex-shrink-0" aria-hidden="true">{mission.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">{mission.title}</h3>
            <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-2">{mission.description}</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mt-auto">
                <div 
                    className={`h-2.5 rounded-full transition-all duration-500 ${percentage === 100 ? 'bg-green-400' : 'bg-sky-500'}`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            <div className="text-xs text-slate-400 text-right mt-1">{percentage}% Complete</div>
        </motion.div>
    );
});

MissionCard.displayName = 'MissionCard';

export const Dashboard: React.FC<Props> = memo(({ profile, onOpenMission, openSidebar, lastCompleted }) => {
    const totalMissions = Object.keys(missions).length;
    const missionEntries = Object.entries(missions);

    return (
        <div className="screen flex flex-col h-full w-full">
            <header className="text-center py-4 flex-shrink-0 flex justify-center items-center gap-4 relative">
                <button 
                    onClick={openSidebar} 
                    aria-label="Open Menu" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-700/50 rounded-full hover:bg-slate-600/50 transition-colors lg:hidden touch-target"
                >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <h1 className="text-2xl sm:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text glowing-title">AI City</h1>
            </header>
            <main className="w-full flex-grow flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-0">
                 <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-6 border border-slate-700 w-full max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-700 rounded-full p-1 transition-transform hover:scale-110 relative overflow-hidden shadow-lg">
                            <Avatar avatarId={profile.avatarId} equipped={profile.equipped} size="48" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg sm:text-xl text-slate-200 leading-tight">{profile.username}</span>
                            <span className="text-xs text-sky-400 font-medium uppercase tracking-wider">Active Hero</span>
                        </div>
                    </div>
                    <div className="flex gap-6 sm:gap-12">
                        <div className="text-center relative group">
                            <div className="font-bold text-2xl sm:text-3xl transition-all duration-300" style={{ color: 'var(--accent-color)' }}>{profile.totalPoints}</div>
                            <div className="text-xs sm:text-sm text-slate-400 font-medium">Total Points</div>
                        </div>
                        <div className="text-center">
                            <div className="text-amber-400 font-bold text-2xl sm:text-3xl">{`${profile.badges.length}/${totalMissions}`}</div>
                            <div className="text-xs sm:text-sm text-slate-400 font-medium">Badges Earned</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 sm:gap-6 w-full max-w-7xl mx-auto pb-8 sm:pb-12">
                    {missionEntries.map(([id, mission]) => {
                         const progress = profile.missionProgress[id];
                         const isNewlyCompleted = lastCompleted === id;
                         
                         return (
                            <MissionCard
                                key={id}
                                mission={mission}
                                progress={progress}
                                isNewlyCompleted={isNewlyCompleted}
                                onOpen={() => onOpenMission(id)}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
});

Dashboard.displayName = 'Dashboard';