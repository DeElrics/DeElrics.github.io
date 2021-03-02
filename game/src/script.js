import Player from './player.js'

let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = new Player((canvas.width / 2) - 25, (canvas.height / 2) - 25);

function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    player.draw(ctx);
    ctx.fill();

    player.update();
}

draw();
