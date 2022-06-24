import { useState, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Heading from './subcomponents/Heading';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';

const SettingsItem = ({
	section,
	state,
	activeSections,
	setActiveSections,
}) => {
	const [isActive, setIsActive] = useState(state);

	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		item: css`
			width: 100%;
			padding: 0.5rem 1.5rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		`,
		button: css`
			background: transparent;
			border: none;
			padding: 1rem 1.5rem 1rem 1.5rem;
			margin-right: -1.5rem;
			border-radius: 10rem;
		`,
		buttonDiv: css`
			display: flex;
			height: 2rem;
			width: 3.5rem;
			border-radius: 100px;
			background: ${isActive ? v.primary_1 : v.secondary_2};
			border: none;
			position: relative;
			align-items: center;
			transition: 0.3s;
		`,
		toggle: css`
			position: absolute;
			height: 1.7rem;
			width: 1.7rem;
			background: ${v.text_3};
			transition: 0.2s;
			border-radius: 100px;
			left: ${isActive ? 'calc(100% - 1.85rem)' : '0.15rem'};
			box-shadow: 0 0.25rem 0.5rem ${v.text_dark}20;
		`,
	};
	const clickHandler = () => {
		setIsActive(!isActive);
		if (isActive) {
			setActiveSections(activeSections.filter(title => title !== section));
		} else {
			const newSections = [...activeSections, section].sort();
			setActiveSections(newSections);
		}
	};
	return (
		<div css={styles.item}>
			<Heading type="sub" text={section} />
			<button
				css={styles.button}
				onClick={clickHandler}
				aria-label={`Toggle ${section} ${isActive ? 'off' : 'on'}`}
			>
				<div css={styles.buttonDiv}>
					<div css={styles.toggle}></div>
				</div>
			</button>
		</div>
	);
};

export default SettingsItem;
