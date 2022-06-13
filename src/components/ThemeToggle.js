/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FeatherIcon from 'feather-icons-react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import ThemeSwitchContext from '../context/ThemeSwitchContext';

const ThemeToggle = () => {
	const themeSwitchContext = useContext(ThemeSwitchContext);
	const { themeSwitch, setThemeSwitch } = themeSwitchContext;
	const context = useContext(ThemeContext);
	const theme = context.theme;
	const setTheme = context.setTheme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		button: css`
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;
			padding: 0.5rem 1.5rem;
			border-radius: 100px;
			width: 14rem;
			background: transparent;
			border: 2px solid ${v.secondary_2};
			color: ${v.text_1};
			font-family: inherit;
			text-transform: uppercase;
			letter-spacing: 1px;
			font-size: 14pt;
			cursor: pointer;
		`,
		icon: css`
			cursor: pointer;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 2rem;
			width: 2rem;
			background: transparent;
			border: none;
		`,
		light: css`
			width: 1.5rem;
			height: 1.5rem;
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: 0.5s;
			${themeSwitch === 'dark' &&
			`transform: translateY(-1rem) rotate(180deg);`}
		`,
		circle: css`
			position: absolute;
			height: 14px;
			width: 14px;
			border: 3px solid ${v.text_dark};
			border-radius: 50%;
			box-sizing: border-box;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			transition: 0.5s;
			${themeSwitch === 'dark' &&
			`
				transform: translate(-50%, -50%) scale(.5);
				opacity: 0;
			`}

			${themeSwitch === 'automatic' &&
			`
				transform: translate(-50%, -50%) scale(.5);
				opacity: 0;
			`}
		`,
		line: css`
			position: absolute;
			width: 5px;
			height: 3px;
			background: ${v.text_dark};
			border-radius: 100px;
			top: 50%;
			left: 50%;
			box-sizing: border-box;

			${themeSwitch === 'dark' &&
			`width: 3px;
			opacity: 0;`}

			${themeSwitch === 'automatic' &&
			`
				opacity: 1;
				background: ${v.text_1};
			`}
		`,
		dark: css`
			transform: translateY(1rem) rotate(180deg) scale(0.3);
			opacity: 0;
			position: absolute;
			stroke-width: 3px;
			transition: 0.5s;
			color: ${v.text_light};

			${themeSwitch === 'dark' &&
			`opacity: 1;
			transform: rotate(0);`}

			${themeSwitch === 'automatic' &&
			`
				stroke-width: 4px;
				opacity: 1;
				transform: scale(.6);
				color: ${v.text_1};
			`}
		`,
	};

	const handleToggle = () => {
		if (themeSwitch === 'automatic') {
			setThemeSwitch('light');
			setTheme('light');
		} else if (themeSwitch === 'light') {
			setThemeSwitch('dark');
			setTheme('dark');
		} else {
			setThemeSwitch('automatic');
			const darkTheme = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches;
			if (darkTheme) {
				setTheme('dark');
			} else {
				setTheme('light');
			}
		}
	};
	const lines = [1, 2, 3, 4, 5, 6, 7, 8];
	return (
		<button onClick={handleToggle} css={styles.button}>
			{themeSwitch}
			<div css={styles.icon}>
				<div css={styles.light}>
					<div css={styles.circle}></div>
					{lines.map(line => {
						const lineAnimation = css`
							transform: translate(-50%, -50%)
								rotate(calc(360deg / 8 * ${line})) translateX(12px);

							transition: 0.4s calc(0.2s / 8 * ${line});

							${themeSwitch === 'dark' &&
							`
								transform: translate(-50%, -50%) rotate(calc(360deg / 8 * ${line}));
							`}

							${themeSwitch === 'automatic' &&
							`
								transform: translate(-50%, -50%) rotate(calc(360deg / 8 * ${line})) translateX(12px);
							`}
						`;
						return <div key={line} css={[styles.line, lineAnimation]}></div>;
					})}
				</div>
				<FeatherIcon icon="moon" css={styles.dark} />
			</div>
		</button>
	);
};

export default ThemeToggle;
