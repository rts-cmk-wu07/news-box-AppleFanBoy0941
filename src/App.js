import { Outlet } from 'react-router';
import './App.css';

function App() {
	return (
		<div className="App">
			<div>
				<Outlet />
			</div>
		</div>
	);
}

export default App;
