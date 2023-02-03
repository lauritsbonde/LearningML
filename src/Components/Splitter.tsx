import { Box } from '@mui/material';
import React, { FC } from 'react';

interface props {
	flexSize: number;
}

const Splitter: FC<props> = ({ flexSize }) => {
	return <Box sx={{ minWidth: '12px', maxWidth: '2vw', backgroundColor: 'black', flex: flexSize }}></Box>;
};

export default Splitter;
