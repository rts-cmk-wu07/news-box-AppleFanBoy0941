import SectionHeader from '../components/SectionHeader';
import { useState, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { variables } from '../variables/variables';
import ThemeContext from '../context/ThemeContext';

const Section = ({ title }) => {
	const [isOpen, setIsOpen] = useState(false);

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
			border-bottom: 2px solid ${v.secondary_1};
		`,
	};
	return (
		<section css={styles.section}>
			<SectionHeader title={title} isOpen={isOpen} setIsOpen={setIsOpen} />
		</section>
	);
};

export default Section;
