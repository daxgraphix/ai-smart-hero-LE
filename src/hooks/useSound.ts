import { useCallback, useRef, useState } from 'react';
import * as Tone from 'tone';

export const useSound = () => {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const sounds = useRef<Record<string, any> | null>(null);

    const initSoundEngine = useCallback(async () => {
        if (sounds.current) return;
        try {
            await Tone.start();
            sounds.current = {
                click: new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 } }).toDestination(),
                correct: new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.005, decay: 0.2, sustain: 0.1, release: 0.2 } }).toDestination(),
                incorrect: new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.1 } }).toDestination(),
                complete: new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 } }).toDestination(),
                purchase: new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.8, release: 0.2 } }).toDestination(),
                timer: new Tone.MembraneSynth().toDestination(),
                fail: new Tone.Synth({ oscillator: { type: "sawtooth" }, envelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.1 } }).toDestination(),
            };
        } catch (e) {
            console.error("Audio engine failed to initialize.", e);
            setSoundEnabled(false);
        }
    }, []);

    const playSound = useCallback((sound: string, note: string, duration: string = '8n') => {
        if (soundEnabled && sounds.current && sounds.current[sound]) {
            sounds.current[sound].triggerAttackRelease(note, duration);
        }
    }, [soundEnabled]);

    return { soundEnabled, setSoundEnabled, initSoundEngine, playSound };
};
