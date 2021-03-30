import button from '../utils/button.js';

export default class ShopScene extends Phaser.Scene {
	constructor() {
		super('ShopScene');
	}

	preload() {}

	create() {
		window.localStorage.setItem('character', 'hedgehog');
		this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);

		button(
			this.sys.canvas.width / 2 - 40,
			80,
			'playerSheet',
			'playerRunAnim',
			() => {
				window.localStorage.setItem('character', 'hedgehog');
			},
			this
		);
		button(
			this.sys.canvas.width / 2 - 20,
			80,
			'sonicSheet',
			'sonicRunAnim',
			() => {
				window.localStorage.setItem('character', 'sonic');
			},
			this
		);
		button(
			this.sys.canvas.width / 2,
			80,
			'hedgehogBrownSheet',
			'hedgehogBrownRunAnim',
			() => {
				window.localStorage.setItem('character', 'hedgehogBrown');
			},
			this
		);
		button(
			this.sys.canvas.width / 2 + 30,
			80,
			'hogSheet',
			'hogRunAnim',
			() => {
				window.localStorage.setItem('character', 'hog');
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
	}

	update(time, delta) {}
}
