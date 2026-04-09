import { HatAccessory, ShadesAccessory } from '../components/Icons';

export const avatarsInfo = [
    { id: 'bot1' }, { id: 'bot2' }, { id: 'bot3' }, { id: 'bot4' }
];

export const customizations = {
    colors: [
        { id: 'default', value: '#38bdf8', dark: '#0ea5e9', cost: 0 },
        { id: 'red', value: '#f87171', dark: '#ef4444', cost: 100 },
        { id: 'green', value: '#4ade80', dark: '#22c55e', cost: 100 },
        { id: 'purple', value: '#c084fc', dark: '#a855f7', cost: 100 },
        { id: 'yellow', value: '#facc15', dark: '#eab308', cost: 150 },
        { id: 'pink', value: '#f472b6', dark: '#ec4899', cost: 150 },
        { id: 'teal', value: '#2dd4bf', dark: '#14b8a6', cost: 150 },
    ],
    accessories: [
        { id: 'none', name: 'None', component: () => null, cost: 0 },
        { id: 'hat', name: 'Cap', component: HatAccessory, cost: 200 },
        { id: 'glasses', name: 'Shades', component: ShadesAccessory, cost: 250 }
    ]
};
