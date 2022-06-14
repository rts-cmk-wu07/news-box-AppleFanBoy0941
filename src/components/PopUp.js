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
			top: 2rem;
			left: 50%;
			transform: translateX(-50%);
			background: ${v.primary_1};
			z-index: 2000;
			border-radius: 1.5rem;
			opacity: 0;
			padding: 0 2rem;
			transition: 0.5s;
			display: flex;
			justify-content: center;
			align-items: center;
			color: ${v.text_3};
			flex-direction: column;
			gap: 1rem;
			pointer-events: none;

			& p {
				width: max(calc(100vw - 8rem), fit-content);
				opacity: 0;
				transition: 0.5s ease 0.5s;
				overflow-x: hidden;
			}

			& svg {
				width: 2rem;
				height: 2rem;
				transition: 0.7s;
				transform: scale(0.75) rotate(-90deg);
				opacity: 0;
			}

			${popUpIsOpen &&
			`
				height: 10rem;
				opacity: 1;
				padding: 2rem; 
				box-shadow: 0 0.25rem 2rem ${v.primary_1}a0;
				pointer-events: all;
				& svg {
					transform: scale(1) rotate(0);
					opacity: 1
				}
				& p {
					opacity: 1;
					transition: 0.5s;
			`}
		`,
	};
	return (
		<Link to="/archive" css={styles.popup}>
			<FeatherIcon icon="info" />
			<p>{popUpIsOpen && popUp}</p>
		</Link>
	);
};

export default PopUp;
