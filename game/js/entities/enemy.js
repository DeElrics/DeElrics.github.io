class Enemy {
	constructor(x, y, scene) {
		this.scene = scene;
		this.created = false;
		this.pos = {
			x: x,
			y: y,
		};
		this.speed = -this.scene.timer;
		this.collider;
	}

	update() {
		if (!this.created) {
			// Create collider and play animation
			this.collider = this.scene.physics.add.sprite(this.pos.x, this.pos.y, 'enemySheet');
			this.collider.anims.play('enemyRunAnimation', true);

			// Set velocity
			this.collider.setVelocityX(this.speed);

			// Set scale and offset
			this.collider.body.setSize(11, 11);
			this.collider.body.offset = { x: 2, y: 5 };

			this.scene.physics.add.collider(this.collider, this.scene.platform);

			this.created = true;
		}
	}
}

export default Enemy;
