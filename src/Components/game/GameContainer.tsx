import { Typography, Box, Button, Input } from '@mui/material';
import React, { useState, FC, useEffect } from 'react';
import Canvas from './Canvas';
import useCanvas from '../../Hooks/useCanvas';
import world from '../../Game/world';
import player from '../../Game/player';
import fruit from '../../Game/fruit';
import GameSettings from './GameSettings';
import { display } from '@mui/system';

interface props {
	flexSize: number;
}

const drawPlayers = (ctx: CanvasRenderingContext2D, players: Array<player>, followPlayer?: player) => {
	for (let player of players) {
		if (followPlayer !== undefined && player.id === followPlayer.id) {
			continue;
		}
		ctx.fillStyle = '#88333323';
		ctx.fillRect(player.pos.x, player.pos.y, player.size.width, player.size.height);
		//draw id of player
		ctx.fillStyle = '#ffffff93';
		ctx.font = '20px Arial';
		ctx.fillText((player.id + 1).toString(), player.pos.x + player.size.width / 2, player.pos.y + player.size.height / 2);
	}
	if (followPlayer !== undefined) {
		ctx.fillStyle = '#883333';
		ctx.fillRect(followPlayer.pos.x, followPlayer.pos.y, followPlayer.size.width, followPlayer.size.height);
		//draw id of player
		ctx.fillStyle = '#ffffff';
		ctx.font = '20px Arial';
		ctx.fillText((followPlayer.id + 1).toString(), followPlayer.pos.x + followPlayer.size.width / 2, followPlayer.pos.y + followPlayer.size.height / 2);
	}
};

const drawFood = (ctx: CanvasRenderingContext2D, food: Array<Array<fruit>>, followPlayerId: number) => {
	for (let i = 0; i < food.length; i++) {
		if (i === followPlayerId) {
			continue;
		}
		for (let fruit of food[i]) {
			ctx.fillStyle = '#33ff3323';
			ctx.fillRect(fruit.pos.x, fruit.pos.y, fruit.size.width, fruit.size.height);
			ctx.fillStyle = '#fffffff3';
			ctx.font = '20px Arial';
			ctx.fillText((i + 1).toString(), fruit.pos.x + fruit.size.width / 2, fruit.pos.y + fruit.size.height / 2);
		}
	}
	for (let fruit of food[followPlayerId]) {
		ctx.fillStyle = '#33ff33';
		ctx.fillRect(fruit.pos.x, fruit.pos.y, fruit.size.width, fruit.size.height);
		ctx.fillStyle = '#ffffff';
		ctx.font = '20px Arial';
		ctx.fillText((followPlayerId + 1).toString(), fruit.pos.x + fruit.size.width / 2, fruit.pos.y + fruit.size.height / 2);
	}
};

const GameContainer: FC<props> = ({ flexSize }) => {
	const [game, setGame] = useState(undefined as unknown as world);
	const [followPlayer, setFollowPlayer] = useState(Array<player>);

	const [autoTick, setAutoTick] = useState(false);

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

	const tick = () => {
		if (game === undefined) {
			setGame(new world({ width: canvasRef.current.width, height: canvasRef.current.height }, 2, 10));
		} else {
			setFollowPlayer([game.players[0]]);

			setGame(game.update());
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoTick) {
				tick();
			}
		}, 1000 / 60);
		return () => clearInterval(interval);
	}, [game, canvasRef, autoTick]);

	return (
		<Box sx={{ flex: flexSize, position: 'relative', zIndex: 0 }}>
			<Typography variant="h3">Gamecontainer</Typography>
			<GameSettings isOpen={openSettings} toggleSettings={() => setOpenSettings(!openSettings)} restartGame={() => setGame(new world())} />
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
			<Box>
				<Button variant="contained" color="primary" onClick={() => tick()}>
					Manual Tick
				</Button>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Typography variant="body1" sx={{ marginRight: '4px' }}>
						Auto tick
					</Typography>
					<Input type="checkbox" onChange={() => setAutoTick(!autoTick)} />
				</Box>
			</Box>
		</Box>
	);
};

export default GameContainer;
