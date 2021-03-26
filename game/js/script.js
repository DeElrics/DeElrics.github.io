// TODO: Different maps && draw all different tilesets
// TODO: Different characters && draw all sprites
// TODO: Sonic skin at 1k meeters ran
// TODO: Improve UI
// TODO: Shop menu && save all data
// TODO: Settings menu
// TODO: Fine tune mechanics
// TODO: Add highscore
// TODO: Shooting
// TODO: Change background speed!!!!!!!!

// Import scenes
import MenuScene from './scenes/menu-scene.js';
import MainScene from './scenes/main-scene.js';
import OverScene from './scenes/over-scene.js';
import LoadScene from './scenes/load-scene.js';

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
			debug: true,
		},
	},
	scene: [LoadScene, MenuScene, MainScene, OverScene],
};

let game = new Phaser.Game(config);
