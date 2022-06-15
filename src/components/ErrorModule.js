import Heading from './subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import Body from './subcomponents/Body';

const ErrorModule = ({ message }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		wrapper: css`
			padding: 1.5rem;
		`,
		container: css`
			background: ${v.primary_2};
			padding: 1.5rem;
			border-radius: 0.5rem;
		`,
	};
	return (
		<div css={styles.wrapper}>
			<div css={styles.container}>
				<Heading type="section" text="Oops, that didn't go well" />
				<Body type="card" text={message} />
			</div>
		</div>
	);
};

export default ErrorModule;
