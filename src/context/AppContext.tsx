import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';
import { missions } from '../constants/missions';
import { storage } from '../utils/storage';
import { validateUsername } from '../utils/validation';

const PROFILE_KEY = 'profile';

interface AppState {
    profile: UserProfile | null;
    isLoading: boolean;
    isInitialized: boolean;
}

type AppAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'INIT_PROFILE'; payload: UserProfile }
    | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
    | { type: 'SET_INITIALIZED' };

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
        theme: 'dark',
        soundEnabled: true
    }
};

const initialState: AppState = {
    profile: null,
    isLoading: true,
    isInitialized: false
};

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'INIT_PROFILE':
            return { ...state, profile: action.payload, isLoading: false, isInitialized: true };
        case 'UPDATE_PROFILE':
            return state.profile
                ? { ...state, profile: { ...state.profile, ...action.payload } }
                : state;
        case 'SET_INITIALIZED':
            return { ...state, isInitialized: true };
        default:
            return state;
    }
}

interface AppContextValue extends AppState {
    updateProfile: (updates: Partial<UserProfile>) => void;
    saveProfile: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        const savedProfile = storage.get<UserProfile>(PROFILE_KEY, defaultProfile);
        dispatch({ type: 'INIT_PROFILE', payload: savedProfile });
    }, []);

    useEffect(() => {
        if (state.profile && state.isInitialized) {
            storage.set(PROFILE_KEY, state.profile);
        }
    }, [state.profile, state.isInitialized]);

    const updateProfile = useCallback((updates: Partial<UserProfile>) => {
        dispatch({ type: 'UPDATE_PROFILE', payload: updates });
    }, []);

    const saveProfile = useCallback(() => {
        if (state.profile) {
            storage.set(PROFILE_KEY, state.profile);
        }
    }, [state.profile]);

    return (
        <AppContext.Provider value={{ ...state, updateProfile, saveProfile }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextValue => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};