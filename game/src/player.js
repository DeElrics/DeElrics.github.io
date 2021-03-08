export default class Player {
	constructor(x, y) {
		this.position = {
			x: x,
			y: y,
		};

		this.velocity = {
			x: 0,
			y: 0,
		};
		this.speed = 1.5;

		// Gravity
		this.gravity = {
			value: 0.7,
			addedValue: 0.05,
			shouldAdd: true,
			shouldReset: true,
			add() {
				if (this.shouldAdd) this.value += this.addedValue;
				return this.value;
			},
			stop() {
				this.value = 0;
				this.shouldAdd = false;
			},
			reset() {
				this.value = 0.7;
				this.shouldAdd = true;
			},
		};

		// Input
		this.leftKey = false;
		this.rightKey = false;
		this.upKey = false;
		this.downKey = false;

		// Animation
		this.img = document.getElementById("playerimage");
		this.frameDelay = 40;
		this.frameIndex = {
			x: 0,
			y: 0,
		};
		this.frameSize = {
			width: 48,
			height: 48,
		};

		this.keyDown = false;
	}

	movement() {
		this.velocity.x = (this.rightKey - this.leftKey) * this.speed;

		this.velocity.y = 0;

		// Input
		window.addEventListener("keydown", event => {
			if (event.key === "d") this.rightKey = true;
			else if (event.key === "a") this.leftKey = true;
			if (event.key === "w") this.upKey = true;
			else if (event.key === "s") this.downKey = true;
		});
		window.addEventListener("keyup", event => {
			if (event.key === "d") this.rightKey = false;
			else if (event.key === "a") this.leftKey = false;
			if (event.key === "w") this.upKey = false;
			else if (event.key === "s") this.downKey = false;
		});
		window.addEventListener("keypress", event => {
			if (event.keyCode === 32) {
				this.velocity.y = -50;
			}
		});

		if (this.position.y > 400) this.gravity.stop();
		else this.velocity.y = this.gravity.add();
	}

	// Changing animations
	animation() {
		if (this.velocity.x != 0) this.frameIndex.y = 1;
		else this.frameIndex.y = 0;

		if (this.velocity.x > 0) this.flip = false;
		else if (this.velocity.x < 0) this.flip = true;
	}

	update() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.movement();
		this.animation();
	}

	draw(ctx) {
		this.update();

		ctx.fillStyle = "white";
		//ctx.fillRect(this.position.x, this.position.y, this.frameSize.width, this.frameSize.height);

		this.animate(this.position.x, this.position.y, this.frameSize.width, this.frameSize.height, 4, 27, "img/hedgehog" + this.anim + ".png", ctx);
	}

	// Animate
	animate(x, y, frameWidth, frameHeight, frameAmount, speed, src, ctx) {
		this.frameDelay--;

		if (this.frameDelay <= 0) {
			this.frameIndex.x++;
			this.frameDelay = speed;

			if (this.frameIndex.x >= frameAmount) {
				this.frameIndex.x = 0;
			}
		}

		ctx.drawImage(this.img, frameWidth * this.frameIndex.x, frameHeight * this.frameIndex.y, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
	}
}
