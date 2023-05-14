import { create } from 'zustand';
import { ThemeOption } from '@types';
import { defaultBrilliantDark } from '@constants';

interface ThemePageStore {
	theme: ThemeOption,
	setTheme: (newTheme: ThemeOption) => void
}
export const useStoreThemePage = create<ThemePageStore>()(set => ({
	theme: defaultBrilliantDark,
	setTheme: (newTheme: ThemeOption) => set(() => ({ theme: newTheme }))
}))