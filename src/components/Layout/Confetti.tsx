import React, { useMemo } from 'react';

const ConfettiPiece = ({ style }: { style: React.CSSProperties; key?: any }) => (
    <div
        className='absolute w-2 h-2 rounded-full'
        style={style}
    />
);

export const Confetti = () => {
    const colors = ['#38bdf8', '#4ade80', '#facc15', '#f472b6', '#c084fc'];
    const pieces = useMemo(() => Array.from({ length: 40 }).map((_, i) => {
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}%`,
            top: `${-20 - Math.random() * 80}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animation: `fall ${2 + Math.random() * 2}s ${Math.random() * 1.5}s linear forwards`,
            transform: `rotate(${Math.random() * 360}deg)`
        };
        return <ConfettiPiece key={i} style={style} />;
    }), []);

    return <div className='absolute inset-0 overflow-hidden pointer-events-none z-10'>{pieces}</div>;
};
