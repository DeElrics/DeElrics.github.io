export default class MenuScene extends Phaser.Scene {
	constructor() {
		super('MenuScene');
	}

	// Load asset
	preload() {
		this.load.image('background', 'img/menu/menu-background.png');
		this.load.spritesheet('playButton', 'img/menu/play-button.png', { frameWidth: 56, frameHeight: 14 });
		this.load.spritesheet('resetButton', 'img/menu/reset-data-button.png', { frameWidth: 94, frameHeight: 14 });
		this.load.spritesheet('speedhog', 'img/menu/menu-logo.png', { frameWidth: 86, frameHeight: 26 });
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0, 0);
		this.speedhog = this.add.sprite(this.sys.game.canvas.width / 2, 15, 'speedhog');

		// Play button
		this.playButton = this.add
			.sprite(this.sys.game.canvas.width / 2, 80, 'playButton')
			.setInteractive()
			.on(
				Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
				function () {
					this.scene.start('MainScene');
				},
				this
			);

		// Reset data button
		this.resetButton = this.add
			.sprite(this.sys.game.canvas.width / 2, 100, 'resetButton')
			.setInteractive()
			.on(
				Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
				function () {
					window.localStorage.clear();
					this.scoreText.text = 'SCORE: ...';
				},
				this
			);

		//  Create animations
		this.anims.create({
			key: 'playAnim',
			frames: this.anims.generateFrameNumbers('playButton'),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'resetAnim',
			frames: this.anims.generateFrameNumbers('resetButton'),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'speedhogAnim',
			frames: this.anims.generateFrameNumbers('speedhog'),
			frameRate: 10,
			repeat: -1,
		});

		// Play animations
		this.speedhog.play('speedhogAnim');
		this.playButton.play('playAnim');
		this.resetButton.play('resetAnim');

		// Draw text
		this.scoreText = this.add.text(20, 5, 'SCORE: ' + Math.round(window.localStorage.getItem('score')), {
			fontFamily: 'pixel font',
			fontSize: 9,
		});
	}

	update() {}
}
