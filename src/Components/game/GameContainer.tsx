import { Typography, Box, Button } from '@mui/material';
import React, { useState, FC, useEffect, useCallback } from 'react';
import Canvas from './Canvas';
import useCanvas from '../../Hooks/useCanvas';
import world from '../../Game/world';
import player from '../../Game/player';
import GameSettings from './GameSettings';
import { drawFood, drawPlayers } from './draw';

interface props {
	flexSize: number;
}

const GameContainer: FC<props> = ({ flexSize }) => {
	const [game, setGame] = useState(undefined as unknown as world);
	const [followPlayer, setFollowPlayer] = useState(Array<player>);

	const [autoTick, setAutoTick] = useState(true);

	const [openSettings, setOpenSettings] = useState(false);

	const draw = (ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (game !== undefined && followPlayer[0] !== undefined) {
			const player = followPlayer[0];
			drawFood(ctx, game.fruits, player.id);
			drawPlayers(ctx, game.players, player);
		}
	};

	const canvasRef = useCanvas(draw);

	const tick = useCallback(() => {
		if (game === undefined) {
			setGame(new world({ width: canvasRef.current.width, height: canvasRef.current.height }, 2, 20));
		} else {
			setFollowPlayer([game.players[0]]);
			setGame(game.update());
		}
	}, [game, canvasRef]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoTick) {
				tick();
			}
		}, 1000 / 60);
		return () => clearInterval(interval);
	}, [autoTick, tick]);

	return (
		<Box sx={{ flex: flexSize, position: 'relative', zIndex: 0 }}>
			<Typography variant="h3">Gamecontainer</Typography>
			<GameSettings
				isOpen={openSettings}
				toggleSettings={() => setOpenSettings(!openSettings)}
				restartGame={() => setGame(new world())}
				autoTick={autoTick}
				setAutoTick={() => setAutoTick(!autoTick)}
			/>
			<Canvas draw={draw} canvasRef={canvasRef} />

			<Box>
				{game !== undefined && (
					<>
						<Typography variant="h4">Player {game.players[0].id + 1}</Typography>
						{followPlayer[0] !== undefined && <Typography variant="body1">Current score: {followPlayer[0].score}</Typography>}

						<Box>
							<Typography variant="h3">Generation count: {game.generationCount}</Typography>
							<Typography variant="h4">
								Ticks for next gen: {game.ticksSinceLastGeneration} / {game.ticksBetweenNewGeneration}
							</Typography>
						</Box>
					</>
				)}
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
				<Button variant="contained" color="primary" onClick={() => tick()} disabled={autoTick}>
					Manual Tick
				</Button>
				<Button variant="contained" color="info" onClick={() => game.newGeneration()}>
					Manually create new generation
				</Button>
			</Box>
		</Box>
	);
};

export default GameContainer;
