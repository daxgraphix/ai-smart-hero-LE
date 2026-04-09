import React from 'react';
import { motion } from 'motion/react';

interface Props {
    onStart: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onStart }) => (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="screen flex absolute inset-0 text-center flex-col items-center justify-center p-8 bg-slate-900/50 backdrop-blur-sm"
    >
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text mb-4 glowing-title">AI Smart Hero</h1>
        <p className="mt-4 max-w-2xl text-slate-300 text-lg sm:text-xl">An interactive adventure to master the world of Artificial Intelligence.</p>
        <button 
            onClick={onStart} 
            className="mt-12 text-white font-bold py-4 px-10 rounded-full text-2xl transform btn-press shadow-lg shadow-sky-500/30 btn-primary transition-all hover:scale-105"
        >
            Start Your Journey
        </button>
    </motion.div>
);
