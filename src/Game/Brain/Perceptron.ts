export default class Perceptron {
	input: number[];
	weights: number[];
	bias: number;

	constructor(numberOfInputs: number, weights?: number[], bias?: number) {
		this.input = new Array(numberOfInputs);
		this.weights = weights || this.randomizeWeights();
		this.bias = bias || 1;
	}

	randomizeWeights() {
		const weights = [];
		for (let i = 0; i < this.input.length; i++) {
			weights[i] = Math.random() * 2 - 1; //between 1 and -1
		}
		return weights;
	}

	activate(input: number[]) {
		let sum = 0;
		this.input = input;
		if (this.input.length !== this.weights.length) throw new Error('Input and weights must be the same length');
		for (let i = 0; i < this.input.length; i++) {
			if (this.input[i] === undefined || this.weights[i] === undefined) throw new Error('Input or weights is undefined');
			sum += this.input[i] * this.weights[i];
		}
		sum = sum * this.bias;
		return [sum];
	}

	sigmoid(x: number) {
		return 1 / (1 + Math.exp(-x));
	}
}
