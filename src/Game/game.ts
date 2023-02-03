import World from './world';

export default class Game {
	world: World;
	constructor() {
		this.world = new World();
	}
}
