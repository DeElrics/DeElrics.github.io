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
				() => {
					this.scene.start('MenuScene');
				},
				this
			);

		// Draw text
		this.scoreText = this.add.text(20, 5, 'SCORE: ' + Math.round(window.localStorage.getItem('score')), {
			fontFamily: 'pixel font',
			fontSize: 17,
		});
		this.scoreText.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);

		speedhog.play('speedhogAnim');
		menuButton.play('menuAnim');
	}

	update() {}
}
