import { create } from 'zustand';
import { LanguageData } from '@types';
import {
	languageOptions,
} from '@constants';

interface LanguageStore {
	language: LanguageData,
	setLanguage: (newLanguage: LanguageData) => void
}
export const useStoreLanguage = create<LanguageStore>()(set => ({
	language: languageOptions[0],
	setLanguage: (newLanguage: LanguageData) => set(() => ({ language: newLanguage }))
}))