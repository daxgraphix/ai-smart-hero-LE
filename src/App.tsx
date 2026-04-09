import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { AnimatePresence } from 'motion/react';
import { RotateCcw, Shield, Book, Loader2 } from 'lucide-react';

import { UserProfile } from './types';
import { ToastMessage } from './components/Layout/Toast';
import { missions } from './constants/missions';
import { useSound } from './hooks/useSound';
import { storage } from './utils/storage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { sanitizeInput, validateUsername } from './utils/validation';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import { SplashScreen } from './components/Screens/SplashScreen';
import { LoginScreen } from './components/Screens/LoginScreen';
import { AvatarScreen } from './components/Screens/AvatarScreen';
import { WelcomeScreen } from './components/Screens/WelcomeScreen';
import { CertificateScreen } from './components/Screens/CertificateScreen';

import { SidebarContent } from './components/Layout/Sidebar';
import { Modal } from './components/Layout/Modal';
import { Toast } from './components/Layout/Toast';
import { MissionModal } from './components/Mission/MissionModal';
import { GuardianHQModal } from './components/Mission/GuardianHQModal';
import { HandbookModal } from './components/Mission/HandbookModal';

const Dashboard = lazy(() => import('./components/Screens/Dashboard').then(m => ({ default: m.Dashboard })));

type Screen = 'splash' | 'login' | 'avatar' | 'welcome' | 'dashboard' | 'certificate';
type ModalType = 'mission' | 'hq' | 'handbook' | 'reset' | null;

const defaultProfile: UserProfile = {
    username: null,
    avatarId: null,
    colorId: 'default',
    totalPoints: 0,
    missionProgress: Object.keys(missions).reduce((acc, missionId) => {
        acc[missionId] = { knowledge: false, training: false, challenge: false, stars: 0 };
        return acc;
    }, {} as Record<string, any>),
    badges: [],
    unlockedItems: ['default', 'none'],
    equipped: { color: 'default', accessory: 'none' },
    settings: {
        soundEnabled: true
    }
};

const LoadingFallback: React.FC = () => (
    <div className="screen flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-sky-400 animate-spin" />
    </div>
);

