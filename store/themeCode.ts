import { create } from 'zustand';
import { LanguageData, ThemeOption, DataOutput } from '@types';
import {
	defaultWhiteTheme,
} from '@constants';

interface ThemeStore {
	themeCode: ThemeOption,
	setThemeCode: (newTheme: ThemeOption) => void
}
export const useStoreThemeCode = create<ThemeStore>()(set => ({
	themeCode: defaultWhiteTheme,
	setThemeCode: (newThemeCode: ThemeOption) => set(() => ({ themeCode: newThemeCode }))
}))