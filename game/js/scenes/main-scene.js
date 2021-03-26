import Player from '../entities/player.js';
import Enemy from '../entities/enemy.js';

export default class MainScene extends Phaser.Scene {
	constructor() {
		super('MainScene');
	}

	preload() {}

	create() {
		this.background = {
			sky: {
				pos: {
					x: 0,
					y: 0,
				},
				scrollSpeed: 0.4,
			},
			ground: {
				pos: {
					x: 0,
					y: 0,
				},
				// 0.8
				scrollSpeed: 100,
			},
		};

		this.score = 0;
		this.timer = 180;
		this.enemySpawnTimer = this.timer;
		this.enemies = [];

		this.cursors = this.input.keyboard.createCursorKeys();
		this.player = new Player(20, 136, this);

		// Fix some stupid bug???
		this.enemies.push(new Enemy(100, 10, this));
		this.enemies.pop(0);

		// Create ground
		this.platform = this.physics.add.staticGroup();
		this.platform
			.create(320 / 2, 147, 'platform')
			.setScale(20, 0.2)
			.refreshBody();

		// Draw player and background
		this.backgroundTile = this.add.tileSprite(this.background.sky.pos.x, this.background.sky.pos.y, 640, 360, 'background').setOrigin(0, 0);
		this.player.create();
		this.groundTile = this.add.tileSprite(this.background.ground.pos.x, this.background.ground.pos.y, 640, 360, 'ground').setOrigin(0, 0);

		// Draw text
		this.scoreText = this.add.text(20, 5, 'SCORE: ...', {
			fontFamily: 'pixel font',
			fontSize: 17,
		});
		this.scoreText.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);
	}

	update(time, delta) {
		let deltaToMS = delta / 1000; // Get delta in ms

		if (this.timer <= 500) this.timer += deltaToMS * 1.5;

		this.scoreText.text = 'SCORE: ' + Math.round(this.score);

		if (!this.player.isDead) {
			this.score += deltaToMS * 10;

			// Spawn enemies
			this.enemySpawnTimer -= 205 * deltaToMS;
			if (this.enemySpawnTimer < 0) {
				this.enemySpawnTimer = Phaser.Math.Between(100, 200);
				this.enemies.push(new Enemy(this.sys.game.canvas.width + 8, 136, this));
			}

			this.player.update(deltaToMS);

			for (let i = 0; i < this.enemies.length; i++) {
				this.enemies[i].update();

				// Destroy enemies if out of bounds
				if (this.enemies[i].collider.x < 0 - this.enemies[i].collider.w / 2) {
					this.enemies[i].collider.destroy();
					this.enemies.splice(0, 1);
				}

				// Kill player
				let that = this;
				if (this.enemies.length > 0) {
					this.physics.add.overlap(this.player.collider, this.enemies[i].collider, () => {
						that.player.kill();
					});
				}
			}

			// Scroll background
			/*
			this.background.ground.scrollSpeed += 0.009 * deltaToMS;
			this.backgroundTile.tilePositionX += this.background.sky.scrollSpeed;
			this.groundTile.tilePositionX += this.background.ground.scrollSpeed;
			*/

			// Change this
			if (this.background.ground.scrollSpeed <= 400) this.background.ground.scrollSpeed += this.timer / 30000;

			console.log(Math.round(this.background.ground.scrollSpeed), Math.round(this.timer));

			this.backgroundTile.tilePositionX += this.background.sky.scrollSpeed;
			this.groundTile.tilePositionX += this.background.ground.scrollSpeed * deltaToMS;
		} else {
			this.enemies = [];
			window.localStorage.setItem('score', this.score);
			this.scene.start('OverScene');
		}
	}
}
