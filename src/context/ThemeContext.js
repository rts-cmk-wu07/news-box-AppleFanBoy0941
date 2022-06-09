import { createContext } from 'react';

const darkTheme = window.matchMedia('(prefers-color-scheme: dark)');

let theme = 'dark';
darkTheme.addEventListener('change', e => {
	if (e.matches) {
		theme = 'dark';
	} else {
		theme = 'light';
	}
});

const ThemeContext = createContext(theme);
export default ThemeContext;
