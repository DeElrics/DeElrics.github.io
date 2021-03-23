class Player {
	constructor(x, y, scene) {
		this.scene = scene;
		this.isDead = false;
		this.pos = {
			x: x,
			y: y,
		};
		this.jumpForce = -190;
		this.collider;
		this.sheet = this.scene.load.spritesheet('playerSheet', 'img/player/hedgehog-sheet.png', { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		// Load animations
		this.scene.anims.create({
			key: 'playerRunAnimation',
			frames: this.scene.anims.generateFrameNumbers('playerSheet', { start: 0, end: 7 }),
			frameRate: 12,
			repeat: -1,
		});
		this.scene.anims.create({
			key: 'playerJumpAnimation',
			frames: [{ key: 'playerSheet', frame: 8 }],
			frameRate: 0,
		});

		// Create collider and rendering image to it
		this.collider = this.scene.physics.add.sprite(this.pos.x, this.pos.y, 'playerSheet');
		this.collider.body.setSize(8, 8);
		this.collider.body.offset = { x: 4, y: 8 };
	}

	jump() {
		if (this.collider.body.touching.down) {
			this.collider.setVelocityY(this.jumpForce);
		}
	}

	update() {
		// Jump
		// Keyboard input
		if (this.scene.cursors.space.isDown) {
			this.jump();
		}
		// Touch input
		this.scene.input.on(
			'pointerdown',
			function (pointer) {
				this.jump();
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
		this.scene.scene.start('OverScene');
	}
}

export default Player;
