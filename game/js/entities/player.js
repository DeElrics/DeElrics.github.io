export default class Player {
	constructor(jumpForce, [w, h], [x, y], scene) {
		this.scene = scene;
		let sprite = scene.physics.add.sprite(20, 136, 'hogSheet');

		sprite.body.setSize(w, h);
		sprite.body.offset = { x: x, y: y };
		this.sprite = sprite;
		this.isDead = false;
		this.jumpForce = jumpForce;
	}

	jump() {
		if (this.sprite.body.touching.down) {
			this.sprite.setVelocityY(this.jumpForce);
		}
	}

	update(deltaInMS) {
		if (this.scene.cursors.space.isDown) {
			this.jump();
		}
		this.scene.input.on(
			'pointerdown',
			() => {
				this.jump();
			},
			this
		);

		this.updateSprite();

		this.scene.physics.add.collider(this.sprite, this.scene.platform);
	}

	kill() {
		this.isDead = true;
		this.sprite.destroy();
		delete this;
	}
}
