import Player from './player.js';

export default class HedgehogBrown extends Player {
	constructor(scene) {
		super(-175, [9, 11], [4, 5], scene);
	}

	updateSprite() {
		// Switch animations
		if (this.sprite.body.touching.down) {
			this.sprite.anims.play('hedgehogBrownRunAnim', true);
		} else {
			this.sprite.anims.play('hedgehogBrownJumpAnim', true);
		}
	}
}
