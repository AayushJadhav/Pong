import Paddle from "./paddle.js";
import Ball from "./ball.js";

//canvas class to create canvas.
class Canvas {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.ctx = this.canvas.getContext("2d");
    }

    //function that clears canvas every frame for smooth animation.
    clear() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
}

const canvas = new Canvas();
export const c = canvas.ctx;
const h1First = document.getElementById("first-score");
const h1Second = document.getElementById("second-score");

const keys = {
    "upPressed": false,
    "downPressed": false
}


var firstPaddle, secondPaddle;
var ball;

//event for resizing canvas everytime window of browser is resized.
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
    secondPaddle.velocity = {
        veloX: 0,
        veloY: ball.velocity.veloY
    }
    
    if (keys.upPressed) {
        firstPaddle.velocity.veloY = -8
    } else if (keys.downPressed) {
        firstPaddle.velocity.veloY = 8;
    } else {
        firstPaddle.velocity.veloY = 0;
    }
    
    boundaryCollision(firstPaddle, secondPaddle, ball);
    
    bounce();
    scoreHandler();
    firstPaddle.draw();
    secondPaddle.draw();
    ball.draw();
}

//bouncing function
function bounce() {
    if (
        //if ball hits left side of right paddle.
        ball.pos.posX > secondPaddle.pos.posX - ball.radius &&
        //if ball hits top side of right paddle.
        ball.pos.posY > secondPaddle.pos.posY &&
        //if ball hits bottom side of right paddle.
        ball.pos.posY < secondPaddle.pos.posY + secondPaddle.height ||
        //if ball hits right side of left paddle.
        ball.pos.posX < 30 + ball.radius &&
        //if ball hits top side of left paddle.
        ball.pos.posY > firstPaddle.pos.posY &&
        //if ball hits bottom side of left paddle.
        ball.pos.posY < firstPaddle.pos.posY + firstPaddle.height
    ) {
        ball.velocity.veloX = -ball.velocity.veloX;
    }
}

//boundary collision function for halting paddles and bouncing ball.
function boundaryCollision(o1, o2, o3) {
    //o1 reaches canvas's extreme bottom.
    if (o1.pos.posY > canvas.canvas.height - o1.height) {
        o1.pos.posY = canvas.canvas.height - o1.height;
      //o1 reaches canvas's extreme top.
    } else if (o1.pos.posY < 0) {
        o1.pos.posY = 0;
    }

    //o2 reaches canvas's extreme bottom.
    if (o2.pos.posY > canvas.canvas.height - o2.height) {
        o2.pos.posY = canvas.canvas.height - o2.height;
      //o2 reaches canvas's extreme top.
    } else if (o2.pos.posY < 0) {
        o2.pos.posY = 0;
    }

    //o3 reaches canvas's extreme bottom OR extreme top.
    if (
        o3.pos.posY > canvas.canvas.height - o3.radius ||
        o3.pos.posY < 0
    ) {
        o3.velocity.veloY = -o3.velocity.veloY;
    }
}

//score handling function for increasing scores and reseting ball.
function scoreHandler() {
    //when ball reaches right canvas.
    if (ball.pos.posX > canvas.canvas.width - ball.radius) {
        //resetting ball positions.
        ball.pos = {
            posX: innerWidth / 2,
            posY: innerHeight / 2
        }

        // resetting ball velocity.
        ball.velocity = {
            veloX: Math.round(Math.random() * 6),
            veloY: Math.round(Math.random() * 6)
        }

        //adjusting balls velocity.
        if (ball.velocity.veloX == 0) {
            ball.velocity.veloX = 1;
        } else if (ball.velocity.veloY == 0) {
            ball.velocity.veloY = 1;
        }

        //increasing left score by first checking what is its textContent and then parsing(changing) into integer finally adding 1.
        h1First.textContent = parseInt(h1First.textContent) + 1;
    } else if (ball.pos.posX < 0) {
        //resetting ball positions.
        ball.pos = {
            posX: innerWidth / 2,
            posY: innerHeight / 2
        }

        // resetting ball velocity.
        ball.velocity = {
            veloX: Math.round(Math.random() * 6),
            veloY: Math.round(Math.random() * 6)
        }

        //adjusting balls velocity.
        if (ball.velocity.veloX == 0) {
            ball.velocity.veloX = 1;
        } else if (ball.velocity.veloY == 0) {
            ball.velocity.veloY = 1;
        }

        //increasing right score by first checking what is its textContent and then parsing(changing) into integer finally adding 1.
        h1Second.textContent = parseInt(h1Second.textContent) + 1;
    }
}

//keyboard events.
addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 87:
            keys.upPressed = true;
            keys.downPressed = false;
            break;
        case 83:
            keys.upPressed = false;
            keys.downPressed = true;
            break;
    }
});

addEventListener('keyup', e => {
    switch (e.keyCode) {
        case 87:
            keys.upPressed = false
            keys.downPressed = false;
            break;
        case 83:
            keys.upPressed = false;
            keys.downPressed = false;
            break;
    }
});
