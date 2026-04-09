import React from 'react';
import { Bot1, Bot2, Bot3, Bot4 } from './Icons';
import { customizations } from '../constants/customizations';
import { EquippedItems } from '../types';

const avatarComponents: Record<string, any> = {
    bot1: Bot1,
    bot2: Bot2,
    bot3: Bot3,
    bot4: Bot4,
};

interface AvatarProps {
    avatarId: string | null;
    equipped: EquippedItems;
    size?: string | number;
}

export const Avatar: React.FC<AvatarProps> = ({ avatarId, equipped, size = "100" }) => {
    if (!avatarId) {
        return <div style={{ width: `${size}px`, height: `${size}px` }} className="bg-slate-700 rounded-full" />;
    }
    const AvatarComponent = avatarComponents[avatarId];
    if (!AvatarComponent) return null;

    const colorData = customizations.colors.find(c => c.id === equipped.color);
    const colorValue = colorData?.value || '#38bdf8';
    
    const accessoryData = customizations.accessories.find(acc => acc.id === equipped.accessory);
    const AccessoryComponent = accessoryData?.component;

    return (
        <div style={{ width: `${size}px`, height: `${size}px` }} className="relative">
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <AvatarComponent color={colorValue} />
                {AccessoryComponent && <AccessoryComponent />}
            </svg>
        </div>
    );
};
