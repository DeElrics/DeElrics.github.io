const button = (x, y, spriteKey, animKey, fn, scene) => {
	let btn = scene.add.sprite(x, y, spriteKey).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, fn, scene);
	btn.play(animKey);
};

export default button;
