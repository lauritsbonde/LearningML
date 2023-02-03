import player from './player';
import fruit from './fruit';
import base from './base';

export default class world {
	players: Array<player>;
	fruits: Array<fruit>;

	numberOfFruits: number;
	numberOfPlayers: number;

	worldSize: { width: number; height: number };

	constructor(worldSize?: { width: number; height: number }, numberOfFruits?: number, numberOfPlayers?: number) {
		this.worldSize = worldSize || { width: 601, height: 564 }; //601 and 564 are for my screen size, change it to your screen size

		this.numberOfFruits = numberOfFruits || 5;
		this.fruits = new Array<fruit>();
		for (let i = 0; i < this.numberOfFruits; i++) {
			this.spawnFruit();
		}

		this.numberOfPlayers = numberOfPlayers || 1;
		this.players = new Array<player>();
		for (let i = 0; i < this.numberOfPlayers; i++) {
			this.addPlayer();
		}
	}

	addPlayer() {
		this.players.push(new player(this.players.length, this.fruits.length, undefined, undefined, this.worldSize));
	}

	spawnFruit() {
		const spawnpos = {
			x: Math.floor(Math.random() * (this.worldSize.width - 40)),
			y: Math.floor(Math.random() * (this.worldSize.height - 40)),
		};
		this.fruits.push(new fruit(spawnpos));
	}

	updatePlayers() {
		this.players.forEach((player) => {
			player.update(this.fruits);
		});
	}

	checkPlayerFruitCollision() {
		this.players.forEach((player) => {
			for (let i = 0; i < this.fruits.length; i++) {
				if (this.overlappingRect(player, this.fruits[i])) {
					player.score++;
					this.fruits.splice(i, 1);
					this.spawnFruit();
				}
			}
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
		return this;
	}
}
