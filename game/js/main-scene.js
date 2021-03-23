import Player from './player.js';
import Enemy from './enemy.js';
import { randomRangeInt } from './script.js';

export default class MainScene extends Phaser.Scene {
	constructor() {
		super('MainScene');
	}

	preload() {
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
				scrollSpeed: 0.8,
			},
		};

		this.score = 0;
		this.timer = 180;
		this.enemySpawnTimer = 180;
		this.enemies = [];

		this.background.sky.image = this.load.image('sky', 'img/background.png');
		this.background.ground.image = this.load.image('ground', 'img/ground.png');

		this.cursors = this.input.keyboard.createCursorKeys();
		this.player = new Player(20, 136, this);

		// Fix some stupid bug???
		this.enemies.push(new Enemy(100, 10, this));
		this.enemies.pop(0);
	}

	create() {
		// Create ground
		this.platform = this.physics.add.staticGroup();
		this.platform
			.create(320 / 2, 147, 'platform')
			.setScale(20, 0.2)
			.refreshBody();

		// Draw player and background
		this.background.sky.tile = this.add.tileSprite(this.background.sky.pos.x, this.background.sky.pos.y, this.background.sky.image.width, this.background.sky.image.height, 'sky').setOrigin(0, 0);
		if (!this.player.isDead) this.player.create();
		this.background.ground.tile = this.add.tileSprite(this.background.ground.pos.x, this.background.ground.pos.y, this.background.ground.image.width, this.background.ground.image.height, 'ground').setOrigin(0, 0);

		// Draw text
		this.scoreText = this.add.text(20, 5, ':D', {
			fontFamily: 'pixel font',
			fontSize: 9,
		});
	}

	update(time, delta) {
		let realTime = delta / 1000; // Get delta in ms

		this.timer += realTime * 1.5;

		this.scoreText.text = 'SCORE: ' + Math.round(this.score);

		if (!this.player.isDead) {
			this.score += realTime * 10;

			// Spawn enemies
			this.enemySpawnTimer -= 205 * realTime;
			if (this.enemySpawnTimer < 0) {
				this.enemySpawnTimer = randomRangeInt(100, 200);
				this.enemies.push(new Enemy(this.sys.game.canvas.width + 8, 136, this));
			}

			if (!this.player.isDead) this.player.update();

			for (let i = 0; i < this.enemies.length; i++) {
				this.enemies[i].update();

				// Destroy enemies if out of bounds
				if (this.enemies[i].collider.x < 0 - this.enemies[i].collider.w / 2 - 5) {
					this.enemies[i].collider.destroy();
					this.enemies.splice(0, 1);
				}

				// Kill player
				let that = this;
				if (this.enemies.length > 0) {
					this.physics.add.overlap(this.player.collider, this.enemies[i].collider, function () {
						that.player.kill();
					});
				}
			}
			// Scroll background
			this.background.ground.scrollSpeed += 1 * (realTime / 90);
			this.background.sky.tile.tilePositionX += this.background.sky.scrollSpeed;
			this.background.ground.tile.tilePositionX += this.background.ground.scrollSpeed;
		} else {
			this.enemies = [];
			window.localStorage.setItem('score', this.score);
		}
	}
}
