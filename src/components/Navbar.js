import { Link, useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

const Navbar = () => {
	const location = useLocation();
	return (
		<nav>
			{location.pathname === '/home' ? (
				<Link to="archive">
					<FeatherIcon icon="inbox" />
				</Link>
			) : (
				<Link to="home">
					<FeatherIcon icon="chevron-left" />
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
