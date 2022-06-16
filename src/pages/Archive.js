import Sections from '../templates/Sections';
import Search from '../components/Search';
import { useState } from 'react';

const Archive = () => {
	const [ls, setLs] = useState(JSON.parse(localStorage.getItem('archive')));
	return (
		<main>
			<Search />
			{ls && <Sections data={ls} updater={setLs} />}
		</main>
	);
};

export default Archive;
