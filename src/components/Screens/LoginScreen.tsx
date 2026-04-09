import React, { useState } from 'react';
import { motion } from 'motion/react';
import { validateUsername, sanitizeInput } from '../../utils/validation';

interface Props {
    onLogin: (username: string) => void;
}

export const LoginScreen: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = () => {
        const sanitized = sanitizeInput(username);
        const validation = validateUsername(sanitized);
        
        if (!validation.isValid) {
            setError(validation.error || 'Invalid username');
            return;
        }
        
        setIsSubmitting(true);
        setError(null);
        
        setTimeout(() => {
            onLogin(sanitized);
            setIsSubmitting(false);
        }, 300);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="screen flex absolute inset-0 text-center flex-col items-center justify-center p-8"
        >
            <div className="p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 w-full max-w-md">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">Who is the Hero?</h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="mt-6 w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white text-center text-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                    placeholder="Enter your name"
                    maxLength={20}
                    aria-label="Username"
                    aria-invalid={!!error}
                    aria-describedby={error ? 'username-error' : undefined}
                    disabled={isSubmitting}
                />
                {error && (
                    <p id="username-error" className="mt-2 text-red-400 text-sm" role="alert">
                        {error}
                    </p>
                )}
                <button 
                    onClick={handleLogin} 
                    disabled={!username.trim() || isSubmitting} 
                    className="mt-6 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform btn-press disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : 'Next'}
                </button>
            </div>
        </motion.div>
    );
};
