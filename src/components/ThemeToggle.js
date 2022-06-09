/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FeatherIcon from 'feather-icons-react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';

const ThemeToggle = () => {
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
			${theme === 'dark' && `transform: translateY(-1rem) rotate(180deg);`}
		`,
		circle: css`
			position: absolute;
			height: 14px;
			width: 14px;
			border: 3px solid ${v.text_1};
			border-radius: 50%;
			box-sizing: border-box;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			transition: 0.5s;
			${theme === 'dark' &&
			`
				transform: translate(-50%, -50%) scale(.5);
				opacity: 0;
			`}
		`,
		line: css`
			position: absolute;
			width: 5px;
			height: 3px;
			background: ${v.text_1};
			border-radius: 100px;
			top: 50%;
			left: 50%;
			box-sizing: border-box;

			${theme === 'dark' &&
			`width: 3px;
			opacity: 0;`}
		`,
		dark: css`
			transform: translateY(1rem) rotate(180deg) scale(0.3);
			opacity: 0;
			position: absolute;
			stroke-width: 3px;
			transition: 0.5s;
			color: ${v.text_1};

			${theme === 'dark' &&
			`opacity: 1;
			transform: rotate(0);`}
		`,
	};

	const handleToggle = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};
	const dark = '';
	const lines = [1, 2, 3, 4, 5, 6, 7, 8];
	return (
		<button css={styles.icon} onClick={handleToggle}>
			<div css={styles.light}>
				<div css={styles.circle}></div>
				{lines.map(line => {
					const lineAnimation = css`
						transform: translate(-50%, -50%) rotate(calc(360deg / 8 * ${line}))
							translateX(12px);

						transition: 0.4s calc(0.2s / 8 * ${line});

						${theme === 'dark' &&
						`
						transform: translate(-50%, -50%) rotate(calc(360deg / 8 * ${line}));
						`}
					`;
					return <div key={line} css={[styles.line, lineAnimation]}></div>;
				})}
			</div>
			<FeatherIcon icon="moon" css={styles.dark} />
		</button>
	);
};

export default ThemeToggle;
