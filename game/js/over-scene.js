export default class OverScene extends Phaser.Scene {
	constructor() {
		super('OverScene');
	}

	preload() {
		this.load.image('background', 'img/menu/menu-background.png');
		this.load.spritesheet('menuButton', 'img/menu/menu-button.png', { frameWidth: 56, frameHeight: 14 });
		this.load.spritesheet('speedhog', 'img/menu/menu-logo.png', { frameWidth: 86, frameHeight: 26 });
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0, 0);
		this.speedhog = this.add.sprite(this.sys.game.canvas.width / 2, 15, 'speedhog');

		this.menuButton = this.add
			.sprite(this.sys.game.canvas.width / 2, 92, 'menuButton')
			.setInteractive()
			.on(
				Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
				function () {
					this.scene.start('MenuScene');
				},
				this
			);

		this.anims.create({
			key: 'speedhogAnim',
			frames: this.anims.generateFrameNumbers('speedhog'),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'menuAnim',
			frames: this.anims.generateFrameNumbers('menuButton'),
			frameRate: 10,
			repeat: -1,
		});

		this.speedhog.play('speedhogAnim');
		this.menuButton.play('menuAnim');
	}

	update() {
		// Touch input
		this.input.on(
			'pointerdown',
			function (pointer) {
				this.scene.start('MenuScene');
			},
			this
		);
	}
}
