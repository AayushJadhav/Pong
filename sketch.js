import Paddle from "./paddle.js";
import Ball from "./ball.js";

class Canvas {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.ctx = this.canvas.getContext("2d");
    }

    clear() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
}

const canvas = new Canvas();
export const c = canvas.ctx;
const h1First = document.getElementById("first-score");
const h1Second = document.getElementById("second-score");

var firstPaddle, secondPaddle;
var ball;

addEventListener('resize', () => {
    canvas.canvas.width = innerWidth;
    canvas.canvas.height = innerHeight;
});

setup();

function setup() {
    firstPaddle = new Paddle(10, (canvas.canvas.height / 2) - 30, 20, 60);
    secondPaddle = new Paddle(canvas.canvas.width - 30, (canvas.canvas.height / 2) - 30, 20, 60);
    ball = new Ball();

    draw();
}

function draw() {
    requestAnimationFrame(draw);
    canvas.clear();

    if (
        ball.pos.posX >= secondPaddle.pos.posX - ball.radius &&
        ball.pos.posY > secondPaddle.pos.posY &&
        ball.pos.posY < secondPaddle.pos.posY + secondPaddle.height ||
        ball.pos.posX < 30 + ball.radius &&
        ball.pos.posY > firstPaddle.pos.posY &&
        ball.pos.posY < firstPaddle.pos.posY + firstPaddle.height
    ) {
        ball.velocity.veloX = -ball.velocity.veloX;
    }

    if (ball.pos.posX > canvas.canvas.width - ball.radius) {
        ball.pos = {
            posX: innerWidth / 2,
            posY: innerHeight / 2
        }
        ball.velocity = {
            veloX: Math.round(Math.random() * 6),
            veloY: Math.round(Math.random() * 6)
        }
        if (ball.velocity.veloX == 0) {
            ball.velocity.veloX = 1;
        } else if (ball.velocity.veloY == 0) {
            ball.velocity.veloY = 1;
        }
    } else if (ball.pos.posX < 0) {
        ball.pos = {
            posX: innerWidth / 2,
            posY: innerHeight / 2
        }
        ball.velocity = {
            veloX: Math.round(Math.random() * 6),
            veloY: Math.round(Math.random() * 6)
        }
        if (ball.velocity.veloX == 0) {
            ball.velocity.veloX = 1;
        } else if (ball.velocity.veloY == 0) {
            ball.velocity.veloY = 1;
        }
    }

    boundaryCollision(firstPaddle, secondPaddle, ball);

    scoreHandler();
    firstPaddle.draw();
    secondPaddle.draw();
    ball.draw();
}

function boundaryCollision(o1, o2, o3) {
    if (o1.pos.posY > canvas.canvas.height - o1.height) {
        o1.pos.posY = canvas.canvas.height - o1.height;
    } else if (o1.pos.posY < 0) {
        o1.pos.posY = 0;
    }

    if (o2.pos.posY > canvas.canvas.height - o2.height) {
        o2.pos.posY = canvas.canvas.height - o2.height;
    } else if (o2.pos.posY < 0) {
        o2.pos.posY = 0;
    }

    if (
        o3.pos.posY > canvas.canvas.height - o3.radius ||
        o3.pos.posY < 0
    ) {
        o3.velocity.veloY = -o3.velocity.veloY;
    }
}

function scoreHandler() {
    
}

addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 87:
            firstPaddle.velocity.veloY = -8;
            break;
        case 83:
            firstPaddle.velocity.veloY = 8;
            break;
        case 38:
            secondPaddle.velocity.veloY = -8;
            break;
        case 40:
            secondPaddle.velocity.veloY = 8;
            break;
    }
});

addEventListener('keyup', e => {
    switch (e.keyCode) {
        case 87:
            firstPaddle.velocity.veloY = 0;
            break;
        case 83:
            firstPaddle.velocity.veloY = 0;
            break;
        case 38:
            secondPaddle.velocity.veloY = 0;
            break;
        case 40:
            secondPaddle.velocity.veloY = 0;
            break;
    }
});