import { create } from 'zustand';
import { ThemeOption, DataOutput } from '@types';
import {
	defaultWhiteTheme,
} from '@constants';

interface ThemePageStore {
	theme: ThemeOption,
	setTheme: (newTheme: ThemeOption) => void
}
export const useStoreThemePage = create<ThemePageStore>()(set => ({
	theme: defaultWhiteTheme,
	setTheme: (newTheme: ThemeOption) => set(() => ({ theme: newTheme }))
}))