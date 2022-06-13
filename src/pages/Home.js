import Sections from '../templates/Sections';
import useFetch from '../hooks/useFetch';

const url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=';
const key = 'jWCYReQL9liE93kNAYf6W9u3lufxbbF1';

const Home = () => {
	const { data, isPending, error } = useFetch(`${url}${key}`);

	return <main>{data && <Sections data={data} />}</main>;
};

export default Home;
