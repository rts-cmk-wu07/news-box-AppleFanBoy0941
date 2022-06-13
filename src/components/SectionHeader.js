import FeatherIcon from 'feather-icons-react';
import Heading from './subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';
import { variables } from '../variables/variables';

const SectionHeader = ({ title, isOpen, setIsOpen }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		header: css`
			display: flex;
			padding: 0.75rem 1.5rem;
			gap: 1rem;
			align-items: center;
			overflow-y: hidden;
			cursor: pointer;
		`,
		icon: css`
			height: 2.5rem;
			width: 2.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 100px;
			box-shadow: 0 0.75rem 2rem #00000030;
			color: ${v.primary_2};

			background: ${v.text_light}20;

			& svg {
				stroke-width: 2.5px;
			}
		`,
		button: css`
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: transparent;
			border: none;
			margin-left: auto;
			color: inherit;
			transition: 0.25s;

			${isOpen &&
			`
				transform: rotate(90deg);
			`}

			& svg {
				/* height: 2rem;
				width: 2rem; */
				color: inherit;
			}
		`,
	};
	return (
		<header css={styles.header} onClick={() => setIsOpen(!isOpen)}>
			<div css={styles.icon}>
				<FeatherIcon icon="box" />
			</div>
			<Heading type="card" text={title} />
			<button css={styles.button}>
				<FeatherIcon icon="chevron-right" />
			</button>
		</header>
	);
};

export default SectionHeader;
