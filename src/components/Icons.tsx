import React from 'react';

export const Bot1 = ({ color }: { color: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C9.23858 2 7 4.23858 7 7V11C7 11.5523 7.44772 12 8 12H16C16.5523 12 17 11.5523 17 11V7C17 4.23858 14.7614 2 12 2Z" fill={color} />
        <path d="M6 14C6 13.4477 6.44772 13 7 13H17C17.5523 13 18 13.4477 18 14V17C18 19.2091 16.2091 21 14 21H10C7.79086 21 6 19.2091 6 17V14Z" fill="#94a3b8" />
        <rect x="9" y="15" width="6" height="4" rx="1" fill="#0f172a" />
        <circle cx="10" cy="7" r="1.5" fill="white" />
        <circle cx="14" cy="7" r="1.5" fill="white" />
    </svg>
);

export const Bot2 = ({ color }: { color: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="14" height="14" rx="7" fill={color} />
        <rect x="4" y="11" width="16" height="8" rx="4" fill="#94a3b8" />
        <rect x="8" y="8" width="8" height="5" rx="2.5" fill="#1e293b" />
        <path d="M9 10.5H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 16L2 19M20 16L22 19" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const Bot3 = ({ color }: { color: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill={color} />
        <path d="M12 16C14.2091 16 16 14.2091 16 12H8C8 14.2091 9.79086 16 12 16Z" fill="#1e293b" />
        <path d="M9.5 10C10.3284 10 11 9.32843 11 8.5C11 7.67157 10.3284 7 9.5 7C8.67157 7 8 7.67157 8 8.5C8 9.32843 8.67157 10 9.5 10Z" fill="white" />
        <path d="M14.5 10C15.3284 10 16 9.32843 16 8.5C16 7.67157 15.3284 7 14.5 7C13.6716 7 13 7.67157 13 8.5C13 9.32843 13.6716 10 14.5 10Z" fill="white" />
        <path d="M18 5L20 3M6 5L4 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const Bot4 = ({ color }: { color: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="16" height="12" rx="2" fill={color} />
        <path d="M8 8V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V8" fill="#94a3b8" />
        <circle cx="12" cy="14" r="3" fill="#1e293b" />
        <path d="M12 12.5V15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const HatAccessory = () => <path d="M12 2L4 8h16L12 2z" fill="#334155" transform="translate(0, -2)" />;
export const ShadesAccessory = () => (
    <>
        <rect x="6" y="6" width="4" height="2" rx="1" fill="black" />
        <rect x="14" y="6" width="4" height="2" rx="1" fill="black" />
        <path d="M10 7h4" stroke="black" strokeWidth="0.5" />
    </>
);

export const AIBasicsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-400" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 12h.01" /><path d="M16 12h.01" /><path d="M12 16h.01" /><path d="M16 16h.01" /><path d="M8 12h.01" /><path d="M8 16h.01" /></svg>;
export const PromptProdigyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9Z" /><path d="M12 12v-2" /><path d="M12 16v.01" /></svg>;
export const DeepfakeDetectiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><path d="M15.5 12c-3.5 0-7 2.5-7 6" /><path d="M16 8c-3 0-5.5 2-5.5 5" /><path d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5" /><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /></svg>;
export const AIEthicsChampionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
export const DataPrivacyDefenderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
export const ModelGlitchGuardianIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400"><path d="m12 12-2-2 2-2 2 2-2 2Z" /><path d="M18.5 18.5 16 16" /><path d="m5.5 5.5 2.5 2.5" /><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" /><path d="M12 8v1" /><path d="M12 15v1" /><path d="M16 12h-1" /><path d="M9 12H8" /></svg>;
export const HallucinationHunterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /><path d="M22 10a3 3 0 0 0-3-3h-2" /></svg>;
export const AICreativityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400"><path d="M15.23 5.42a4.5 4.5 0 0 1 6.36 6.36" /><path d="M12 13.5a2.5 2.5 0 0 0-3.54 3.54" /><path d="M14.5 9.5a2.5 2.5 0 0 0-3.54 3.54" /><path d="M8.5 15.5a2.5 2.5 0 0 0-3.54 3.54" /><path d="M16.4 11.23a4.5 4.5 0 1 1-6.36-6.36c.28.28.53.58.76.9" /><path d="M12 22a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2Z" /></svg>;

export const AIBasicsBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4l2 1" /><path d="M12 12H8" /></svg>;
export const PromptProdigyBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M14 9.5 12 12l-2-2.5" /><path d="m12 16-2-2.5 2-2.5 2 2.5Z" /></svg>;
export const DeepfakeDetectiveBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="12" r="3" /><path d="M12 15s2-1 2-3" /></svg>;
export const AIEthicsChampionBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
export const DataPrivacyDefenderBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M12 9V7a2 2 0 0 0-4 0v2" /></svg>;
export const ModelGlitchGuardianBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9.5 14.5 5-5" /><path d="m14.5 14.5-5-5" /></svg>;
export const HallucinationHunterBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>;
export const AICreativityBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 10a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3z" /><path d="M12 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>;

export const SealIcon = () => <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,16.5L18,9.5L16.5,8L11,13.5L7.5,10L6,11.5L11,16.5Z" /></svg>;

export const RLIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m4.93 4.93 2.83 2.83" /><path d="M2 12h4" /><path d="m4.93 19.07 2.83-2.83" /><path d="M12 22v-4" /><path d="m19.07 19.07-2.83-2.83" /><path d="M22 12h-4" /><path d="m19.07 4.93-2.83 2.83" /><circle cx="12" cy="12" r="4" /></svg>;
export const HealthcareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-400" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M12 5v14" /><path d="M7 10h10" /></svg>;
export const EthicsAdvIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-yellow-400" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /><path d="M16 8a4 4 0 0 0-8 0" /></svg>;

export const RLBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="12" r="3" /><path d="M12 9v3l2 1" /></svg>;
export const HealthcareBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>;
export const EthicsAdvBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 11v4" /><path d="M12 7h.01" /></svg>;

export const EnvironmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" /><path d="M7 9c.5 0 1 .5 1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1-1 .5-1 1" /><path d="M14 15c.5 0 1 .5 1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1-1 .5-1 1" /><path d="M12 12c2-2 4-2 6 0" /><path d="M6 12c2 2 4 2 6 0" /></svg>;
export const EnvironmentBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 7v10" /><path d="M8 12c2-2 4-2 8 0" /></svg>;

export const ComputerVisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-400" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /></svg>;
export const NLPIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-400" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h8" /><path d="M8 13h6" /></svg>;
export const RoboticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><path d="M8 17h8" /><path d="M8 20h8" /></svg>;
export const DataScienceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-lime-400" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>;

export const ComputerVisionBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><rect x="8" y="8" width="8" height="6" rx="1" /></svg>;
export const NLPBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M17 8h-1v8" /><path d="M12 8h.01" /></svg>;
export const RoboticsBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 9h6" /><path d="M12 9v6" /></svg>;
export const DataScienceBadge = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>;
