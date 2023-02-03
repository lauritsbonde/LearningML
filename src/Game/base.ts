export default class base {
	pos: { x: number; y: number };
	size: { width: number; height: number };
	id: number;

	constructor(startPos?: { x: number; y: number }, startSize?: { width: number; height: number }) {
		if (this.constructor === base) {
			throw new Error('base is an abstract class');
		}
		this.pos = startPos || { x: 0, y: 0 };
		this.size = startSize || { width: 50, height: 50 };
		this.id = 0;
	}
}
