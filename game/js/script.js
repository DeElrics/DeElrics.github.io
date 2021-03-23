// TODO: Different maps && draw all different tilesets
// TODO: Different characters && draw all sprites
// TODO: Sonic skin at 1k meeters ran
// TODO: Improve UI
// TODO: Shop menu && save all data
// TODO: Settings menu
// TODO: Fine tune mechanics
// TODO: Add highscore

import MenuScene from './menu-scene.js';
import MainScene from './main-scene.js';
import OverScene from './over-scene.js';

export function randomRangeInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

let config = {
	type: Phaser.CANVAS,
	width: 320,
	height: 180,
	backgroundColor: '#1a1a1a',
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
			debug: false,
		},
	},
	scene: [MenuScene, MainScene, OverScene],
};

let game = new Phaser.Game(config);
