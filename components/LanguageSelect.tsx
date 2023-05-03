import React, { useId } from 'react';
import { languageOptions, languageDropdownStyle } from '@constants';
import Select from 'react-select';
import { useStoreLanguage } from '@store';

const CodeEditorLanguages = () => {
	const state = useStoreLanguage();
	return (
		<Select
			instanceId={useId()}
			placeholder='Filter By Category'
			isSearchable={true}
			isClearable={true}
			options={languageOptions}
			value={state.language}
			onChange={(selectedOption) => {
				if (!selectedOption) return;
				state.setLanguage(selectedOption);
			}}
			styles={languageDropdownStyle}
		/>
	);
};

export { CodeEditorLanguages as LanguagesDropdown };
