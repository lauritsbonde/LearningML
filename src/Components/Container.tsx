import React from 'react';
import { Box } from '@mui/material';
import GameContainer from './game/GameContainer';
import Splitter from './Splitter';
import BrainContainer from './brain/BrainContainer';

const Container = () => {
	const FLEXBASIS = 100;

	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', height: '97vw', textAlign: 'center' }}>
			<GameContainer flexSize={FLEXBASIS} />
			<Splitter flexSize={1} />
			<BrainContainer flexSize={FLEXBASIS} />
		</Box>
	);
};

export default Container;
