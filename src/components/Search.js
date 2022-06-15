/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FeatherIcon from 'feather-icons-react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Search = () => {
	const [isActive, setIsActive] = useState(false);
	const schema = yup.object({
		search: yup.string().required('Search is required'),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = e => {
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
		error: css`
			height: 0;
			transition: 0.3s;
			margin-left: 0.5rem;
			color: ${v.primary_2};
			opacity: 0;
			filter: blur(1rem);
			${errors.search &&
			`
				margin-top: 1rem;
				height: 20px;
				opacity: 1;
				filter: blur(0);
			`};
		`,
	};
	return (
		<div>
			<form css={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label css={styles.label}>
					<input
						css={styles.input}
						type="text"
						placeholder="Search news"
						onFocus={() => setIsActive(true)}
						onBlur={() => setIsActive(false)}
						name="search"
						{...register('search')}
					/>
					<button css={styles.button}>
						<FeatherIcon icon="search" />
					</button>
				</label>
				<p css={styles.error}>Please enter a keyword</p>
			</form>
		</div>
	);
};

export default Search;
