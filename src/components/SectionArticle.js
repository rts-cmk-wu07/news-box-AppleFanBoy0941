/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { variables } from '../variables/variables';
import Body from './subcomponents/Body';
import Heading from './subcomponents/Heading';
import FeatherIcon from 'feather-icons-react';

const SectionArticle = ({ data }) => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		article: css`
			padding: 0.75rem 1.5rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			border-top: 1px solid ${v.secondary_1};
			width: 100%;
			text-align: left;
			position: relative;
		`,
		img: css`
			height: 4.5rem;
			width: 4.5rem;
			border-radius: 100px;
		`,
		div: css`
			width: calc(100% - 4.5rem - 1rem);
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		`,
		imgDiv: css`
			height: 4.5rem;
			width: 4.5rem;
			border-radius: 100px;
			background: ${v.primary_1}50;
			display: flex;
			align-items: center;
			justify-content: center;

			& svg {
				opacity: 0.5;
				stroke-width: 3px;
				stroke: ${v.text_1};
				overflow: visible;
			}
		`,
	};

	const findImage = media => {
		if (media !== undefined) {
			return (
				<img
					css={styles.img}
					src={media['media-metadata'][0].url}
					alt={media.caption}
				/>
			);
		}
		return (
			<div css={styles.imgDiv}>
				<FeatherIcon icon="camera-off" />
			</div>
		);
	};

	const clickHandler = () => {
		window.location.href = data.url;
	};

	return (
		<article css={styles.article} onClick={clickHandler}>
			{findImage(data.media[0])}
			<div css={styles.div}>
				<a href={data.url}>
					<Heading type="card" text={data.title} />
				</a>
				<Body type="card" text={data.abstract} />
			</div>
		</article>
	);
};

export default SectionArticle;
