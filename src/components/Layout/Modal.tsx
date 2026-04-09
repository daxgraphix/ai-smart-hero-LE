import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className={`bg-slate-800 rounded-2xl w-11/12 max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-700 transition-all duration-300 modal-enter`}>
                <header className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        {icon && <div className="w-8 h-8">{icon}</div>}
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-300 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </header>
                <main className="p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
