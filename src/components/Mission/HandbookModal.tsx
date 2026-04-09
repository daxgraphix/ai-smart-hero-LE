import React from 'react';
import { missions } from '../../constants/missions';

export const HandbookModal: React.FC = () => (
    <div className="space-y-6">
        {Object.values(missions).map(mission => (
            <details key={mission.id} className="bg-slate-700/50 p-4 rounded-lg group">
                <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none">
                    <span>{mission.title}</span>
                    <span className="text-sky-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 space-y-4 border-t border-slate-600 pt-4">
                    <p className="text-slate-300 italic">{mission.description}</p>
                    <div className="grid gap-3">
                        {mission.training.flashcards.map(card => (
                            <div key={card.term} className="bg-slate-800/50 p-3 rounded border border-slate-700">
                                <strong className="text-sky-300 block mb-1">{card.term}</strong>
                                <span className="text-slate-200 text-sm">{card.definition}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </details>
        ))}
    </div>
);