const AppContent: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('splash');
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [currentMissionId, setCurrentMissionId] = useState<string | null>(null);
    const [lastCompleted, setLastCompleted] = useState<string | null>(null);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);

    const { soundEnabled, setSoundEnabled, initSoundEngine, playSound } = useSound();

    const addToast = useCallback((message: string, icon: 'success' | 'error' | 'info' = 'info') => {
        const id = Date.now() + Math.random();
        setToasts(t => [...t, { id, message, icon }]);
        setTimeout(() => {
            setToasts(t => t.filter(toast => toast.id !== id));
        }, 4000);
    }, []);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const savedProfile = storage.get<UserProfile>('profile', null);
                if (savedProfile) {
                    const validation = validateUsername(savedProfile.username || '');
                    if (validation.isValid) {
                        setProfile({ ...defaultProfile, ...savedProfile });
                        setSoundEnabled(savedProfile.settings?.soundEnabled ?? true);
                    }
                }
            } catch (error) {
                console.error('Failed to load profile:', error);
            } finally {
                setIsLoading(false);
                setIsProfileLoaded(true);
            }
        };
        loadProfile();
    }, [setSoundEnabled]);

    useEffect(() => {
        if (isProfileLoaded) {
            storage.set('profile', profile);
        }
    }, [profile, isProfileLoaded]);

    const toggleSound = useCallback(() => {
        const newState = !soundEnabled;
        setSoundEnabled(newState);
        setProfile(p => ({
            ...p,
            settings: { ...p.settings, soundEnabled: newState }
        }));
        if (newState) playSound('click', 'C4');
    }, [soundEnabled, setSoundEnabled, playSound]);

    const handleReset = () => {
        playSound('fail', 'C3');
        setActiveModal('reset');
    };
    
    const confirmReset = () => {
        storage.clear();
        window.location.reload();
    };

    const handleStartJourney = () => {
        initSoundEngine();
        playSound('click', 'C4');
        profile.username ? setScreen('dashboard') : setScreen('login');
    };
    
    const handleLogin = (username: string) => {
        playSound('click', 'D4');
        setProfile(p => ({ ...p, username }));
        setScreen('avatar');
    };

    const handleAvatarConfirm = () => {
        playSound('click', 'G4');
        setScreen('welcome');
    };
    
    const handleStartAdventure = () => {
        playSound('click', 'A4');
        setScreen('dashboard');
    };

    const handleMissionComplete = (missionId: string) => {
        setLastCompleted(missionId);
        const mission = missions[missionId];
        addToast(`Badge Unlocked: ${mission.badgeName}!`, 'success');
        setTimeout(() => setLastCompleted(null), 3000);
    };

    useEffect(() => {
        const allMissions = Object.keys(missions);
        if (profile.badges.length === allMissions.length && profile.badges.length > 0 && screen === 'dashboard') {
            setTimeout(() => setScreen('certificate'), 1500);
        }
    }, [profile.badges, screen]);

    const updateProfile = useCallback((updater: (p: UserProfile) => UserProfile) => {
        setProfile(updater);
    }, []);

    const dismissToast = useCallback((id: number) => {
        setToasts(t => t.filter(toast => toast.id !== id));
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-sky-400 animate-spin" />
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="min-h-screen gradient-bg transition-colors duration-500 relative w-full h-full overflow-hidden">
                <div id="grid-pattern" />
                
                <div className={`w-full h-full ${screen === 'dashboard' ? 'lg:grid lg:grid-cols-[250px_1fr] p-0 sm:p-6 lg:p-8 gap-6' : ''}`}>
                    {screen === 'dashboard' && (
                        <aside className='hidden lg:flex flex-col bg-slate-900/50 backdrop-blur-sm dark:bg-slate-900/50 rounded-2xl border border-slate-700 dark:border-slate-700 p-6'>
                            <SidebarContent 
                                profile={profile}
                                soundEnabled={soundEnabled}
                                toggleSound={toggleSound}
                                handleReset={handleReset}
                                openHQ={() => setActiveModal('hq')}
                                openHandbook={() => setActiveModal('handbook')}
                            />
                        </aside>
                    )}
                    
                    <AnimatePresence mode="wait">
                        {screen === 'splash' && <SplashScreen key="splash" onStart={handleStartJourney} />}
                        {screen === 'login' && <LoginScreen key="login" onLogin={handleLogin} />}
                        {screen === 'avatar' && <AvatarScreen key="avatar" onConfirm={handleAvatarConfirm} onBack={() => setScreen('login')} profile={profile} onProfileChange={setProfile} playSound={playSound} />}
                        {screen === 'welcome' && <WelcomeScreen key="welcome" profile={profile} onStart={handleStartAdventure} onBack={() => setScreen('avatar')} />}
                        {screen === 'dashboard' && (
                            <Suspense key="dashboard" fallback={<LoadingFallback />}>
                                <Dashboard 
                                    profile={profile} 
                                    onOpenMission={(id) => { setCurrentMissionId(id); setActiveModal('mission'); }} 
                                    openSidebar={() => setSidebarOpen(true)} 
                                    lastCompleted={lastCompleted} 
                                />
                            </Suspense>
                        )}
                        {screen === 'certificate' && <CertificateScreen key="certificate" profile={profile} onPlayAgain={() => window.location.reload()} playSound={playSound} />}
                    </AnimatePresence>
                </div>

                {/* Mobile Sidebar */}
                <div 
                    onClick={() => setSidebarOpen(false)} 
                    className={`fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                />
                <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 dark:bg-slate-900 border-r border-slate-700 dark:border-slate-700 z-40 lg:hidden transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SidebarContent 
                        profile={profile}
                        soundEnabled={soundEnabled}
                        toggleSound={toggleSound}
                        handleReset={handleReset}
                        openHQ={() => { setActiveModal('hq'); setSidebarOpen(false); }}
                        openHandbook={() => { setActiveModal('handbook'); setSidebarOpen(false); }}
                    />
                </aside>

                {/* Modals */}
                <Modal 
                    isOpen={activeModal === 'mission'} 
                    onClose={() => setActiveModal(null)} 
                    title={currentMissionId ? missions[currentMissionId].title : ''}
                    icon={currentMissionId ? missions[currentMissionId].icon : null}
                >
                    {currentMissionId && (
                        <MissionModal 
                            mission={missions[currentMissionId]} 
                            profile={profile} 
                            onClose={() => setActiveModal(null)} 
                            onUpdateProfile={updateProfile} 
                            playSound={playSound} 
                            onMissionComplete={handleMissionComplete} 
                        />
                    )}
                </Modal>

                <Modal isOpen={activeModal === 'hq'} onClose={() => setActiveModal(null)} title="Ally HQ" icon={<Shield className="text-purple-400" />}>
                    <GuardianHQModal profile={profile} onUpdateProfile={updateProfile} playSound={playSound} />
                </Modal>

                <Modal isOpen={activeModal === 'handbook'} onClose={() => setActiveModal(null)} title="AI Handbook" icon={<Book className="text-sky-400" />}>
                    <HandbookModal />
                </Modal>

                <Modal isOpen={activeModal === 'reset'} onClose={() => setActiveModal(null)} title="Are you sure?" icon={<RotateCcw className="text-red-400" />}>
                    <div className="text-center">
                        <p className="text-lg mb-6">Are you sure you want to reset all your progress? This can't be undone!</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setActiveModal(null)} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Cancel</button>
                            <button onClick={confirmReset} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Confirm Reset</button>
                        </div>
                    </div>
                </Modal>

                {/* Toasts */}
                <div className="fixed bottom-5 right-5 z-[60] w-full max-w-xs sm:max-w-sm space-y-3">
                    <AnimatePresence>
                        {toasts.map(toast => (
                            <Toast key={toast.id} message={toast} onDismiss={dismissToast} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}