import tutorial from '../content/tutorialSteps';
import Body from './subcomponents/Body';
import Heading from './subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const TutorialContent = ({ currentStep }) => {
	const styles = {
		article: css`
			margin-top: 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			width: calc(100vw - 2rem - 4rem);
		`,
	};
	const currentHeader =
		currentStep < tutorial.length
			? tutorial[currentStep].header
			: `Now you're ready`;
	const currentBody =
		currentStep < tutorial.length
			? tutorial[currentStep].body
			: 'Go explore your new News app';
	return (
		<article css={styles.article}>
			<Heading type="section" text={currentHeader} />
			<Body type="card" text={currentBody} />
		</article>
	);
};

export default TutorialContent;
