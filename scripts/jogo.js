let collisionBorderRight = false;
let collisionBorderLeft = false;
let collisionBorderLeftOpponent = false;
let collisionBorderRightOpponent = false;

function setup() {
  // Setup code by Lauanda Nobre
  createCanvas(windowWidth / 1.6, windowHeight / 1.3); ///2 * 1.5
  noStroke();
  frameRate(30);

  gameEnded = false;
  showGameModeSelector();
}

function draw() {
  // Create canvas
  background(15, 3, 20);
  strokeWeight(6);
  stroke(255, 144, 53);
  rect(0, 0, width, height);

  play();
}

function play() {
  if (gameEnded) return; // Stop game loop if game ended
  moveBall();
  collisionPlayerBall();
  collisionOpponentBall();
  movePlayer();
  AI();
  calculateScore();
  victory();
}

let v = 0.25;

let player = {
  x: 0,
  y: 0,

  width: 60,
  height: 12,
};
let ball = {
  radius: 10,
  x: 0,
  y: 0,

  xspeed: 4.8,
  yspeed: 4.2,

  xdirection: 1,
  ydirection: 1,
};
let opponent = {
  x: 0,
  y: 0,

  width: 60,
  height: 12,
};
function initialPositions() {
  // Player initial position
  player.x = width / 2 - player.width / 2;
  player.y = height - 25;

  // Opponent initial position
  opponent.x = width / 2 - opponent.width / 2;
  opponent.y = 15;

  // Ball initial position
  let n = [1, -1];

  ball.x = random(10, width - 10);
  ball.y = height / 2;
  ball.ydirection = random(n);
  ball.xspeed = 4.8;
  ball.yspeed = 4.2;
  victoryShown = false;
}
function multiplying() {
  ball.yspeed = ball.yspeed + v;
  ball.xspeed = ball.xspeed + v;
}
function collisionPlayerBall() {
  if (
    player.x + player.width >= ball.x &&
    player.x <= ball.x + ball.radius &&
    player.y + player.height >= ball.y &&
    player.y <= ball.y + ball.radius
  ) {
    ball.y = ball.y - 7;
    ball.ydirection *= -1;
    multiplying();
  }
}

function collisionOpponentBall() {
  if (
    opponent.x + opponent.width >= ball.x &&
    opponent.x <= ball.x + ball.radius &&
    opponent.y + opponent.height >= ball.y &&
    opponent.y <= ball.y + ball.radius
  ) {
    ball.y = ball.y + 7;
    ball.ydirection *= -1;
    multiplying();
  }
}

function moveBall() {
  ball.x = ball.x + ball.xspeed * ball.xdirection;
  ball.y = ball.y + ball.yspeed * ball.ydirection;

  // The opposite of a positive number is its negative
  if (ball.x > width - ball.radius || ball.x < ball.radius) {
    ball.xdirection *= -1;
  }
  // Draw ball
  stroke(225, 144, 53);
  strokeWeight(4);
  fill(15, 3, 20);
  ellipse(ball.x, ball.y, ball.radius, ball.radius);
}

function checkBorders() {
  if (player.x + player.width >= width) {
    collisionBorderRight = true;
  }
  if (player.x <= 0) {
    collisionBorderLeft = true;
  }
}

function movePlayer() {
  let speed = 10;
  rect(player.x, player.y, player.width, player.height, 3);

  checkBorders();
  if (keyIsDown(RIGHT_ARROW) && collisionBorderRight === false) {
    player.x = player.x + speed;
    collisionBorderLeft = false;
  }
  if (keyIsDown(LEFT_ARROW) && collisionBorderLeft === false) {
    player.x = player.x - speed;
    collisionBorderRight = false;
  }
}
let opponentScore = 0;
let playerScore = 0;
let winTarget = 5; // Default of 5 points
let gameEnded = false; // Prevent multiple calls

function calculateScore() {
  if (player.y + 100 < ball.y) {
    opponentScore = opponentScore + 1;
    initialPositions();
  }
  if (opponent.y - 100 > ball.y) {
    playerScore = playerScore + 1;
    initialPositions();
  }
  document.getElementById("player").textContent = playerScore;
  document.getElementById("opponent").textContent = opponentScore;
}
