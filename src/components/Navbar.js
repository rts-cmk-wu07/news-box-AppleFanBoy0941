import { Link, useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import Heading from './subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';
import { variables } from '../variables/variables';
import MenuContext from '../context/MenuContext';

const Navbar = () => {
	const location = useLocation();

	const menu = useContext(MenuContext);
	const menuIsOpen = menu.menu;
	const setMenu = menu.setMenu;

	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const aDuration = 0.7;
	const styles = {
		nav: css`
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.5rem 2rem;
			border-bottom: 1px solid ${v.secondary_2};
		`,
		settings: css`
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
			background: transparent;
			position: relative;
		`,
		settingsIcon: css`
			transition: 1s;
			color: ${v.text_1};
			${menuIsOpen &&
			`
				transform: rotate(180deg) scale(.5);
				opacity: 0;
			`}
		`,
		cross: css`
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) scale(0.5);
			transition: ${aDuration}s;
			width: 100%;
			height: 100%;
			opacity: 0;

			&:before,
			&:after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 2px;
				height: 3px;
				background: ${v.text_1};
				border-radius: 100px;
				transition: ${aDuration}s;
			}

			&:before {
				transform: translate(-50%, -50%) rotate(45deg);
			}

			&:after {
				transform: translate(-50%, -50%) rotate(-45deg);
			}

			${menuIsOpen &&
			`
				transform: translate(-50%, -50%) scale(1);
				opacity: 1;

				&:before,
				&:after {
					width: 1.5rem;
				};
			`}
		`,
	};
	return (
		<nav css={styles.nav}>
			{location.pathname === '/home' ? (
				<Link to="archive">
					<FeatherIcon icon="inbox" />
				</Link>
			) : (
				<Link to="home">
					<FeatherIcon icon="chevron-left" />
				</Link>
			)}
			<Heading
				type="section"
				text={
					menuIsOpen
						? 'Settings'
						: location.pathname === '/archive'
						? 'Archive'
						: 'News Box'
				}
			/>
			<button css={styles.settings} onClick={() => setMenu(!menuIsOpen)}>
				<FeatherIcon icon="settings" css={styles.settingsIcon} />
				<div css={styles.cross}></div>
			</button>
		</nav>
	);
};

export default Navbar;
