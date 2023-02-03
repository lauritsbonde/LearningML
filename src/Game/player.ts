import base from './base';
import NeuralNetwork from './Brain/NerualNetwork';

export default class player extends base {
	id: number;
	acceleration: { x: number; y: number };
	velocity: { x: number; y: number };

	randomVector: { x: number; y: number };

	worldSize: { width: number; height: number };

	brain: NeuralNetwork;

	score: number;

	constructor(id: number, foodsInWorld: number, startPos?: { x: number; y: number }, startSize?: { width: number; height: number }, worldSize?: { width: number; height: number }) {
		super(startPos, startSize);

		this.id = id;

		this.acceleration = { x: 0, y: 0 };
		this.velocity = { x: 0, y: 0 };
		this.randomVector = { x: 0, y: 0 };

		this.worldSize = worldSize || { width: 601, height: 564 }; //601 and 564 are for my screen size, change it to your screen size

		const inputNodes = 2 + foodsInWorld;
		// inputnodes = 2 for x and y position of the player
		// inputnodes += foodsInWorld for the distance to each food
		// 4 hidden nodes
		// 2 output nodes for x and y acceleration
		this.brain = new NeuralNetwork(inputNodes, 4, 2);

		this.score = 0;
	}

	randomMovement() {
		if (Math.random() < 0.2) {
			this.randomVector.x = Math.random() * 2 - 1;
			this.randomVector.y = Math.random() * 2 - 1;
		}

		this.accelerate(this.randomVector);
	}

	think(food: base[]) {
		const distanceToFoods = food.map((f) => this.distanceToFood(f));
		const input = [this.pos.x, this.pos.y, ...distanceToFoods];
		const brainOutput = this.brain.feedforward(input);
		console.log(brainOutput);
		this.accelerate({ x: brainOutput[0], y: brainOutput[1] });
	}

	distanceToFood(food: base) {
		return Math.sqrt(Math.pow(food.pos.x - this.pos.x, 2) + Math.pow(food.pos.y - this.pos.y, 2));
	}

	accelerate(vector: { x: number; y: number }) {
		this.acceleration.x = vector.x;
		this.acceleration.y = vector.y;

		this.velocity.x += this.acceleration.x;
		this.velocity.y += this.acceleration.y;
	}

	move() {
		//601 is for my screen size, change it to your screen size
		if (this.pos.x + this.velocity.x < 0 || this.pos.x + this.velocity.x + this.size.width > this.worldSize.width) {
			this.velocity.x = (this.velocity.x / 30) * -1;
		}
		if (this.pos.y + this.velocity.y < 0 || this.pos.y + this.velocity.y + this.size.height > this.worldSize.height) {
			this.velocity.y = (this.velocity.y / 30) * -1;
		}
		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;
	}

	update(food: base[]) {
		this.think(food);
		this.move();
	}
}
