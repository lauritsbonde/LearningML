import Matrix from '../../src/Game/Brain/Matrix';
import { test, expect, beforeEach } from '@jest/globals';

let m1: Matrix;
let m2: Matrix;

beforeEach(() => {
	m1 = new Matrix(2, 2, [
		[1, 2],
		[3, 4],
	]);
	m2 = new Matrix(2, 2, [
		[5, 6],
		[7, 8],
	]);
});

//SETUP
test('Matrix is setup correctly', () => {
	expect(m1.rows).toBe(2);
	expect(m1.cols).toBe(2);
	expect(m1.data).toEqual([
		[1, 2],
		[3, 4],
	]);
});

test('Matrix randomize', () => {
	m1.randomize();
	expect(m1.data).toEqual([
		[expect.any(Number), expect.any(Number)],
		[expect.any(Number), expect.any(Number)],
	]);
});

test('Matrix from array', () => {
	const m = Matrix.fromArray([1, 2, 3, 4]);
	expect(m.data).toEqual([[1], [2], [3], [4]]);
});

test('Matrix to array', () => {
	const m = m1.toArray();
	expect(m).toEqual([1, 2, 3, 4]);
});

//MULTIPLY
test('Matrix multiply by number', () => {
	m1.multiply(2);
	expect(m1.data).toEqual([
		[2, 4],
		[6, 8],
	]);
});

test('Matrix multiply by matrix', () => {
	m1.multiply(m2);
	expect(m1.data).toEqual([
		[5, 12],
		[21, 32],
	]);
});

test('Matrix multiply by matrix throws error', () => {
	expect(() => {
		m1.multiply(new Matrix(3, 3));
	}).toThrow();
});

test('Static Matrix multiply', () => {
	const m = Matrix.multiply(m1, m2);
	expect(m.data).toEqual([
		[19, 22],
		[43, 50],
	]);
});

test('Static Matrix multiply throws error', () => {
	expect(() => {
		Matrix.multiply(m1, new Matrix(3, 3));
	}).toThrow();
});

//ADDITION
test('Matrix add number', () => {
	m1.add(2);
	expect(m1.data).toEqual([
		[3, 4],
		[5, 6],
	]);
});

test('Matrix add matrix', () => {
	m1.add(m2);
	expect(m1.data).toEqual([
		[6, 8],
		[10, 12],
	]);
});

test('Matrix add matrix throws error', () => {
	expect(() => {
		m1.add(new Matrix(3, 3));
	}).toThrow();
});

//TRANSPOSE
test('Matrix transposed', () => {
	const m = new Matrix(2, 3, [
		[1, 2, 3],
		[4, 5, 6],
	]);
	const t = Matrix.transpose(m);
	expect(t.data).toEqual([
		[1, 4],
		[2, 5],
		[3, 6],
	]);
});

//MAP
test('Matrix map', () => {
	m1.map((x) => x * 2);
	expect(m1.data).toEqual([
		[2, 4],
		[6, 8],
	]);
});
