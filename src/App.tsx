import { ThemeProvider } from '@mui/material';
import { rawTheme } from './UITheme/theme';
import TopBar from './Components/TopBar';
import Container from './Components/Container';

function App() {
	return (
		<ThemeProvider theme={rawTheme}>
			<TopBar />
			<Container />
		</ThemeProvider>
	);
}

export default App;
