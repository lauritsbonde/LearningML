import { Typography, Box } from '@mui/material';
import React, { useState, FC, useEffect } from 'react';
import Canvas from './Canvas';
import useCanvas from '../../Hooks/useCanvas';
import world from '../../Game/world';
import player from '../../Game/player';
import fruit from '../../Game/fruit';
import GameSettings from './GameSettings';

interface props {
	flexSize: number;
}

const drawPlayers = (ctx: CanvasRenderingContext2D, players: Array<player>) => {
	ctx.fillStyle = 'red';
	for (let player of players) {
		ctx.fillRect(player.pos.x, player.pos.y, player.size.width, player.size.height);
	}
};

const drawFood = (ctx: CanvasRenderingContext2D, food: Array<fruit>) => {
	ctx.fillStyle = 'green';
	for (let fruit of food) {
		ctx.fillRect(fruit.pos.x, fruit.pos.y, fruit.size.width, fruit.size.height);
	}
};

const GameContainer: FC<props> = ({ flexSize }) => {
	const [game, setGame] = useState(undefined as unknown as world);
	const [followPlayer, setFollowPlayer] = useState(Array<player>);

	const [openSettings, setOpenSettings] = useState(false);

	const draw = (ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (game !== undefined) {
			drawFood(ctx, game.fruits);
			drawPlayers(ctx, game.players);
		}
	};

	const canvasRef = useCanvas(draw);

	useEffect(() => {
		const interval = setInterval(() => {
			if (game === undefined) {
				setGame(new world({ width: canvasRef.current.width, height: canvasRef.current.height }));
			} else {
				setFollowPlayer([game.players[0], game.players[1]]);

				setGame(game.update());
			}
		}, 1000 / 30);
		return () => clearInterval(interval);
	}, [game]);

	return (
		<Box sx={{ flex: flexSize, position: 'relative', zIndex: 0 }}>
			<Typography variant="h3">Gamecontainer</Typography>
			<GameSettings isOpen={openSettings} toggleSettings={() => setOpenSettings(!openSettings)} restartGame={() => setGame(new world())} />
			<Canvas draw={draw} canvasRef={canvasRef} />

			<Box>
				<Typography variant="h4">Player 1</Typography>
				{followPlayer.length > 0 && (
					<>
						<Typography variant="body1">Current score: {followPlayer[0].score}</Typography>
					</>
				)}
			</Box>
		</Box>
	);
};

export default GameContainer;
