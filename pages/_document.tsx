import { useStoreThemePage } from '@store';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	const stateThemePage = useStoreThemePage();
	
	return (
		<Html>
			<Head />
			<body data-theme={stateThemePage.theme.label ?? 'dark'}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
