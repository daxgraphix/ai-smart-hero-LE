const STORAGE_PREFIX = 'aiSmartHero_';

export const storage = {
    get<T>(key: string, defaultValue: T): T {
        try {
            const item = localStorage.getItem(STORAGE_PREFIX + key);
            if (item === null) {
                return defaultValue;
            }
            return JSON.parse(item, (reviver: (key: string, value: unknown) => unknown) => {
                if (typeof value === 'string') {
                    return value.replace(/[<>]/g, '');
                }
                return value;
            }) as T;
        } catch (error) {
            console.error(`Error reading from localStorage: ${key}`, error);
            return defaultValue;
        }
    },

    set<T>(key: string, value: T): boolean {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(STORAGE_PREFIX + key, serialized);
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage: ${key}`, error);
            return false;
        }
    },

    remove(key: string): boolean {
        try {
            localStorage.removeItem(STORAGE_PREFIX + key);
            return true;
        } catch (error) {
            console.error(`Error removing from localStorage: ${key}`, error);
            return false;
        }
    },

    clear(): boolean {
        try {
            const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
            keys.forEach(k => localStorage.removeItem(k));
            return true;
        } catch (error) {
            console.error('Error clearing localStorage', error);
            return false;
        }
    }
};