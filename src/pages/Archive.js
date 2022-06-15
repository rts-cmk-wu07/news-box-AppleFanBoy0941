import Sections from '../templates/Sections';
import Search from '../components/Search';

const Archive = () => {
	const ls = localStorage.getItem('archive');
	const data = JSON.parse(ls);
	return (
		<main>
			<Search />
			{data && <Sections data={data} />}
		</main>
	);
};

export default Archive;
