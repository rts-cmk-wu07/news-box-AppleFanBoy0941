import { Outlet } from 'react-router';
import './App.css';
import ThemeContext from './context/ThemeContext';
import { useState } from 'react';

function App() {
	const darkTheme = window.matchMedia('(prefers-color-scheme: dark)');

	const systemIsDark = true;
	darkTheme.addEventListener('change', e => {
		if (e.matches) {
			systemIsDark = true;
		} else {
			systemIsDark = false;
		}
	});

	const [theme, setTheme] = useState(systemIsDark);

	return (
		<div className="App">
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<div>
					<Outlet />
				</div>
			</ThemeContext.Provider>
		</div>
	);
}

export default App;
