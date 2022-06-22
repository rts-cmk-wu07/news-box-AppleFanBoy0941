import Heading from '../components/subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';
import { variables } from '../variables/variables';
import FeatherIcon from 'feather-icons-react';
import TutorialContent from '../components/TutorialContent';
import { useState } from 'react';

const Tutorial = () => {
	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		section: css`
			position: fixed;
			height: 80vh;
			top: 2rem;
			left: 1rem;
			z-index: 100000;
			background: ${v.secondary_1};
			width: calc(100vw - 2rem);
			padding: 2rem;
			border-radius: 1rem;
		`,
		button: css`
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 2rem;
			position: absolute;
			bottom: 2rem;
			right: 2rem;
			border-radius: 0.5rem;
			background: ${v.primary_1};
			color: ${v.text_3};
			font-family: 'Inter';
			font-size: 1rem;
			font-weight: 700;
			border: none;
		`,
	};

	const ls = parseInt(localStorage.getItem('tutorial'));

	const [currentStep, setCurrentStep] = useState(ls || 0);

	const clickHandler = () => {
		setCurrentStep(currentStep + 1);
		localStorage.setItem('tutorial', currentStep + 1);
	};

	return (
		<section css={styles.section}>
			<Heading type="secondary" text="Welcome to Newsbox" />
			<TutorialContent currentStep={currentStep} />
			<button css={styles.button} onClick={clickHandler}>
				Next <FeatherIcon icon="chevron-right" />
			</button>
		</section>
	);
};

export default Tutorial;
