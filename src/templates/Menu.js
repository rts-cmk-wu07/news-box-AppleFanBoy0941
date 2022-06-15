import Heading from '../components/subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import MenuContext from '../context/MenuContext';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import ThemeToggle from '../components/ThemeToggle';
import SettingsList from '../components/SettingsList';

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
			padding: 0 2rem;
			height: 0;
			transition: 0.7s;
			overflow-y: scroll;
			width: 100vw;
			margin-top: 1.5rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;

			& > * {
				opacity: 0;
				transition: 0.7s;
			}

			${menuIsOpen &&
			`
				padding: 2rem;
				height: calc(100vh - 28px - 3rem);
				background: ${v.secondary_1};
				gap: 3rem;

				& > * {
					opacity: 1;
				}
			`}
		`,
		heading: css`
			text-align: center;
		`,
	};
	return (
		<div css={styles.menu}>
			<div css={styles.heading}>
				<Heading type="primary" text="Manage" color={v.primary_1} />
				<Heading type="sub" text="Categories" color={v.primary_3} />
			</div>
			<SettingsList />
			<ThemeToggle />
			<small>Version: 4.8.23</small>
		</div>
	);
};

export default Menu;
