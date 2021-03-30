export default class HedgehogEnemy {
	constructor(x, y, scene) {
		this.scene = scene;
		this.created = false;
		this.pos = {
			x: x,
			y: y,
		};
		this.speed = -this.scene.timer - 20;
		this.collider;
	}

	update() {
		if (!this.created) {
			// Create collider and play animation
			this.collider = this.scene.physics.add.sprite(this.pos.x, this.pos.y, 'enemySheet');
			this.collider.anims.play('enemyRunAnim', true);

			// Set velocity
			this.collider.setVelocityX(this.speed);

			// Set scale and offset
			this.collider.body.setSize(11, 10);
			this.collider.body.offset = { x: 2, y: 6 };

			this.scene.physics.add.collider(this.collider, this.scene.platform);

			this.created = true;
		}
	}
}
