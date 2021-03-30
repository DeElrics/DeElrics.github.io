import button from '../utils/button.js';

export default class MenuScene extends Phaser.Scene {
	constructor() {
		super('MenuScene');
	}

	create() {
		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		this.add.sprite(this.sys.game.canvas.width / 2, 15, 'speedhog').play('speedhogAnim');

		button(
			this.sys.game.canvas.width / 2,
			80,
			'playButton',
			'playAnim',
			() => {
				this.scene.stop('MenuScene');
				this.scene.start('MainScene');
			},
			this
		);

		button(
			this.sys.game.canvas.width / 2,
			100,
			'settingsButton',
			'settingsAnim',
			() => {
				this.scene.stop('MenuScene');
				this.scene.start('SettingScene');
			},
			this
		);

		button(
			this.sys.game.canvas.width / 2,
			120,
			'shopButton',
			'shopAnim',
			() => {
				this.scene.stop('MenuScene');
				this.scene.start('ShopScene');
			},
			this
		);

		// Draw text

		let scoreText = this.add.bitmapText(20, 5, 'pixel-font', 'SCORE:' + Math.round(window.localStorage.getItem('score')));

		/*
		let scoreText = this.add.text(20, 5, 'SCORE:' + Math.round(window.localStorage.getItem('score')), {
			fontFamily: 'pixel font',
			fontSize: 17,
			color: 'rgba(255, 255, 224, 255)',
		});
		scoreText.setShadow(2, 1, 'rgba(0, 0, 0, 1)', 0);
		*/
	}

	update() {}
}
