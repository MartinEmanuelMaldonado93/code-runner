import { create } from 'zustand';
import { ThemeOption } from '@types';
import {
	defaultPureDark,
} from '@constants';

interface ThemeStore {
	themeCode: ThemeOption,
	setThemeCode: (newTheme: ThemeOption) => void
}
export const useStoreThemeCode = create<ThemeStore>()(set => ({
	themeCode: defaultPureDark,
	setThemeCode: (newThemeCode: ThemeOption) => set(() => ({ themeCode: newThemeCode }))
}))