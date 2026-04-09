import React from 'react';
import { UserProfile } from '../../types';
import { Avatar } from '../Avatar';
import { customizations } from '../../constants/customizations';

interface Props {
    profile: UserProfile;
    onUpdateProfile: (updater: (p: UserProfile) => UserProfile) => void;
    playSound: (sound: string, note: string) => void;
}

export const GuardianHQModal: React.FC<Props> = ({ profile, onUpdateProfile, playSound }) => {
    const handleItemAction = (type: 'color' | 'accessory', action: 'unlock' | 'equip', id: string) => {
        const item = customizations[`${type}s`].find((i: any) => i.id === id);
        if (!item) return;

        if (action === 'unlock') {
            if (profile.totalPoints >= item.cost) {
                playSound('purchase', 'A5');
                onUpdateProfile(p => ({
                    ...p,
                    totalPoints: p.totalPoints - item.cost,
                    unlockedItems: [...p.unlockedItems, id],
                    equipped: { ...p.equipped, [type]: id }
                }));
            }
        } else if (action === 'equip') {
            playSound('click', 'G4');
            onUpdateProfile(p => ({
                ...p,
                equipped: { ...p.equipped, [type]: id }
            }));
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 flex flex-col items-center">
                <Avatar avatarId={profile.avatarId} equipped={profile.equipped} size="120" />
                <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-sky-400">{profile.totalPoints} Points</div>
                </div>
            </div>
            <div className="md:col-span-2">
                <div>
                    <h4 className="font-bold text-lg mb-2 text-purple-300">Colors</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
                        {customizations.colors.map(color => {
                            const isUnlocked = profile.unlockedItems.includes(color.id);
                            const isEquipped = profile.equipped.color === color.id;
                            return (
                                <div key={color.id} className="text-center">
                                    <div 
                                        className={`w-12 h-12 mx-auto rounded-full border-2 ${isEquipped ? 'border-white' : 'border-transparent'}`} 
                                        style={{ backgroundColor: color.value }} 
                                    />
                                    <div className="mt-2">
                                        {isEquipped ? (
                                            <button className="w-full text-xs py-1 rounded bg-slate-500 cursor-default" disabled>Equipped</button>
                                        ) : isUnlocked ? (
                                            <button onClick={() => handleItemAction('color', 'equip', color.id)} className="w-full text-xs py-1 rounded bg-green-600 hover:bg-green-700 btn-press transition-colors">Equip</button>
                                        ) : (
                                            <button 
                                                onClick={() => handleItemAction('color', 'unlock', color.id)} 
                                                className={`w-full text-xs py-1 rounded ${profile.totalPoints >= color.cost ? 'bg-sky-600 hover:bg-sky-700' : 'bg-slate-600'} btn-press transition-colors`} 
                                                disabled={profile.totalPoints < color.cost}
                                            >
                                                {color.cost} Pts
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2 text-purple-300">Accessories</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {customizations.accessories.map(acc => {
                            const isUnlocked = profile.unlockedItems.includes(acc.id);
                            const isEquipped = profile.equipped.accessory === acc.id;
                            return (
                                <div key={acc.id} className="text-center p-2 bg-slate-700/50 rounded-lg">
                                    <div className={`w-16 h-16 mx-auto rounded-full bg-slate-600 flex items-center justify-center text-xs ${isEquipped ? 'border-2 border-white' : ''}`}>
                                        {acc.name}
                                    </div>
                                    <div className="mt-2">
                                        {isEquipped ? (
                                            <button className="w-full text-xs py-1 rounded bg-slate-500 cursor-default" disabled>Equipped</button>
                                        ) : isUnlocked ? (
                                            <button onClick={() => handleItemAction('accessory', 'equip', acc.id)} className="w-full text-xs py-1 rounded bg-green-600 hover:bg-green-700 btn-press transition-colors">Equip</button>
                                        ) : (
                                            <button 
                                                onClick={() => handleItemAction('accessory', 'unlock', acc.id)} 
                                                className={`w-full text-xs py-1 rounded ${profile.totalPoints >= acc.cost ? 'bg-sky-600 hover:bg-sky-700' : 'bg-slate-600'} btn-press transition-colors`} 
                                                disabled={profile.totalPoints < acc.cost}
                                            >
                                                {acc.cost} Pts
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
