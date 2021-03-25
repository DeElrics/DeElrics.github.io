class Player {
	constructor(x, y, scene) {
		this.scene = scene;
		this.isDead = false;
		this.pos = {
			x: x,
			y: y,
		};
		this.jumpForce = -170;
	}

	create() {
		// Create collider and rendering image to it
		this.collider = this.scene.physics.add.sprite(this.pos.x, this.pos.y, 'playerSheet');
		// Set scale and offset
		this.collider.body.setSize(11, 11);
		this.collider.body.offset = { x: 2, y: 5 };
	}

	jump() {
		if (this.collider.body.touching.down) {
			this.collider.setVelocityY(this.jumpForce);
		}
	}

	shoot() {}

	update(deltaInMS) {
		if (this.scene.cursors.space.isDown) {
			this.jump();
		}
		// Touch input
		this.scene.input.on(
			'pointerdown',
			function (pointer) {
				this.jump();
				/*
				if (pointer.x < this.scene.sys.game.canvas.width / 2) {
					this.jump();
				} else if (pointer.x > this.scene.sys.game.canvas.width / 2) {
					this.shoot();
				}
				*/
			},
			this
		);

		// Switch animations
		if (this.collider.body.touching.down) {
			this.collider.anims.play('playerRunAnimation', true);
		} else {
			this.collider.anims.play('playerJumpAnimation', true);
		}

		this.scene.physics.add.collider(this.collider, this.scene.platform);
	}

	kill() {
		this.isDead = true;
		this.collider.destroy();
		delete this;
	}
}

export default Player;
