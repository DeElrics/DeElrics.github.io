// TODO: Different maps && draw all different tilesets
// TODO: Add highscore

// Import scenes
import MenuScene from './scenes/menu-scene.js';
import MainScene from './scenes/main-scene.js';
import OverScene from './scenes/over-scene.js';
import LoadScene from './scenes/load-scene.js';
import SettingScene from './scenes/setting-scene.js';
import ShopScene from './scenes/shop-scene.js';

let config = {
	type: Phaser.CANVAS,
	width: 320,
	height: 180,
	backgroundColor: '#11181c',
	pixelArt: true,
	scale: {
		zoom: 3,
	},
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 800,
			},
			fps: 60,
			debug: false,
		},
	},
	scene: [LoadScene, MenuScene, MainScene, OverScene, SettingScene, ShopScene],
};

let game = new Phaser.Game(config);
