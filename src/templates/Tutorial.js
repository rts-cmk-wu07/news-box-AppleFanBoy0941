import Heading from '../components/subcomponents/Heading';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';
import { variables } from '../variables/variables';
import FeatherIcon from 'feather-icons-react';
import TutorialContent from '../components/TutorialContent';
import tutorial from '../content/tutorialSteps';

const Tutorial = ({ currentStep, setCurrentStep }) => {
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
			overflow: hidden;
			transition: 1s;
			border: 2px solid ${v.primary_1}20;

			& h2 {
				width: calc(100vw - 2rem - 4rem);
			}

			${currentStep > tutorial.length &&
			`
				height: 2rem;
				width: 2rem;
				opacity: 0;
				pointer-events: none;
			`}
		`,
		button: css`
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 0.5rem 1.5rem 0.5rem 2rem;
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
			transition: 0.3s;

			${currentStep > tutorial.length &&
			`
				opacity: 0;
			`}
		`,
	};

	const clickHandler = () => {
		setCurrentStep(currentStep + 1);
		localStorage.setItem('tutorial', currentStep + 1);
	};

	return (
		<section css={styles.section}>
			<Heading type="secondary" text="Welcome to Newsbox" />
			<TutorialContent currentStep={currentStep} />
			<button css={styles.button} onClick={clickHandler}>
				{currentStep < tutorial.length ? (
					<>
						<span>Next</span> <FeatherIcon icon="chevron-right" />
					</>
				) : (
					<>
						<span>Done</span>
						<FeatherIcon icon="check" />
					</>
				)}
			</button>
		</section>
	);
};

export default Tutorial;
