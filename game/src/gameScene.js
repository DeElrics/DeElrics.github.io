import Player from "./player.js";

export default class GameScene {
	constructor() {
		this.player = new Player(canvas.width / 2 - 24, 0);
	}

	update() {}

	draw(ctx) {
		this.update();

		this.player.draw(ctx);
	}
}
