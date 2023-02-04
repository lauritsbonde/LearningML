import base from './base';
import NeuralNetwork from './Brain/NerualNetwork';

export default class player extends base {
	id: number;
	acceleration: { x: number; y: number };
	velocity: { x: number; y: number };

	randomVector: { x: number; y: number };

	worldSize: { width: number; height: number };

	inputNodes: number;
	hiddenNodes: number;
	outputNodes: number;

	brain: NeuralNetwork;

	score: number;
	distanceTravelled: number;

	maxSpeed: number;

	constructor(
		id: number,
		foodsInWorld: number,
		startPos?: { x: number; y: number },
		startSize?: { width: number; height: number },
		worldSize?: { width: number; height: number },
		brain?: NeuralNetwork,
		brainHiddenLayers?: number,
		maxSpeed?: number
	) {
		super(startPos, startSize);

		this.id = id;

		this.acceleration = { x: 0, y: 0 };
		this.velocity = { x: 0, y: 0 };
		this.randomVector = { x: 0, y: 0 };

		this.worldSize = worldSize || { width: 601, height: 564 }; //601 and 564 are for my screen size, change it to your screen size

		this.inputNodes = Object.keys(this.pos).length + foodsInWorld + Object.keys(this.acceleration).length + Object.keys(this.velocity).length + 1;
		// inputnodes = 2 for x and y position of the player
		// inputnodes += foodsInWorld for the distance to each food
		// inputnodes += 2 for the current acceleration of the player
		// inputnodes += 2 for the current velocity of the player
		// inputnodes += 1 for the distance to border
		// 4 hidden nodes
		this.hiddenNodes = Math.floor(this.inputNodes * 1.5);
		// 2 output nodes for x and y acceleration
		this.outputNodes = 2;
		this.brain = brain || new NeuralNetwork(this.inputNodes, this.hiddenNodes, brainHiddenLayers || 2, this.outputNodes);

		this.score = 0;
		this.distanceTravelled = 0;

		this.maxSpeed = maxSpeed || 3;
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
		const input = [this.pos.x, this.pos.y, ...distanceToFoods, this.acceleration.x, this.acceleration.y, this.velocity.x, this.velocity.y, this.distanceToBorder()];
		const brainOutput = this.brain.feedforward(input);
		this.accelerate({ x: brainOutput[0], y: brainOutput[1] });
	}

	distanceToFood(food: base) {
		return Math.sqrt(Math.pow(food.pos.x + food.size.width / 2 - this.pos.x + this.size.width / 2, 2) + Math.pow(food.pos.y + food.size.height / 2 - this.pos.y + this.size.height / 2, 2));
	}

	distanceToBorder() {
		return Math.sqrt(Math.pow(this.pos.x + this.size.width / 2 - this.worldSize.width / 2, 2) + Math.pow(this.pos.y + this.size.height / 2 - this.worldSize.height / 2, 2));
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

		// Limit speed
		if (this.velocity.x > this.maxSpeed) {
			this.velocity.x = this.maxSpeed;
		} else if (this.velocity.x < -this.maxSpeed) {
			this.velocity.x = -this.maxSpeed;
		}

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		this.distanceTravelled += Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
	}

	update(food: base[]) {
		this.think(food);
		this.move();
	}
}
