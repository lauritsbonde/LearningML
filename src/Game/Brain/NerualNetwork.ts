import Matrix from './Matrix';

export default class NeuralNetwork {
	inputNodes: number;
	hiddenNodes: number;
	numberOfHiddenLayers: number;
	outputNodes: number;

	weights: Matrix[];
	biases: Matrix[];

	// weightsIH: Matrix;
	// weightsHO: Matrix;

	// hiddenBias: Matrix;
	// outputBias: Matrix;

	constructor(
		inputNodes: number,
		hiddenNodes: number,
		numberOfHiddenLayers: number,
		outputNodes: number,
		// weights?: { weightsIH: Matrix; weightsHO: Matrix; hiddenBias: Matrix; outputBias: Matrix },
		weights?: { weights: Matrix[]; biases: Matrix[] },
		learningRate?: number
	) {
		this.inputNodes = inputNodes;
		this.hiddenNodes = hiddenNodes;
		this.numberOfHiddenLayers = numberOfHiddenLayers;
		this.outputNodes = outputNodes;

		if (weights !== undefined) {
			this.weights = weights.weights;
			this.biases = weights.biases;

			this.mutate(learningRate || 0.05);
		} else {
			this.weights = [];
			this.biases = [];

			for (let i = 0; i < this.numberOfHiddenLayers; i++) {
				if (i === 0) {
					const matrix = new Matrix(this.hiddenNodes, this.inputNodes);
					matrix.randomize();
					this.weights.push(matrix);
				} else {
					const matrix = new Matrix(this.hiddenNodes, this.hiddenNodes);
					matrix.randomize();
					this.weights.push(matrix);
				}
				const bias = new Matrix(this.hiddenNodes, 1);
				bias.randomize();
				this.biases.push(bias);
			}

			// add the output layer
			const matrix = new Matrix(this.outputNodes, this.hiddenNodes);
			matrix.randomize();
			this.weights.push(matrix);

			const bias = new Matrix(this.outputNodes, 1);
			bias.randomize();
			this.biases.push(bias);
		}
	}

	feedforward(input: number[]) {
		let inputs: Matrix = Matrix.fromArray(input);

		for (let i = 0; i < this.numberOfHiddenLayers; i++) {
			inputs = Matrix.multiply(this.weights[i], inputs);
			inputs.add(this.biases[i]);
			inputs.map(this.tahn);
		}

		const output = Matrix.multiply(this.weights[this.weights.length - 1], inputs);
		output.add(this.biases[this.biases.length - 1]);
		output.map(this.tahn);

		return output.toArray();
	}

	mutate(learningRate: number) {
		for (let i = 0; i < this.weights.length; i++) {
			this.weights[i].map((x) => {
				if (Math.random() < 0.1) {
					return x + Math.random() * learningRate * 2 - learningRate;
				} else {
					return x;
				}
			});
		}
		for (let i = 0; i < this.biases.length; i++) {
			this.biases[i].map((x) => {
				if (Math.random() < 0.1) {
					return x + Math.random() * learningRate * 2 - learningRate;
				} else {
					return x;
				}
			});
		}
	}

	sigmoid(x: number) {
		return 1 / (1 + Math.exp(-x));
	}

	tahn(x: number) {
		return Math.tanh(x);
	}

	copy() {
		return new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.numberOfHiddenLayers, this.outputNodes, {
			weights: this.weights.map((x) => x.copy()),
			biases: this.biases.map((x) => x.copy()),
		});
	}
}
