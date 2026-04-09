const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 20;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const sanitizeInput = (input: string): string => {
    return input.replace(/[<>]/g, '').trim();
};

export const validateUsername = (username: string): ValidationResult => {
    const sanitized = sanitizeInput(username);
    
    if (!sanitized) {
        return { isValid: false, error: 'Username is required' };
    }
    
    if (sanitized.length < USERNAME_MIN_LENGTH) {
        return { isValid: false, error: `Username must be at least ${USERNAME_MIN_LENGTH} characters` };
    }
    
    if (sanitized.length > USERNAME_MAX_LENGTH) {
        return { isValid: false, error: `Username must be less than ${USERNAME_MAX_LENGTH} characters` };
    }
    
    if (!USERNAME_REGEX.test(sanitized)) {
        return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
    }
    
    return { isValid: true };
};

export const validateNumber = (value: unknown, min: number, max: number): number => {
    const num = Number(value);
    if (isNaN(num) || num < min || num > max) {
        return min;
    }
    return num;
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};