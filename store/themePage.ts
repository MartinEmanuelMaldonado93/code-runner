import { create } from 'zustand';
import { ThemeOption, DataOutput } from '@types';
import {
	defaultCodeEditorWhite,
} from '@constants';

interface ThemePageStore {
	theme: ThemeOption,
	setTheme: (newTheme: ThemeOption) => void
}
export const useStoreThemePage = create<ThemePageStore>()(set => ({
	theme: defaultCodeEditorWhite,
	setTheme: (newTheme: ThemeOption) => set(() => ({ theme: newTheme }))
}))