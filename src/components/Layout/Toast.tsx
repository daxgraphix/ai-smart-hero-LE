import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
    id: number;
    message: string;
    icon: 'success' | 'error' | 'info';
}

interface ToastProps {
    message: ToastMessage;
    onDismiss: (id: number) => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(message.id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [message, onDismiss]);

    const icons = {
        success: <CheckCircle className="text-green-400" />,
        error: <XCircle className="text-red-400" />,
        info: <Info className="text-blue-400" />,
    };

    return (
        <div className="toast bg-slate-800 border border-slate-700 shadow-lg rounded-lg p-4 flex items-center gap-3 w-full">
            <div>{icons[message.icon]}</div>
            <p className="text-slate-200 text-sm">{message.message}</p>
            <button onClick={() => onDismiss(message.id)} className="ml-auto text-slate-400 hover:text-white transition-colors">
                <X size={18} />
            </button>
        </div>
    );
};
