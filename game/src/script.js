import GameScene from "./gameScene.js";
import Player from "./player.js";

let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const currentScene = new GameScene(ctx);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	currentScene.draw(ctx);

	requestAnimationFrame(draw);
}

draw();
