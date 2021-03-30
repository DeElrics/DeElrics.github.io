export default class LoadScene extends Phaser.Scene {
	constructor() {
		super('LoadScene');
	}

	preload() {
		// Backlgrounds
		this.load.image('menuBackground', 'assets/sprites/menu/menu-background.png');
		this.load.image('background', 'assets/sprites/background.png');
		this.load.image('ground', 'assets/sprites/ground.png');

		this.load.bitmapFont('pixel-font', 'assets/data/fonts/pixel-font_0.png', 'assets/data/fonts/pixel-font.fnt');

		// Buttons
		this.load.spritesheet('playButton', 'assets/sprites/menu/play-button.png', { frameWidth: 56, frameHeight: 14 });
		this.load.spritesheet('resetButton', 'assets/sprites/menu/reset-data-button.png', { frameWidth: 94, frameHeight: 14 });
		this.load.spritesheet('speedhog', 'assets/sprites/menu/menu-logo.png', { frameWidth: 86, frameHeight: 26 });
		this.load.spritesheet('menuButton', 'assets/sprites/menu/menu-button.png', { frameWidth: 56, frameHeight: 14 });
		this.load.spritesheet('settingsButton', 'assets/sprites/menu/settings-button.png', { frameWidth: 80, frameHeight: 14 });
		this.load.spritesheet('backButton', 'assets/sprites/menu/back-button.png', { frameWidth: 54, frameHeight: 14 });
		this.load.spritesheet('shopButton', 'assets/sprites/menu/shop-button.png', { frameWidth: 56, frameHeight: 14 });

		// Entities
		this.load.spritesheet('playerSheet', 'assets/sprites/entities/player/hedgehog-sheet.png', { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('hedgehogBrownSheet', 'assets/sprites/entities/player/hedgehog-brown-sheet.png', { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('sonicSheet', 'assets/sprites/entities/player/sonic-sheet.png', { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('hogSheet', 'assets/sprites/entities/player/hog-sheet.png', { frameWidth: 32, frameHeight: 16 });
		this.load.spritesheet('enemySheet', 'assets/sprites/entities/hedgehog-brown-sheet.png', { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		// Buttons animations
		this.anims.create({ key: 'speedhogAnim', frames: this.anims.generateFrameNumbers('speedhog'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'menuAnim', frames: this.anims.generateFrameNumbers('menuButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'playAnim', frames: this.anims.generateFrameNumbers('playButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'resetAnim', frames: this.anims.generateFrameNumbers('resetButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'settingsAnim', frames: this.anims.generateFrameNumbers('settingsButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'backAnim', frames: this.anims.generateFrameNumbers('backButton'), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'shopAnim', frames: this.anims.generateFrameNumbers('shopButton'), frameRate: 10, repeat: -1 });

		// Entities
		this.anims.create({ key: 'enemyRunAnim', frames: this.anims.generateFrameNumbers('enemySheet', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
		this.anims.create({ key: 'hogRunAnim', frames: this.anims.generateFrameNumbers('hogSheet', { start: 0, end: 2 }), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'hogJumpAnim', frames: this.anims.generateFrameNumbers('hogSheet', { start: 1, end: 1 }), frameRate: 0, repeat: 0 });
		this.anims.create({ key: 'hogFallAnim', frames: this.anims.generateFrameNumbers('hogSheet', { start: 2, end: 2 }), frameRate: 0, repeat: 0 });
		this.anims.create({ key: 'hedgehogBrownRunAnim', frames: this.anims.generateFrameNumbers('hedgehogBrownSheet', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
		this.anims.create({ key: 'hedgehogBrownJumpAnim', frames: [{ key: 'hedgehogBrownSheet', frame: 4 }], frameRate: 0 });
		this.anims.create({ key: 'playerRunAnim', frames: this.anims.generateFrameNumbers('playerSheet', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
		this.anims.create({ key: 'playerJumpAnim', frames: [{ key: 'playerSheet', frame: 4 }], frameRate: 0 });
		this.anims.create({ key: 'sonicRunAnim', frames: this.anims.generateFrameNumbers('sonicSheet', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
		this.anims.create({ key: 'sonicJumpAnim', frames: [{ key: 'sonicSheet', frame: 4 }], frameRate: 0 });

		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		this.timer = 3.5;

		// text
		this.studio = this.add.text(this.sys.game.canvas.width / 2 - 52, 70, 'ELRIC STUDIOS', {
			fontFamily: 'pixel font',
			fontSize: 17,
			color: 'rgba(255, 255, 224, 255)',
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
			this.scene.stop('LoadScene');
			this.scene.start('MenuScene');
		});

		if (this.timer <= 0) {
			this.scene.stop('LoadScene');
			this.scene.start('MenuScene');
		}
	}
}
