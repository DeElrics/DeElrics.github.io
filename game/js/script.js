function randomRangeInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

//window.alert('Play?');

let config = {
	type: Phaser.CANVAS,
	width: 320,
	height: 180,
	backgroundColor: '#1a1a1a',
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
	scene: [MainScene],
};

let game = new Phaser.Game(config);
