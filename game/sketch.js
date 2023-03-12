// Engine
let canvas = {
  width: 400,
  height: 560,
  marginTop: 38,
}

// In Game
let fps = 60;
let backgroundColor = '#59656f';
let gameOver = false;
let gameWin = false;
let score = 0;

// Paddle
let paddle;
const paddleWidth = 100;
const paddleHeight = 15;
const paddleInitialPosition = new Vector(canvas.width / 2 - paddleWidth / 2, canvas.height - paddleHeight * 2);
const paddleSpeed = 200;
const paddleColor = '#f7aef8';

// Ball
let ball;
const ballRadius = 8;
const ballInitialPosition = new Vector(canvas.width / 2, paddleInitialPosition.y - 100);
const ballSpeed = 150;
const ballColor = '#fff';
const ballDeadzone = canvas.height - 10;

// Brick
let bricks = [];
let brickWidth = 50;
let brickHeight = 24;
let brickMargin = 2;
let brickMarginHalf = brickMargin / 2;
let brickColors = ["#540d6e", "#ee4266", "#ffd23f", "#3bceac", "#0ead69", "#f4845f"]

function createBricks() {
  const cols = canvas.width / brickWidth;
  const rows = 6;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pos = new Vector(x * brickWidth + brickMarginHalf, y * brickHeight + brickMarginHalf + canvas.marginTop);
      const brick = new Brick(canvas, pos, brickWidth - brickMargin, brickHeight - brickMargin, brickColors[y]);
      bricks.push(brick);
    }
  }
}

function startGame() {
  createBricks();
  paddle = new Paddle(canvas, paddleInitialPosition, paddleWidth, paddleHeight, paddleSpeed, paddleColor);
  ball = new Ball(canvas, ballInitialPosition, ballRadius, ballSpeed, ballDeadzone, ballColor);
}

function resetGame() {
  bricks = [];
  paddle = null;
  ball = null;
  score = 0;
}


function preload() {
  soundFormats('wav');
  sfx.ball = loadSound('game/sfx/ball');
  sfx.brick = loadSound('game/sfx/brick');
  sfx.win = loadSound('game/sfx/win');
  sfx.gameover = loadSound('game/sfx/gameover');
}

function setup() {
  createCanvas(canvas.width, canvas.height);
  frameRate(fps);

  startGame();
}

function draw() {
  background(backgroundColor);

  const dt = deltaTime / 1000;
  const isDead = ball?.isDead();

  if (isDead) {
    if (!sfx.gameover?.isPlaying()) {
      sfx.gameover?.play();
    }
    textAlign(CENTER);

    textSize(50);
    fill('#ee4266');
    text(`GAME OVER`, canvas.width / 2, canvas.height / 2);

    textSize(16);
    fill('#fff');
    text(`press R to restart`, canvas.width / 2, (canvas.height / 2) + 24);
  }
  else if (bricks.length <= 0) {
    if (!sfx.win?.isPlaying()) {
      sfx.win?.play();
    }
    textAlign(CENTER);

    textSize(50);
    fill('#0ead69');
    text(`YOU WIN`, canvas.width / 2, canvas.height / 2);

    textSize(16);
    fill('#fff');
    text(`press R to restart`, canvas.width / 2, (canvas.height / 2) + 24);
  } else {
    // input's
    paddle?.input();

    // update's
    paddle?.update(dt);
    ball?.update(dt, paddle);
    ball?.checkCollisionWithPaddle(paddle, sfx);
    bricks.forEach((brick, index, object) => {
      if (ball?.checkCollisionWithBrick(brick)) {
        object.splice(index, 1);
        sfx.brick?.play();
      }
    });

    // draw's
    paddle?.draw();
    ball?.draw();
    bricks.forEach(brick => brick.draw());

    // ui
    /* 
      fill('#ffffff');
      textSize(22);
      textAlign(LEFT);
      text(`SCORE: ${score}`, 14, 28);
    */
    fill('#ffffff');
    textAlign(CENTER);
    textSize(16);
    text(`[A D] or [LEFT RIGHT] to move`, canvas.width / 2, 24);
  }
}

function keyPressed() {
  switch (keyCode) {
    case R_KEY:
      startGame();
      break;
  }
}