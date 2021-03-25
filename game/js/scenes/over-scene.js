export default class OverScene extends Phaser.Scene {
	constructor() {
		super('OverScene');
	}

	preload() {}

	create() {
		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		let speedhog = this.add.sprite(this.sys.game.canvas.width / 2, 15, 'speedhog');
		let menuButton = this.add
			.sprite(this.sys.game.canvas.width / 2, 92, 'menuButton')
			.setInteractive()
			.on(
				Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
				function () {
					this.scene.start('MenuScene');
				},
				this
			);

		speedhog.play('speedhogAnim');
		menuButton.play('menuAnim');
	}

	update() {}
}
