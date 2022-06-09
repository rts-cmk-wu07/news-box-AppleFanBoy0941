import Heading from '../components/subcomponents/Heading';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
	return (
		<main>
			<ThemeToggle />
			<Heading type="primary" text="Hello World" />
		</main>
	);
};

export default Home;
