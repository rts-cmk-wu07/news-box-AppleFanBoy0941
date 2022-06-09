/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import { variables } from '../../variables/variables';
import ThemeContext from '../../context/ThemeContext';

const Heading = ({ type, color, text }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	const styles = {
		h1: css`
			font-size: 30pt;
			font-weight: bold;
			color: ${color || theme.text_1};
		`,
	};
	return (
		<>
			{type === 'primary' && <h1 css={styles.h1}>{text}</h1>}
			{type === 'secondary' && <h2>{text}</h2>}
			{type === 'section' && <h3>{text}</h3>}
			{type === 'sub' && <h4>{text}</h4>}
		</>
	);
};

export default Heading;
