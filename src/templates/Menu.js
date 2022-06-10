import Heading from '../components/subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import MenuContext from '../context/MenuContext';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import ThemeToggle from '../components/ThemeToggle';

const Menu = () => {
	const menu = useContext(MenuContext);
	const menuIsOpen = menu.menu;

	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		menu: css`
			padding: 0;
			height: 0;
			transition: 0.7s;
			overflow: hidden;
			width: 100vw;
			margin-top: 1.5rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 3rem;

			& > * {
				opacity: 0;
				transition: 0.7s;
			}

			${menuIsOpen &&
			`
				padding: 2rem 0;
				height: calc(100vh - 28px - 3rem);
				background: ${v.secondary_1};

				& > * {
					opacity: 1;
				}
			`}
		`,
	};
	return (
		<div css={styles.menu}>
			<div>
				<Heading type="primary" text="Manage" color={v.primary_1} />
				<Heading type="sub" text="Categories" color={v.primary_3} />
			</div>
			<ThemeToggle />
		</div>
	);
};

export default Menu;
