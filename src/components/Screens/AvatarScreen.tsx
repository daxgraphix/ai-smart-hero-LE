import React from 'react';
import { motion } from 'motion/react';
import { Avatar } from '../Avatar';
import { avatarsInfo, customizations } from '../../constants/customizations';
import { UserProfile } from '../../types';

interface Props {
    onConfirm: () => void;
    onBack: () => void;
    profile: UserProfile;
    onProfileChange: (updater: (p: UserProfile) => UserProfile) => void;
    playSound: (sound: string, note: string) => void;
}

export const AvatarScreen: React.FC<Props> = ({ onConfirm, onBack, profile, onProfileChange, playSound }) => {
    const handleAvatarSelect = (avatarId: string) => {
        playSound('click', 'E4');
        onProfileChange(p => ({ ...p, avatarId }));
    };
    const handleColorSelect = (colorId: string) => {
        playSound('click', 'F4');
        onProfileChange(p => ({ ...p, colorId, equipped: { ...p.equipped, color: colorId } }));
    };
    const canConfirm = profile.avatarId && profile.colorId;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="screen flex absolute inset-0 text-center flex-col items-center justify-center p-8"
        >
            <div className="p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 w-full max-w-4xl">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">Design Your AI Ally</h1>
                <div className="grid md:grid-cols-2 gap-8 mt-8 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Choose a Bot Frame</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {avatarsInfo.map(avatar => (
                                <div
                                    key={avatar.id}
                                    onClick={() => handleAvatarSelect(avatar.id)}
                                    className={`avatar-option bg-slate-800/50 rounded-full p-2 transition-all duration-200 ease-in-out cursor-pointer border-4 ${profile.avatarId === avatar.id ? 'border-green-500 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.7)]' : 'border-transparent hover:border-sky-500 hover:scale-105'}`}
                                >
                                    <Avatar avatarId={avatar.id} equipped={{ color: profile.colorId, accessory: 'none' }} size="100" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Choose a Core Color</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-center">
                            {customizations.colors.map(color => (
                                <div
                                    key={color.id}
                                    onClick={() => handleColorSelect(color.id)}
                                    style={{ backgroundColor: color.value }}
                                    className={`w-12 h-12 rounded-full transition-all duration-200 ease-in-out cursor-pointer border-4 ${profile.colorId === color.id ? 'border-white scale-110 shadow-[0_0_10px_white]' : 'border-transparent hover:scale-110'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button onClick={onBack} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform btn-press">Back</button>
                    <button onClick={onConfirm} disabled={!canConfirm} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform btn-press disabled:opacity-50">Next</button>
                </div>
            </div>
        </motion.div>
    );
};
