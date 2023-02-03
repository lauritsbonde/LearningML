import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopBar = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
					AI test
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
