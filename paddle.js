import { c } from './sketch.js';

export default class Paddle {
    constructor(x, y, width, height) {
        this.pos = {
            posX: x,
            posY: y
        }
        this.width = width;
        this.height = height;

        this.velocity = {
            veloX: 0,
            veloY: 0
        }
    }

    draw() {
        c.fillStyle = "white";
        c.fillRect(this.pos.posX, this.pos.posY, this.width, this.height);
        this.pos.posY += this.velocity.veloY;
    }
}