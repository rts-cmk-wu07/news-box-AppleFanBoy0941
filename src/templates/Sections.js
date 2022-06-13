const Sections = ({ data }) => {
	const { results } = data;

	const sorted = results.sort((a, b) => {
		if (a.section < b.section) {
			return -1;
		}
		if (a.section > b.section) {
			return 1;
		}
		return 0;
	});

	const sections = [...new Set(sorted.map(item => item.section))];

	return (
		<div>
			{sections.map(section => (
				<section key={section}>{section}</section>
			))}
		</div>
	);
};

export default Sections;
