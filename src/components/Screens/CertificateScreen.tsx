import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { motion } from 'motion/react';
import { UserProfile } from '../../types';
import { missions } from '../../constants/missions';
import { SealIcon } from '../Icons';

interface Props {
    profile: UserProfile;
    onPlayAgain: () => void;
    playSound: (sound: string, note: string) => void;
}

export const CertificateScreen: React.FC<Props> = ({ profile, onPlayAgain, playSound }) => {
    const certificateRef = useRef<HTMLDivElement>(null);
    const downloadButtonRef = useRef<HTMLButtonElement>(null);
    const playAgainButtonRef = useRef<HTMLButtonElement>(null);

    const getFormattedDate = () => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    };

    const handleDownload = () => {
        playSound('click', 'A5');
        if (!certificateRef.current || !downloadButtonRef.current || !playAgainButtonRef.current) return;

        downloadButtonRef.current.style.visibility = 'hidden';
        playAgainButtonRef.current.style.visibility = 'hidden';
        
        html2canvas(certificateRef.current, {
            scale: 2,
            backgroundColor: '#f1f5f9'
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `AISmartHero_Certificate_${profile.username}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            if(downloadButtonRef.current && playAgainButtonRef.current) {
                downloadButtonRef.current.style.visibility = 'visible';
                playAgainButtonRef.current.style.visibility = 'visible';
            }
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="screen flex absolute inset-0 flex-col items-center justify-center p-4 sm:p-8 bg-slate-900/50 backdrop-blur-sm"
        >
            <div className="w-full max-w-2xl text-center">
                <div ref={certificateRef} className="bg-slate-100 text-slate-800 p-6 sm:p-10 rounded-lg shadow-2xl border-8 border-amber-400 relative">
                    <div className="text-center">
                        <h1 className="cert-animate text-2xl sm:text-3xl font-bold text-slate-600" style={{ fontFamily: "'Times New Roman', serif", animationDelay: '0.2s' }}>Certificate of Achievement</h1>
                        <p className="cert-animate mt-4 text-sm text-slate-500" style={{ animationDelay: '0.4s' }}>This certifies that</p>
                        <h2 className="cert-animate text-4xl sm:text-5xl font-bold my-4" style={{ color: 'var(--accent-color)', animationDelay: '0.6s' }}>{profile.username}</h2>
                        <p className="cert-animate text-sm text-slate-500" style={{ animationDelay: '0.8s' }}>has successfully completed all missions and earned the rank of</p>
                        <h3 className="cert-animate text-3xl sm:text-4xl font-bold my-4 bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text" style={{ animationDelay: '1.0s' }}>AI Smart Hero</h3>
                        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 my-6">
                            {profile.badges.map((badgeId, index) => (
                                <div key={badgeId} className="cert-animate w-12 h-12 sm:w-16 sm:h-16" title={missions[badgeId].badgeName} style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                                    {missions[badgeId].badgeIcon}
                                </div>
                            ))}
                        </div>
                        <div className="cert-animate mt-8 flex justify-between items-center text-xs text-slate-500" style={{ animationDelay: '1.8s' }}>
                            <p>Awarded on: {getFormattedDate()}</p>
                            <div className="flex items-center gap-2">
                                <SealIcon />
                                <span>Official Seal</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <button ref={downloadButtonRef} onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 btn-press">Download Certificate</button>
                    <button ref={playAgainButtonRef} onClick={onPlayAgain} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 btn-press">Play Again</button>
                </div>
            </div>
        </motion.div>
    );
};
