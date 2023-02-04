import Matrix from './Matrix';

export default class NeuralNetwork {
	inputNodes: number;
	hiddenNodes: number;
	outputNodes: number;

	weightsIH: Matrix;
	weightsHO: Matrix;

	hiddenBias: Matrix;
	outputBias: Matrix;

	constructor(inputNodes: number, hiddenNodes: number, outputNodes: number, weights?: { weightsIH: Matrix; weightsHO: Matrix; hiddenBias: Matrix; outputBias: Matrix }, learningRate?: number) {
		this.inputNodes = inputNodes;
		this.hiddenNodes = hiddenNodes;
		this.outputNodes = outputNodes;

		if (weights !== undefined) {
			this.weightsIH = weights.weightsIH;
			this.weightsHO = weights.weightsHO;

			this.hiddenBias = weights.hiddenBias;
			this.outputBias = weights.outputBias;

			this.mutate(learningRate || 0.05);
		} else {
			this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
			this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);

			this.weightsHO.randomize();
			this.weightsIH.randomize();

			this.hiddenBias = new Matrix(this.hiddenNodes, 1);
			this.outputBias = new Matrix(this.outputNodes, 1);

			this.hiddenBias.randomize();
			this.outputBias.randomize();
		}
	}

	feedforward(input: number[]) {
		let inputs: Matrix = Matrix.fromArray(input);

		// Generating the hidden outputs
		let hiddenOutputs: Matrix = Matrix.multiply(this.weightsIH, inputs);
		hiddenOutputs.add(this.hiddenBias);
		hiddenOutputs.map(this.sigmoid);

		// Generating the output's output!
		let outputOutputs: Matrix = Matrix.multiply(this.weightsHO, hiddenOutputs);
		outputOutputs.add(this.outputBias);
		outputOutputs.map(this.sigmoid);

		outputOutputs.map((x: number) => x * 2 - 1);

		return outputOutputs.toArray();
	}

	mutate(learningRate: number) {
		this.weightsIH.map((x: number) => x + (Math.random() - 0.5) * learningRate);
		this.weightsHO.map((x: number) => x + (Math.random() - 0.5) * learningRate);
		this.hiddenBias.map((x: number) => x + (Math.random() - 0.5) * learningRate);
		this.outputBias.map((x: number) => x + (Math.random() - 0.5) * learningRate);
	}

	sigmoid(x: number) {
		return 1 / (1 + Math.exp(-x));
	}

	tahn(x: number) {
		return Math.tanh(x);
	}

	copy() {
		return new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes, {
			weightsIH: this.weightsIH.copy(),
			weightsHO: this.weightsHO.copy(),
			hiddenBias: this.hiddenBias.copy(),
			outputBias: this.outputBias.copy(),
		});
	}
}
