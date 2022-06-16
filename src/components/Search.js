/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FeatherIcon from 'feather-icons-react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import { useState } from 'react';
import SearchContext from '../context/SearchContext';

const Search = () => {
	const search = useContext(SearchContext);
	const { searchQ, setSearchQ } = search;
	const [isActive, setIsActive] = useState(false);
	const onSubmit = e => {
		e.preventDefault();
		console.log(e);
		setIsActive(false);
	};
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
			padding: 1.5rem;
			border-bottom: 2px solid ${v.secondary_1};
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
			color: ${v.text_1};
			font-weight: 500;

			&:focus {
				outline: none;
			}
		`,
		button: css`
			background: transparent;
			border: none;
			padding: 0.5rem;
			display: block;
			border-radius: 10rem;
		`,
		clear: css`
			border: none;
			background: transparent;
			opacity: 0;
			transition: 0.3s;
			display: flex;
			align-items: center;

			& svg {
				transition: 0.3s;
				height: 0;
				width: 0;
			}

			${searchQ &&
			`
				opacity: 1;

				& svg {
					height: 1rem;
					width: 1rem;
			`}
		`,
	};
	return (
		<div>
			<form css={styles.form} onSubmit={onSubmit}>
				<label css={styles.label}>
					<input
						css={styles.input}
						type="text"
						placeholder="Search news"
						onFocus={() => setIsActive(true)}
						onBlur={() => setIsActive(false)}
						name="search"
						value={searchQ}
						onChange={e => setSearchQ(e.target.value)}
					/>
					<button
						css={styles.clear}
						onClick={() => setSearchQ('')}
						aria-label="Clear search field"
					>
						<FeatherIcon icon="x" />
					</button>
					<div css={styles.button}>
						<FeatherIcon icon="search" />
					</div>
				</label>
			</form>
		</div>
	);
};

export default Search;
