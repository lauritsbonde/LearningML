import NeuralNetwork from '../../src/Game/Brain/NerualNetwork';
import { test, expect, beforeEach } from '@jest/globals';

let nn: NeuralNetwork;

beforeEach(() => {
	nn = new NeuralNetwork(2, 4, 4, 2);
});

//SETUP
test('NeuralNetwork is setup correctly', () => {
	expect(nn).toBeInstanceOf(NeuralNetwork);
	expect(nn.inputNodes).toBe(2);
	expect(nn.hiddenNodes).toBe(4);
	expect(nn.outputNodes).toBe(2);

	expect(nn.weights.length).toBe(5); // 4 hidden layers + 1 output layer
	expect(nn.biases.length).toBe(5); // 4 hidden layers + 1 output layer
});

test('NeuralNetwork feedForward', () => {
	const output = nn.feedforward([1, 0]);
	expect(output).toEqual([expect.any(Number), expect.any(Number)]);
});
