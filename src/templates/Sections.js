import { useContext } from 'react';
import Section from './Section';
import ActiveSectionContext from '../context/ActiveSectionContext';

const Sections = ({ data }) => {
	const { sections } = useContext(ActiveSectionContext);
	const sorted = data.sort((a, b) => {
		if (a.section < b.section) {
			return -1;
		}
		if (a.section > b.section) {
			return 1;
		}
		return 0;
	});

	const titles = [...new Set(sorted.map(item => item.section))];
	const filteredTitles = sections.activeSections.filter(title => {
		return titles.includes(title);
	});

	return (
		<div>
			{filteredTitles.map(title => (
				<Section key={title} title={title} data={data} />
			))}
		</div>
	);
};

export default Sections;
