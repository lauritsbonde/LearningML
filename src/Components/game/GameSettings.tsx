import { Box, Button, Input, SvgIcon, Typography, FormControlLabel, Checkbox } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { FC } from 'react';

interface props {
	isOpen: boolean;
	toggleSettings: () => void;
	restartGame: () => void;
	autoTick: boolean;
	setAutoTick: (autoTick: boolean) => void;
}

const style = {
	openSettings: {
		position: 'relative',
		top: '0px',
		left: '0px',
		width: '80%',
		margin: '2% auto',
		minHeight: 'fit-content',
		paddingBottom: '10px',
		border: '1px solid black',
		borderRadius: '10px',
		zIndex: 1,
		transition: 'all 0.5s ease-in-out',
	},
	closedSettings: {
		position: 'relative',
		top: '0px',
		left: '0px',
		width: '80%',
		margin: '2% auto',
		minHeight: '50px',
		border: '1px solid black',
		borderRadius: '10px',
		transition: 'all 0.5s ease-in-out',
		zIndex: 1,
	},
};

const GameSettings: FC<props> = ({ isOpen, toggleSettings, restartGame, autoTick, setAutoTick }) => {
	return (
		<Box sx={isOpen ? style.openSettings : style.closedSettings}>
			<SvgIcon component={SettingsIcon} sx={{ fontSize: '50px', cursor: 'pointer' }} onClick={toggleSettings} />
			{isOpen && (
				<Box sx={{ position: 'relative', zIndex: 1 }}>
					<Typography variant="h4">Game Settings</Typography>

					<Box>
						<Typography sx={{ display: 'inline-block' }}>Number of players:</Typography>
						<Input type="number" placeholder="Number of players" />
					</Box>
					<Box>
						<Typography sx={{ display: 'inline-block' }}>Number of food:</Typography>
						<Input type="number" placeholder="Number of food" />
					</Box>

					<Button variant="contained" onClick={restartGame} color="error" sx={{ margin: '2% 0' }}>
						Restart Game
					</Button>

					<Box>
						<FormControlLabel control={<Checkbox checked={autoTick} onChange={() => setAutoTick(!autoTick)} size="medium" />} label="AutoTick" />
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default GameSettings;
