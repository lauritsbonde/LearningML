export default class Matrix {
	rows: number;
	cols: number;

	data: number[][];

	constructor(rows: number, cols: number, data?: number[][]) {
		this.rows = rows;
		this.cols = cols;
		this.data = [];

		if (data) {
			this.data = data;
		} else {
			for (let i = 0; i < this.rows; i++) {
				this.data[i] = [];
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] = 0;
				}
			}
		}
	}

	static fromArray(arr: number[]) {
		const m = new Matrix(arr.length, 1);
		for (let i = 0; i < arr.length; i++) {
			m.data[i][0] = arr[i];
		}
		return m;
	}

	toArray() {
		const arr = [];
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				arr.push(this.data[i][j]);
			}
		}
		return arr;
	}

	multiply(n: number | Matrix) {
		if (n instanceof Matrix) {
			if (this.cols !== n.rows) {
				throw new Error('Columns of A must match rows of B.');
			}
			// hadamard product
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] *= n.data[i][j];
				}
			}
		} else {
			// Scalar product
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] = this.data[i][j] * n;
				}
			}
		}
	}

	static multiply(a: Matrix, b: Matrix) {
		// Matrix product
		if (a.cols !== b.rows) {
			throw new Error('Columns of A must match rows of B.');
		}
		const result = new Matrix(a.rows, b.cols);
		for (let i = 0; i < result.rows; i++) {
			for (let j = 0; j < result.cols; j++) {
				// Dot product of values in col
				let sum = 0;
				for (let k = 0; k < a.cols; k++) {
					sum += a.data[i][k] * b.data[k][j];
				}
				result.data[i][j] = sum;
			}
		}
		return result;
	}

	static transpose(m: Matrix) {
		const result = new Matrix(m.cols, m.rows);
		for (let i = 0; i < m.rows; i++) {
			for (let j = 0; j < m.cols; j++) {
				result.data[j][i] = m.data[i][j];
			}
		}
		return result;
	}

	add(n: number | Matrix) {
		if (n instanceof Matrix) {
			if (this.cols !== n.cols || this.rows !== n.rows) {
				throw new Error('Columns and Rows of A must match Columns and Rows of B.');
			}
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] += n.data[i][j];
				}
			}
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] += n;
				}
			}
		}
	}

	randomize() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.data[i][j] = Math.random() * 2 - 1;
			}
		}
	}

	map(func: (n: number) => number) {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				const val = this.data[i][j];
				this.data[i][j] = func(val);
			}
		}
	}

	copy() {
		const m = new Matrix(this.rows, this.cols);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				m.data[i][j] = this.data[i][j];
			}
		}
		return m;
	}
}
