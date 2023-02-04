import player from './player';
import fruit from './fruit';
import base from './base';
import NeuralNetwork from './Brain/NerualNetwork';
import Matrix from './Brain/Matrix';

export default class world {
	players: Array<player>;
	fruits: Array<Array<fruit>>;

	numberOfFruits: number;
	numberOfPlayers: number;

	worldSize: { width: number; height: number };

	ticksBetweenNewGeneration: number;
	ticksSinceLastGeneration: number;
	generationCount: number;

	constructor(worldSize?: { width: number; height: number }, numberOfFruits?: number, numberOfPlayers?: number, ticksBetweenNewGeneration?: number) {
		this.worldSize = worldSize || { width: 601, height: 564 }; //601 and 564 are for my screen size, change it to your screen size

		this.ticksBetweenNewGeneration = ticksBetweenNewGeneration || 30 * 10;
		this.ticksSinceLastGeneration = 0;
		this.generationCount = 0;

		this.numberOfFruits = numberOfFruits || 5;
		this.numberOfPlayers = numberOfPlayers || 1;

		this.fruits = new Array<Array<fruit>>();
		this.spawnAllFruits();

		this.players = new Array<player>();
		for (let i = 0; i < this.numberOfPlayers; i++) {
			this.addPlayer();
		}
	}

	addPlayer() {
		this.players.push(new player(this.players.length, this.numberOfFruits, undefined, undefined, this.worldSize));
	}

	spawnAllFruits() {
		const fruits = new Array<Array<fruit>>();
		for (let i = 0; i < this.numberOfPlayers; i++) {
			const fruitsForPlayer = new Array<fruit>();
			for (let j = 0; j < this.numberOfFruits; j++) {
				const spawnpos = {
					x: Math.floor(Math.random() * (this.worldSize.width - 40)),
					y: Math.floor(Math.random() * (this.worldSize.height - 40)),
				};
				fruitsForPlayer.push(new fruit(spawnpos));
			}
			fruits.push(fruitsForPlayer);
		}
		this.fruits = fruits;
	}

	spawnFruitForPlayer(player: player) {
		const spawnpos = {
			x: Math.floor(Math.random() * (this.worldSize.width - 40)),
			y: Math.floor(Math.random() * (this.worldSize.height - 40)),
		};
		this.fruits[player.id].push(new fruit(spawnpos));
	}

	updatePlayers() {
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].update(this.fruits[i]);
		}
	}

	checkPlayerFruitCollision() {
		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.fruits[i].length; j++) {
				if (this.overlappingRect(this.players[i], this.fruits[this.players[i].id][j])) {
					this.players[i].score++;
					this.fruits[this.players[i].id].splice(j, 1);
					this.spawnFruitForPlayer(this.players[i]);
					this.updateLeaderboard();
				}
			}
		}
	}

	updateLeaderboard() {
		this.players.sort((a, b) => {
			return b.score - a.score;
		});
	}

	overlappingRect(rect: base, rect2: base) {
		if (rect.pos.x < rect2.pos.x + rect2.size.width && rect.pos.x + rect.size.width > rect2.pos.x && rect.pos.y < rect2.pos.y + rect2.size.height && rect.pos.y + rect.size.height > rect2.pos.y) {
			return true;
		}
	}

	update() {
		this.updatePlayers();
		this.checkPlayerFruitCollision();
		this.ticksSinceLastGeneration++;
		if (this.ticksSinceLastGeneration >= this.ticksBetweenNewGeneration) {
			this.newGeneration();
		}
		return this;
	}

	newGeneration() {
		this.ticksSinceLastGeneration = 0;
		this.generationCount++;

		let bestPlayer = this.players[0]; //sorted by score
		if (bestPlayer.score === 0) {
			bestPlayer = this.players.sort((a, b) => {
				return b.distanceTravelled - a.distanceTravelled;
			})[0];
		}

		const bestPlayerBrain = this.players[0].brain.copy();
		//reset the players
		this.players = new Array<player>();

		//add new players with the best player brain
		for (let i = 0; i < this.numberOfPlayers; i++) {
			const copyBrain = bestPlayerBrain.copy();
			copyBrain.mutate(0.05);
			this.players.push(new player(i, this.fruits.length, undefined, undefined, this.worldSize, copyBrain));
		}

		//reset the fruits
		this.fruits = new Array<Array<fruit>>();
		this.spawnAllFruits();
	}
}
