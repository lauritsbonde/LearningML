import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

interface props {
	flexSize: number;
}

const BrainContainer: FC<props> = ({ flexSize }) => {
	return (
		<Box sx={{ flex: flexSize }}>
			<Typography variant="h3">Braincontainer</Typography>
		</Box>
	);
};

export default BrainContainer;
