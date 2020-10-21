const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = (Math.round(window.innerWidth / 100) * 100) - 100;
const HEIGHT = canvas.height = (Math.round(window.innerHeight / 100) * 100) - 100;



function Ground(color) {
    this.color = color;
    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.beginPath();
        ctx.moveTo(WIDTH / 2, 0);
        ctx.lineTo(WIDTH / 2, HEIGHT);
        ctx.stroke();
    }
}

function Bracket(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.speed = 15;

    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.moveUp = function () {
        if (this.y <= 0)
            this.y = 0;
        else
            this.y -= this.speed;
    }

    this.moveDown = function () {
        if (this.y >= (HEIGHT - this.height))
            this.y = (HEIGHT - this.height);
        else
            this.y += this.speed;
    }
}

function Ball(x, y, radius, velX, velY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velX = velX;
    this.velY = velY;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    this.update = function () {
        if ((this.y + this.radius) > HEIGHT || this.y + radius < 0) {
            this.velY = -this.velY;
        }
    }
}

function collision(ball, player) {

}


let bracketHeight = 200;

let playGround = new Ground('white');
let bracket1 = new Bracket(0, (HEIGHT - bracketHeight) / 2, 10, bracketHeight, 'green');
let bracket2 = new Bracket(WIDTH - 10, (HEIGHT - bracketHeight) / 2, 10, bracketHeight, 'blue');
let ball = new Ball((WIDTH / 2), (HEIGHT / 2), 15, 4, 4, 'brown');
let animation1 = true;


function print() {
    pressKey();
    playGround.draw();
    bracket1.draw();
    bracket2.draw();
    ball.draw();
    ball.update();
    if (animation1)
        animation1 = window.requestAnimationFrame(print);
    else
        window.cancelAnimationFrame(animation1);
}

function pressKey() {
    document.onkeydown = function (code) {
        if (code.keyCode == 38) {
            bracket1.moveUp();
        }
        if (code.keyCode == 40) {
            bracket1.moveDown();
        }
    }
}

animation1 = window.requestAnimationFrame(print);

function stopAnimation() {

}