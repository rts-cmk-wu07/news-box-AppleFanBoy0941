/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FeatherIcon from 'feather-icons-react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import { useState } from 'react';

const Search = () => {
	const [isActive, setIsActive] = useState(false);
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		form: css`
			display: flex;
			align-items: center;
			padding: 1.5rem;
		`,
		label: css`
			width: 100%;
			display: flex;
			background: ${v.secondary_1};
			align-items: center;
			gap: 0.5rem;
			border-radius: 0.5rem;
			padding-right: 0.5rem;
			border: 2px solid transparent;

			& svg {
				opacity: 0.5;
				stroke-width: 3px;
				stroke: ${v.primary_1};
			}

			${isActive &&
			`
				border: 2px solid ${v.primary_1};
			`}
		`,
		input: css`
			width: 100%;
			background: transparent;
			padding: 1rem;
			border: none;
			font-size: 1rem;

			&:focus {
				outline: none;
			}
		`,
		button: css`
			background: transparent;
			border: none;
			padding: 0.5rem;
			display: block;
		`,
	};
	return (
		<div>
			<form css={styles.form}>
				<label css={styles.label}>
					<input
						css={styles.input}
						type="text"
						placeholder="Search news"
						onFocus={() => setIsActive(true)}
						onBlur={() => setIsActive(false)}
					/>
					<button css={styles.button}>
						<FeatherIcon icon="search" />
					</button>
				</label>
			</form>
		</div>
	);
};

export default Search;
