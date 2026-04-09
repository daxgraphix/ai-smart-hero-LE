import React from 'react';
import { motion } from 'motion/react';
import { Avatar } from '../Avatar';
import { UserProfile } from '../../types';

interface Props {
    profile: UserProfile;
    onStart: () => void;
    onBack: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ profile, onStart, onBack }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="screen flex absolute inset-0 text-center flex-col items-center justify-center p-8"
    >
        <div className="mb-4">
            <Avatar avatarId={profile.avatarId} equipped={profile.equipped} size="120" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Welcome, <span className="font-bold" style={{ color: 'var(--accent-color)' }}>{profile.username}</span>!
        </h1>
        <p className="mt-4 max-w-xl text-slate-300 text-base sm:text-lg">This is your personalized AI Ally. Ready to explore the Data-verse?</p>
        <div className="flex items-center gap-4 mt-8">
            <button onClick={onBack} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform btn-press">Go Back</button>
            <button onClick={onStart} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform btn-press">Start Adventure</button>
        </div>
    </motion.div>
);
