import { Outlet } from 'react-router';
import './App.css';
import ThemeContext from './context/ThemeContext';
import { useState } from 'react';
import ThemeSwitchContext from './context/ThemeSwitchContext';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { variables } from './variables/variables';
import Navbar from './components/Navbar';
import MenuContext from './context/MenuContext';
import ActiveSectionContext from './context/ActiveSectionContext';
import SearchContext from './context/SearchContext';
import Tutorial from './templates/Tutorial';
import tutorial from './content/tutorialSteps';

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

	const activeSectionsLS = JSON.parse(localStorage.getItem('activeSections'));

	const sections = [
		'World',
		'U.S.',
		'New York',
		'Politics',
		'Business',
		'Opinion',
		'Technology',
		'Science',
		'Health',
		'Style',
		'Travel',
		'Sports',
		'Arts',
		'Books',
		'Food',
		'Magazine',
		'T Magazine',
		'Real Estate',
		'Video',
		'Gameplay',
		'Theater',
		'Well',
	];

	const sectionListLS = JSON.parse(localStorage.getItem('sectionList'));
	const [sectionList, setSectionList] = useState(
		sectionListLS || sections.sort()
	);

	const [activeSections, setActiveSections] = useState(
		activeSectionsLS || sectionList
	);

	const [searchQ, setSearchQ] = useState('');

	const tutorialLS = localStorage.getItem('tutorial');
	const [currentStep, setCurrentStep] = useState(tutorialLS || 0);

	return (
		<div className="App" css={styles.container}>
			<ThemeSwitchContext.Provider value={{ themeSwitch, setThemeSwitch }}>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<MenuContext.Provider value={{ menu, setMenu }}>
						<ActiveSectionContext.Provider
							value={{
								sections: { sectionList, activeSections },
								actions: { setSectionList, setActiveSections },
							}}
						>
							<SearchContext.Provider value={{ searchQ, setSearchQ }}>
								<Tutorial
									step={tutorial}
									currentStep={currentStep}
									setCurrentStep={setCurrentStep}
								/>
								<Navbar setCurrentStep={setCurrentStep} />
								<div>
									<Outlet />
								</div>
							</SearchContext.Provider>
						</ActiveSectionContext.Provider>
					</MenuContext.Provider>
				</ThemeContext.Provider>
			</ThemeSwitchContext.Provider>
		</div>
	);
}

export default App;
