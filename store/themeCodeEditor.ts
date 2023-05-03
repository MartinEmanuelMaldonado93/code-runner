import { create } from 'zustand';
import { ThemeOption } from '@types';
import {
	defaultCodeEditorWhite,
} from '@constants';

interface ThemeStore {
	themeCode: ThemeOption,
	setThemeCode: (newTheme: ThemeOption) => void
}
export const useStoreThemeCode = create<ThemeStore>()(set => ({
	themeCode: defaultCodeEditorWhite,
	setThemeCode: (newThemeCode: ThemeOption) => set(() => ({ themeCode: newThemeCode }))
}))