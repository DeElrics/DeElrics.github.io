export default class MenuScene extends Phaser.Scene {
	constructor() {
		super('MenuScene');
	}

	create() {
		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		let speedhog = this.add.sprite(this.sys.game.canvas.width / 2, 15, 'speedhog');
		let playButton = this.add
			.sprite(this.sys.game.canvas.width / 2, 80, 'playButton')
			.setInteractive()
			.on(
				Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
				function () {
					this.scene.start('MainScene');
				},
				this
			);
		let resetButton = this.add
			.sprite(this.sys.game.canvas.width / 2, 100, 'resetButton')
			.setInteractive()
			.on(
				Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
				function () {
					window.localStorage.clear();
					scoreText.text = 'SCORE: 0';
				},
				this
			);

		// Play animations
		speedhog.play('speedhogAnim');
		playButton.play('playAnim');
		resetButton.play('resetAnim');

		// Draw text
		let scoreText = this.add.text(20, 5, 'SCORE: ' + Math.round(window.localStorage.getItem('score')), {
			fontFamily: 'pixel font',
			fontSize: 16,
		});
		scoreText.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);
	}

	update() {}
}
