export default class LoadScene extends Phaser.Scene {
	constructor() {
		super('LoadScene');
	}

	preload() {
		// Load sprites
		this.load.image('menuBackground', 'assets/sprites/menu/menu-background.png');
		this.load.image('background', 'assets/sprites/background.png');
		this.load.image('ground', 'assets/sprites/ground.png');

		// Load spritesheets
		this.load.spritesheet('playButton', 'assets/sprites/menu/play-button.png', { frameWidth: 56, frameHeight: 14 });
		this.load.spritesheet('resetButton', 'assets/sprites/menu/reset-data-button.png', { frameWidth: 94, frameHeight: 14 });
		this.load.spritesheet('speedhog', 'assets/sprites/menu/menu-logo.png', { frameWidth: 86, frameHeight: 26 });
		this.load.spritesheet('menuButton', 'assets/sprites/menu/menu-button.png', { frameWidth: 56, frameHeight: 14 });
		this.load.spritesheet('playerSheet', 'assets/sprites/player/hedgehog-sheet.png', { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('enemySheet', 'assets/sprites/enemy/hedgehog-brown-sheet.png', { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		// Create all animations
		this.anims.create({ key: 'menuAnim', frames: this.anims.generateFrameNumbers('menuButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'speedhogAnim', frames: this.anims.generateFrameNumbers('speedhog'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'playAnim', frames: this.anims.generateFrameNumbers('playButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'resetAnim', frames: this.anims.generateFrameNumbers('resetButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'enemyRunAnimation', frames: this.anims.generateFrameNumbers('enemySheet', { start: 0, end: 7 }), frameRate: 12, repeat: -1 });
		this.anims.create({ key: 'playerRunAnimation', frames: this.anims.generateFrameNumbers('playerSheet', { start: 0, end: 7 }), frameRate: 12, repeat: -1 });
		this.anims.create({ key: 'playerJumpAnimation', frames: [{ key: 'playerSheet', frame: 8 }], frameRate: 0 });

		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		this.timer = 3.5;

		// text
		this.studio = this.add.text(this.sys.game.canvas.width / 2 - 52, 70, 'ELRIC STUDIOS', {
			fontFamily: 'pixel font',
			fontSize: 17,
		});
		this.studio.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);
		this.studio.alpha = 0;
		this.changeAlpha = false;
	}

	update(time, delta) {
		let deltaToMS = delta / 1000;

		this.timer -= deltaToMS;

		// Higher alpha
		if (this.timer <= 3.2 && !this.changeAlpha) {
			this.studio.alpha += 0.8 * deltaToMS;
			if (this.studio.alpha === 1) this.changeAlpha = true;
		} else if (this.changeAlpha) this.studio.alpha -= 0.8 * deltaToMS;

		this.input.on('pointerdown', () => {
			this.scene.start('MenuScene');
		});

		if (this.timer <= 0) {
			// Start game
			this.scene.start('MenuScene');
		}
	}
}
