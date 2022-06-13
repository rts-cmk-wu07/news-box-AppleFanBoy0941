/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';

const Loading = () => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const size = 1;
	const styles = {
		loading: css`
			margin: 4rem auto;
			position: relative;
			width: 200px;
		`,
		div1: css`
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			background: ${v.primary_1};
			height: ${size}rem;
			width: ${size}rem;
			border-radius: 100px;
			opacity: 0;

			animation: loading 1.5s infinite linear;

			@keyframes loading {
				0% {
					transform: translateY(-50%);
					opacity: 0;
				}
				50% {
					transform: translate(-50%, -50%);
					left: 50%;
					opacity: 1;
					width: calc(${size}rem * 3);
				}
				100% {
					transform: translateY(-50%);
					left: calc(100% - ${size}rem);
					opacity: 0;
				}
			}
		`,
		div2: css`
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			background: ${v.primary_2};
			height: ${size}rem;
			width: ${size}rem;
			border-radius: 100px;
			opacity: 0;

			animation: loading 1.5s infinite 0.5s linear;
		`,
		div3: css`
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			background: ${v.primary_3};
			height: ${size}rem;
			width: ${size}rem;
			border-radius: 100px;
			opacity: 0;

			animation: loading 1.5s infinite 1s linear;
		`,
	};
	return (
		<div css={styles.loading}>
			<div css={styles.div1}></div>
			<div css={styles.div2}></div>
			<div css={styles.div3}></div>
		</div>
	);
};

export default Loading;
