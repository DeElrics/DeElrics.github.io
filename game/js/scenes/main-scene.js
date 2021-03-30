import Hedgehog from '../entities/hedgehog.js';
import HedgehogBrown from '../entities/hedgehog-brown.js';
import Hog from '../entities/hog.js';
import HedgehogEnemy from '../entities/hedgehog-enemy.js';
import Sonic from '../entities/sonic.js';

export default class MainScene extends Phaser.Scene {
	constructor() {
		super('MainScene');
	}

	preload() {}

	create() {
		//this.scene.restart('UIScene');

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

		// Fix some stupid bug???
		this.enemies.push(new HedgehogEnemy(100, 10, this));
		this.enemies.pop(0);

		// Create ground
		this.platform = this.physics.add.staticGroup();
		this.platform
			.create(320 / 2, 147, 'platform')
			.setScale(20, 0.2)
			.refreshBody();

		// Draw player and background
		this.backgroundTile = this.add.tileSprite(this.background.sky.pos.x, this.background.sky.pos.y, 640, 360, 'background').setOrigin(0, 0);

		switch (window.localStorage.getItem('character')) {
			case 'hedgehog':
				this.player = new Hedgehog(this);
				break;
			case 'hedgehogBrown':
				this.player = new HedgehogBrown(this);
				break;
			case 'hog':
				this.player = new Hog(this);
				break;
			case 'sonic':
				this.player = new Sonic(this);
				break;
			default:
				this.player = new HedgehogBrown(this);
				break;
		}

		this.groundTile = this.add.tileSprite(this.background.ground.pos.x, this.background.ground.pos.y, 640, 360, 'ground').setOrigin(0, 0);

		// Draw text
		this.scoreText = this.add.text(20, 5, 'SCORE:0', {
			fontFamily: 'pixel font',
			fontSize: 17,
			color: 'rgba(255, 255, 224, 255)',
		});
		this.scoreText.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);
	}

	update(time, delta) {
		let deltaToMS = delta / 1000; // Get delta in ms

		this.scoreText.text = 'SCORE:' + Math.round(this.score);

		if (this.timer <= 500) this.timer += deltaToMS * 1.5;

		if (!this.player.isDead) {
			this.score += deltaToMS * 10;

			// Spawn enemies
			this.enemySpawnTimer -= 205 * deltaToMS;
			if (this.enemySpawnTimer < 0) {
				this.enemySpawnTimer = Phaser.Math.Between(100, 200);
				let enemy = new HedgehogEnemy(this.sys.game.canvas.width + 8, 136, this);
				this.enemies.push(enemy);
				enemy.update();
			}

			this.player.update(deltaToMS);

			for (const enemy of this.enemies) {
				// Destroy enemies if out of bounds
				if (enemy.collider.x < 0 - enemy.collider.w / 2) {
					enemy.collider.destroy();
					this.enemies.splice(0, 1);
				}

				// Kill player
				let that = this;
				if (this.enemies.length > 0) {
					this.physics.add.overlap(this.player.sprite, enemy.collider, () => {
						that.player.kill();
					});
				}
			}

			// Change this
			if (this.background.ground.scrollSpeed <= 400) this.background.ground.scrollSpeed += this.timer / 30000;

			this.backgroundTile.tilePositionX += this.background.sky.scrollSpeed;
			this.groundTile.tilePositionX += this.background.ground.scrollSpeed * deltaToMS;
		} else {
			this.enemies = [];
			window.localStorage.setItem('score', this.score);
			this.scene.stop('MainScene');
			this.scene.start('OverScene');
		}
	}
}
