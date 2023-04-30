import { LanguagesDropdown } from './LanguageSelect';
import { ThemeEditorDropdown } from './ThemeCodeSelect';
import { ThemePage } from './ThemePage';

type props = {
	children?: JSX.Element | JSX.Element[];
};
function NavbarCodeEditor({ children }: props) {
	return (
		<div className='navbar flex-wrap justify-center min-h-max sm:h-full text-xl normal-case gap-2 bg-base-200 '>
			<div className='w-full sm:w-auto grow select-none font-bold'>
				{' '}
				{'{'} Code Runner ⚡ {'}'}
			</div>
			<div className='btn-group'>
				<button className='btn'>«</button>
				<button className='btn'>Page 1</button>
				<button className='btn'>»</button>
			</div>
			<LanguagesDropdown />
			<ThemePage />
			<ThemeEditorDropdown />
		</div>
	);
}
export default NavbarCodeEditor;
