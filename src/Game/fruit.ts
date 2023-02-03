import base from './base';

export default class fruit extends base {
	constructor(startPos?: { x: number; y: number }) {
		super(startPos, { width: 40, height: 40 });
	}
}
