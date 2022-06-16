import Sections from '../templates/Sections';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import Search from '../components/Search';
import { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import ErrorModule from '../components/ErrorModule';

const url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=';
const key = 'jWCYReQL9liE93kNAYf6W9u3lufxbbF1';

const Home = () => {
	const search = useContext(SearchContext);
	const { searchQ } = search;
	const { data, isPending, error } = useFetch(`${url}${key}`);
	let results = data && data.results;
	results =
		results &&
		results.filter(item => {
			if (searchQ !== '') {
				return (
					item.title.toLowerCase().includes(searchQ.toLowerCase()) ||
					item.abstract.toLowerCase().includes(searchQ.toLowerCase()) ||
					item.section.toLowerCase().includes(searchQ.toLowerCase())
				);
			}
			return item;
		});
	return (
		<main>
			<Search />
			{isPending && <Loading />}
			{error && <ErrorModule message={error} />}
			{data && <Sections data={results} />}
		</main>
	);
};

export default Home;
