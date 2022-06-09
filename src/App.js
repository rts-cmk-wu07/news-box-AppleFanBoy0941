import { Outlet } from 'react-router';
import './App.css';
import ThemeContext from './context/ThemeContext';
import { useState } from 'react';
import ThemeSwitchContext from './context/ThemeSwitchContext';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { variables } from './variables/variables';

function App() {
	const [themeSwitch, setThemeSwitch] = useState('automatic');
	const darkTheme = window.matchMedia('(prefers-color-scheme: dark)');
	let systemIsDark = darkTheme.matches;
	let system;
	if (systemIsDark) {
		system = 'dark';
	} else {
		system = 'light';
	}

	const [theme, setTheme] = useState(system);

	const styles = {
		container: css`
			min-height: 100vh;
			background: ${theme === 'dark'
				? variables.dark.secondary_1
				: variables.light.secondary_1};
			color: ${theme === 'dark'
				? variables.dark.text_1
				: variables.light.text_1};
		`,
	};

	darkTheme.addEventListener('change', e => {
		if (e.matches) {
			themeSwitch !== 'automatc' && setTheme('dark');
		} else {
			themeSwitch !== 'automatc' && setTheme('light');
		}
	});

	return (
		<div className="App" css={styles.container}>
			<ThemeSwitchContext.Provider value={{ themeSwitch, setThemeSwitch }}>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<div>
						<Outlet />
					</div>
				</ThemeContext.Provider>
			</ThemeSwitchContext.Provider>
		</div>
	);
}

export default App;
