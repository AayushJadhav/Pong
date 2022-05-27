import { c } from "./sketch.js";

export default class Ball {
    constructor () {
        this.pos = {
            posX: innerWidth / 2,
            posY: innerHeight / 2
        }
        this.radius = 10;

        this.velocity = {
            veloX: 4,
            veloY: 4
        }
        if (this.velocity.veloX == 0) {
            this.velocity.veloX = 1;
        } else if (this.velocity.veloY == 0) {
            this.velocity.veloY = 1;
        }
    }

    draw () {
        c.beginPath();
        c.fillStyle = "white";
        c.arc(this.pos.posX, this.pos.posY, this.radius, 0, Math.PI*2);
        c.fill();
        c.closePath();

        this.pos.posX += this.velocity.veloX;
        this.pos.posY += this.velocity.veloY;
    }
}
