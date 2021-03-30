import button from '../utils/button.js';

export default class OverScene extends Phaser.Scene {
	constructor() {
		super('OverScene');
	}

	preload() {}

	create() {
		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		this.add.sprite(this.sys.game.canvas.width / 2, 15, 'speedhog').play('speedhogAnim');

		button(
			this.sys.canvas.width / 2,
			100,
			'menuButton',
			'menuAnim',
			() => {
				this.scene.stop('OverScene');
				this.scene.start('MenuScene');
			},
			this
		);

		// Draw text
		this.scoreText = this.add.text(20, 5, 'SCORE:' + Math.round(window.localStorage.getItem('score')), {
			fontFamily: 'pixel font',
			fontSize: 17,
			color: 'rgba(255, 255, 224, 255)',
		});
		this.scoreText.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);
	}

	update() {}
}
