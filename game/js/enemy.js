class Enemy {
	constructor(x, y, scene) {
		this.scene = scene;
		this.created = false;
		this.pos = {
			x: x,
			y: y,
		};
		this.speed = -180;
		this.collider;
		this.sheet = this.scene.load.spritesheet('enemySheet', 'img/enemy/hedgehog-brown-sheet.png', { frameWidth: 16, frameHeight: 16 });
	}

	update() {
		if (!this.created) {
			this.scene.anims.create({
				key: 'enemyRunAnimation',
				frames: this.scene.anims.generateFrameNumbers('enemySheet', { start: 0, end: 7 }),
				frameRate: 12,
				repeat: -1,
			});

			// Create collider and play animation
			this.collider = this.scene.physics.add.sprite(this.pos.x, this.pos.y, 'enemySheet');
			this.collider.anims.play('enemyRunAnimation', true);

			// Set velocity
			this.collider.setVelocityX(this.speed);

			// Set scale and offset
			this.collider.body.setSize(4, 8);
			this.collider.body.offset = { x: 6, y: 8 };

			this.scene.physics.add.collider(this.collider, this.scene.platform);

			this.created = true;
		}
	}
}
