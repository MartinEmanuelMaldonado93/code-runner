import { create } from 'zustand';
import { LanguageData, ThemeOption, DataOutput } from '@types';
import {
	languageOptions,
} from '@constants';

const useStore = create((set) => ({
	bears: 0,
	increasePopulation: () => set((state: { bears: number; }) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
}));

interface LanguageStore {
	language: LanguageData,
	setLanguage: (newLanguage: LanguageData) => void
}
export const useStoreLanguage = create<LanguageStore>()(set => ({
	language: languageOptions[0],
	setLanguage: (newLanguage: LanguageData) => set((state) => ({ language: state.language}))
}))