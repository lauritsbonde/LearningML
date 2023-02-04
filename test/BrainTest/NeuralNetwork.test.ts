import NeuralNetwork from '../../src/Game/Brain/NerualNetwork';
import { test, expect, beforeEach } from '@jest/globals';

let nn: NeuralNetwork;

beforeEach(() => {
	nn = new NeuralNetwork(2, 4, 2);
});

//SETUP
test('NeuralNetwork is setup correctly', () => {
	expect(nn.inputNodes).toBe(2);
	expect(nn.hiddenNodes).toBe(4);
	expect(nn.outputNodes).toBe(2);

	expect(nn.weightsIH.rows).toBe(4);
	expect(nn.weightsIH.cols).toBe(2);

	expect(nn.weightsHO.rows).toBe(2);
	expect(nn.weightsHO.cols).toBe(4);

	expect(nn.hiddenBias.rows).toBe(4);
	expect(nn.hiddenBias.cols).toBe(1);

	expect(nn.outputBias.rows).toBe(2);
	expect(nn.outputBias.cols).toBe(1);
});

test('NeuralNetwork feedForward', () => {
	const output = nn.feedforward([1, 0]);
	expect(output).toEqual([expect.any(Number), expect.any(Number)]);
});
