import { LS_KEYS, defaultCodeEditorDark } from '@constants';
import { useLocalStorage } from '@hooks';
import { useStoreThemePage } from '@store';
import { Html, Head, Main, NextScript } from 'next/document';
import { useEffect, useState } from 'react';

export default function Document() {
	return (
		<Html>
			<Head />
			<body id='body'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
