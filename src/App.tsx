import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { rawTheme } from './UITheme/theme';
import TopBar from './Components/TopBar';
import Container from './Components/Container';
import Game from './Game/game';

import Matrix from './Game/Brain/Matrix';

function App() {
	const [game, setGame] = useState(new Game());

	const m = new Matrix(2, 2);
	m.randomize();
	const m2 = new Matrix(2, 2);
	m2.randomize();
	m.multiply(m2);

	return (
		<ThemeProvider theme={rawTheme}>
			<TopBar />
			<Container />
		</ThemeProvider>
	);
}

export default App;
