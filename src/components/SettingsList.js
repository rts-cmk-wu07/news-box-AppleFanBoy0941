import SettingsItem from './SettingsItem';
import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import FeatherIcon from 'feather-icons-react';
import ActiveSectionContext from '../context/ActiveSectionContext';

const SettingsList = () => {
	const { sections, setActiveSections } = useContext(ActiveSectionContext);
	const { sectionList, activeSections } = sections;
	const [isCollapsed, setIsCollapsed] = useState(true);
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const height = 5;
	const listHeight = height * sectionList.length;
	const collapsedCount = 5;
	const styles = {
		list: css`
			background: ${v.text_3};
			border-radius: 1.5rem;
			width: 100%;

			& li {
				border-bottom: 1px solid ${v.secondary_1};
			}
		`,
		li: css`
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: none;
			position: sticky;
		`,
		button: css`
			width: 100%;
			height: 4rem;
			padding: 1rem 2rem;
			background: transparent;
			border: none;
			color: ${v.text_1};
			font-size: 0.9rem;
			font-weight: 600;
			align-items: center;
			display: flex;
			justify-content: center;
			gap: 0.5rem;

			& svg {
				transition: 0.3s;
			}

			${!isCollapsed &&
			`
				& svg {
					transform: rotate(180deg);
			}
			`}
		`,
		toggleList: css`
			height: calc(${height} * ${collapsedCount}rem);
			overflow-y: hidden;
			transition: 0.5s;

			${!isCollapsed &&
			`
				height: ${listHeight}rem;
			`}
		`,
	};

	return (
		<ul css={styles.list}>
			<div css={styles.toggleList}>
				{sectionList.map((section, index) => (
					<SettingsItem
						section={section}
						key={index}
						state={activeSections.includes(section)}
						activeSections={activeSections}
						setActiveSections={setActiveSections}
					/>
				))}
			</div>
			<li css={styles.li}>
				<button
					css={styles.button}
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					{isCollapsed ? 'Expand list' : 'Collapse list'}{' '}
					<FeatherIcon icon="chevron-down" />
				</button>
			</li>
		</ul>
	);
};

export default SettingsList;
