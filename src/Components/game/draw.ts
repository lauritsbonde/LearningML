import player from '../../Game/player';
import fruit from '../../Game/fruit';

export function drawPlayers(ctx: CanvasRenderingContext2D, players: Array<player>, followPlayer?: player) {
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
}

export function drawFood(ctx: CanvasRenderingContext2D, food: Array<Array<fruit>>, followPlayerId: number) {
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
}
