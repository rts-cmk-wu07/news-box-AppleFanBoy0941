/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import { variables } from '../../variables/variables';
import ThemeContext from '../../context/ThemeContext';

const Heading = ({ type, color, text }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		h1: css`
			font-size: 30pt;
			font-weight: bold;
			color: ${color || v.text_1};
		`,
		h2: css`
			font-size: 24pt;
			font-weight: bold;
			color: ${color || v.text_1};
		`,
		h3: css`
			font-size: 18pt;
			font-weight: bold;
			color: ${color || v.text_1};
		`,
		h4: css`
			font-size: 18pt;
			font-weight: 400;
			color: ${color || v.text_1};
		`,
	};
	return (
		<>
			{type === 'primary' && <h1 css={styles.h1}>{text}</h1>}
			{type === 'secondary' && <h2 css={styles.h2}>{text}</h2>}
			{type === 'section' && <h3 css={styles.h3}>{text}</h3>}
			{type === 'sub' && <h4 css={styles.h4}>{text}</h4>}
		</>
	);
};

export default Heading;
