import { Outlet } from 'react-router';
import './App.css';
import ThemeContext from './context/ThemeContext';
import { useState } from 'react';
import ThemeSwitchContext from './context/ThemeSwitchContext';

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

	darkTheme.addEventListener('change', e => {
		if (e.matches) {
			themeSwitch !== 'automatc' && setTheme('dark');
		} else {
			themeSwitch !== 'automatc' && setTheme('light');
		}
	});

	return (
		<div className="App">
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
