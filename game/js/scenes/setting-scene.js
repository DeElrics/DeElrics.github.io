import button from '../utils/button.js';

export default class SettingScene extends Phaser.Scene {
	constructor() {
		super('SettingScene');
	}

	preload() {}

	create() {
		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		button(
			this.sys.game.canvas.width / 2,
			80,
			'resetButton',
			'resetAnim',
			() => {
				window.localStorage.clear();
				scoreText.text = 'SCORE:0';
			},
			this
		);

		button(
			this.sys.game.canvas.width / 2,
			100,
			'backButton',
			'backAnim',
			() => {
				this.scene.stop('SettingScene');
				this.scene.start('MenuScene');
			},
			this
		);

		// Draw text
		let scoreText = this.add.text(20, 5, 'SCORE:' + Math.round(window.localStorage.getItem('score')), {
			fontFamily: 'pixel font',
			fontSize: 17,
			color: 'rgba(255, 255, 224, 255)',
		});
		scoreText.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);
	}

	update(time, delta) {
		let deltaToMS = delta / 1000;
	}
}
