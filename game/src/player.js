class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.velocity = { x: 0, y: 0 };
        this.speed = 2;
        this.leftKey = false;
        this.rightKey = false;
        this.upKey = false;
        this.downKey = false;
    }

    movement() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        
        if (this.leftKey && !this.rightKey)
            this.velocity.x = -this.speed;
        else if (this.rightKey && !this.leftKey)
            this.velocity.x = this.speed;
        if (this.upKey && !this.downKey)
            this.velocity.y = -this.speed;
        else if (this.downKey && !this.upKey)
            this.velocity.y = this.speed;

        //console.log("right key:", this.rightKey, "left key:", this.leftKey, "down key:", this.downKey, "up key:", this.upKey);

        window.addEventListener('keypress', (event) => {
        });

        window.addEventListener('keydown', (event) => {
            if (event.key == 'd')
                this.rightKey = true;
            else if (event.key == 'a')
                this.leftKey = true;

            if (event.key == 'w')
                this.upKey = true;
            else if (event.key == 's')
                this.downKey = true;
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'd')
                this.rightKey = false;
            else if (event.key == 'a')
                this.leftKey = false;
            
            if (event.key == 'w')
                this.upKey = false;
            else if (event.key == 's')
                this.downKey = false;
        });
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, 50, 50);
        ctx.fillStyle = 'white';
    }

    update(dt) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        this.movement(dt);
    }
}

export default Player;