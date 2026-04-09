import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { GameWrapper } from './GameWrapper';

interface Rules {
    needsSubject?: string;
    needsTone?: string;
    needsFormat?: string;
    needsConstraint?: string;
}

interface Challenge {
    scenario: string;
    rules: Rules;
}

interface Props {
    challenges: Challenge[];
    onComplete: (score: number, total: number) => void;
    playSound: (sound: string, note: string) => void;
    title: string;
    timeLimit: number;
}

export const PromptCheckerGame: React.FC<Props> = ({ challenges, onComplete, playSound, title, timeLimit }) => {
    const [cIndex, setCIndex] = useState(0);
    const [prompt, setPrompt] = useState('');
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    onComplete(cIndex, challenges.length);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, onComplete, cIndex, challenges]);
    
    const challenge = challenges[cIndex];
    const rules = challenge.rules;
    
    useEffect(() => {
        const checks: Record<string, boolean> = {};
        const lowerPrompt = prompt.toLowerCase();
        checks.subject = rules.needsSubject ? lowerPrompt.includes(rules.needsSubject.toLowerCase()) : true;
        checks.tone = rules.needsTone ? lowerPrompt.includes(rules.needsTone.toLowerCase()) : true;
        checks.format = rules.needsFormat ? lowerPrompt.includes(rules.needsFormat.toLowerCase()) : true;
        checks.constraint = rules.needsConstraint ? lowerPrompt.includes(rules.needsConstraint.toLowerCase()) : true;
        setFeedback(checks);
    }, [prompt, rules]);

    const allRulesMet = Object.values(feedback).every(Boolean);

    const handleSubmit = () => {
        playSound('correct', 'G5');
        if (cIndex + 1 < challenges.length) {
            setCIndex(i => i + 1);
            setPrompt('');
        } else {
            setIsActive(false);
            onComplete(challenges.length, challenges.length);
        }
    };
    
    const renderRule = (text: string, isMet: boolean) => (
        <li className={`flex items-center gap-2 transition-colors ${isMet ? 'text-green-400' : 'text-slate-400'}`}>
            {isMet ? <CheckCircle size={16} /> : <div className="w-4 h-4 rounded-full border border-slate-500" />}
            {text}
        </li>
    );

    return (
        <GameWrapper title={title} score={cIndex} total={challenges.length} timeLeft={timeLeft} maxTime={timeLimit}>
            <h4 className="text-lg text-slate-200 mb-4 text-center">{challenge.scenario}</h4>
            <div className="my-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="font-semibold mb-2 text-sky-300">Requirements:</p>
                <ul className="space-y-1">
                    {rules.needsSubject && renderRule(`Mention the subject: '${rules.needsSubject}'`, feedback.subject)}
                    {rules.needsTone && renderRule(`Include the tone: '${rules.needsTone}'`, feedback.tone)}
                    {rules.needsFormat && renderRule(`Specify the format: '${rules.needsFormat}'`, feedback.format)}
                    {rules.needsConstraint && renderRule(`Add the constraint: '${rules.needsConstraint}'`, feedback.constraint)}
                </ul>
            </div>
            <textarea 
                value={prompt} 
                onChange={e => setPrompt(e.target.value)} 
                className="w-full p-3 h-24 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:border-sky-500 outline-none transition-colors" 
                placeholder="Type your prompt here..." 
            />
            <div className="text-center mt-6">
                <button 
                    onClick={handleSubmit} 
                    disabled={!allRulesMet} 
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 btn-press disabled:opacity-50"
                >
                    Submit
                </button>
            </div>
        </GameWrapper>
    );
};
