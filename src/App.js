import { Outlet } from 'react-router';
import './App.css';
import ThemeContext from './context/ThemeContext';
import { useRef, useState, useCallback } from 'react';
import ThemeSwitchContext from './context/ThemeSwitchContext';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { variables } from './variables/variables';
import Navbar from './components/Navbar';
import MenuContext from './context/MenuContext';

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
				? variables.dark.text_3
				: variables.light.text_3};
			color: ${theme === 'dark'
				? variables.dark.text_1
				: variables.light.text_1};
		`,
	};

	darkTheme.addEventListener('change', e => {
		if (e.matches) {
			themeSwitch === 'automatic' ? setTheme('dark') : setTheme(themeSwitch);
		} else {
			themeSwitch === 'automatic' ? setTheme('light') : setTheme(themeSwitch);
		}
	});

	const [menu, setMenu] = useState(false);

	return (
		<div className="App" css={styles.container}>
			<ThemeSwitchContext.Provider value={{ themeSwitch, setThemeSwitch }}>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<MenuContext.Provider value={{ menu, setMenu }}>
						<Navbar />
						<div>
							<Outlet />
						</div>
					</MenuContext.Provider>
				</ThemeContext.Provider>
			</ThemeSwitchContext.Provider>
		</div>
	);
}

export default App;
