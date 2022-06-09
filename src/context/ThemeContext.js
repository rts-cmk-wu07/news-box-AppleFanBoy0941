import { createContext } from 'react';

const darkTheme = window.matchMedia('(prefers-color-scheme: dark)');

const systemIsDark = true;
darkTheme.addEventListener('change', e => {
	if (e.matches) {
		systemIsDark = true;
	} else {
		systemIsDark = false;
	}
});

const ThemeContext = createContext(systemIsDark);
export default ThemeContext;
