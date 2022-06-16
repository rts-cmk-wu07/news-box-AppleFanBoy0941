import FeatherIcon from 'feather-icons-react';
import Heading from './subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';
import { variables } from '../variables/variables';

const SectionHeader = ({ title, isOpen, setIsOpen, numberOfArticles }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		header: css`
			display: flex;
			padding: 0.75rem 1.5rem;
			gap: 1rem;
			align-items: center;
			overflow-y: hidden;
			cursor: pointer;
		`,
		icon: css`
			height: 2.5rem;
			width: 2.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 100px;
			box-shadow: 0 0.5rem 1.5rem #00000020;
			color: ${v.primary_2};

			background: ${v.text_light}20;

			& svg {
				stroke-width: 2.5px;
			}
		`,
		button: css`
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: transparent;
			border: none;
			color: inherit;
			transition: 0.25s;
			border-radius: 10rem;
			${isOpen &&
			`
				transform: rotate(90deg);
			`}
			& svg {
				/* height: 2rem;
				width: 2rem; */
				color: inherit;
			}
		`,
		number: css`
			display: flex;
			margin-left: auto;
			/* opacity: 0.5; */
			font-size: 0.8rem;
			color: ${v.primary_1};
			font-weight: 600;
		`,
	};

	const categoryIcons = {
		world: 'globe',
		us: 'flag',
		newyork: 'map-pin',
		politics: 'bar-chart-2',
		business: 'package',
		opinion: 'message-square',
		technology: 'monitor',
		science: 'hexagon',
		health: 'heart',
		style: 'feather',
		travel: 'compass',
		sports: 'award',
		arts: 'edit',
		books: 'book',
		food: 'shopping-cart',
		magazine: 'book-open',
		realestate: 'home',
		video: 'video',
		tmagazine: 'book-open',
		gameplay: 'crosshair',
		theater: 'smile',
		well: 'sun',
	};

	const matchSectionWithIcons = section => {
		const sectionMinified = section
			.toLowerCase()
			.replace(/\s/g, '')
			.replace(/\./g, '');
		return categoryIcons[sectionMinified];
	};

	return (
		<header
			css={styles.header}
			onClick={() => setIsOpen(!isOpen)}
			aria-label={`${title} section`}
		>
			<div css={styles.icon}>
				<FeatherIcon icon={matchSectionWithIcons(title)} />
			</div>
			<Heading type="sub" text={title} />
			<span css={styles.number}>{numberOfArticles}</span>
			<button css={styles.button} aria-label={`Open ${title} section`}>
				<FeatherIcon icon="chevron-right" />
			</button>
		</header>
	);
};

export default SectionHeader;
