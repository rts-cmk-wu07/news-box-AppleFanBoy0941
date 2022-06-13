/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { variables } from '../../variables/variables';

const Body = ({ type, color, text }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		card: css`
			font-size: 11pt;
			font-weight: 300;
			height: 38px;
			opacity: 0.8;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
		`,
	};
	return <>{type === 'card' && <p css={styles.card}>{text}</p>}</>;
};

export default Body;
