import Player from './player.js';

export default class Hog extends Player {
	constructor(scene) {
		super(-185, [15, 11], [10, 5], scene);
	}

	updateSprite() {
		// Switch animations
		if (this.sprite.body.touching.down) {
			this.sprite.anims.play('hogRunAnim', true);
		} else {
			if (this.sprite.body.velocity.y < 0) this.sprite.anims.play('hogJumpAnim', true);
			else if (this.sprite.body.velocity.y > 0) this.sprite.anims.play('hogFallAnim', true);
		}
	}
}
