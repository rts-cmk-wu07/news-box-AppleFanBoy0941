import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const PopUp = ({ popUp, popUpIsOpen }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		popup: css`
			width: calc(100vw - 4rem);
			height: 2rem;
			position: fixed;
			top: 1rem;
			left: 2rem;
			background: ${v.primary_1};
			z-index: 2000;
			opacity: 0;
			padding: 0 2rem;
			transition: 0.5s;
			display: flex;
			justify-content: center;
			align-items: center;
			color: ${v.text_3};
			gap: 1rem;
			pointer-events: none;
			border-radius: 1.5rem;
			& p {
				width: max(calc(100vw - 8rem - 1.5rem - 1rem), fit-content);
				opacity: 0;
				transition: 0.5s ease 0.5s;
				overflow-x: hidden;
				font-size: 14px;
			}

			& svg {
				transition: 0.7s;
				opacity: 0;
				transform: rotate(-90deg);
			}

			${popUpIsOpen &&
			`
				top: 2rem;
				height: 80px;
				opacity: 1;
				padding: 1rem 2rem; 
				pointer-events: all;
				box-shadow: 0 .5rem 2rem ${v.primary_1}80;
				& svg {
					opacity: 1;
					transform: rotate(0);
				}
				& p {
					opacity: 1;
					transition: 0.5s;
			`}
		`,
	};
	return (
		<Link to="/archive" css={styles.popup} aria-label="Go to the archive">
			<FeatherIcon icon="info" />
			<p>{popUpIsOpen && popUp}</p>
		</Link>
	);
};

export default PopUp;
