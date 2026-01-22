let colisaoBorderDireita = false;
let colisaoBorderEsquerda = false;
let colisaoBorderEsquerdaOponente = false;
let colisaoBorderDireitaOponente = false;

function configurar() {
  //setup code by Lauanda Nobre
  createCanvas(windowWidth / 1.6, windowHeight / 1.3); ///2 * 1.5
  noStroke();
  frameRate(30);

  gameEnded = false;
  showGameModeSelector();
}

function desenhar() {
  //criar canvas
  background(15, 3, 20);
  strokeWeight(6);
  stroke(255, 144, 53);
  rect(0, 0, width, height);

  jogar();
}

function jogar() {
  if (gameEnded) return; // Stop game loop if game ended
  moveball();
  colisaoPlayerBall();
  colisaoOponenteBall();
  moverPlayer();
  IA();
  calcularPontos();
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
  raio: 10,
  x: 0,
  y: 0,

  xspeed: 4.8,
  yspeed: 4.2,

  xdirection: 1,
  ydirection: 1,
};
let oponente = {
  x: 0,
  y: 0,

  width: 60,
  height: 12,
};
function posicoesIniciais() {
  //posicao inicial do jogador
  player.x = width / 2 - player.width / 2;
  player.y = height - 25;

  //posicao inicial do oponente
  oponente.x = width / 2 - oponente.width / 2;
  oponente.y = 15;

  //posicao inicial da bola
  let n = [1, -1];

  ball.x = random(10, width - 10);
  ball.y = height / 2;
  ball.ydirection = random(n);
  ball.xspeed = 4.8;
  ball.yspeed = 4.2;
}
function multiplicando() {
  ball.yspeed = ball.yspeed + v;
  ball.xspeed = ball.xspeed + v;
}
function colisaoPlayerBall() {
  if (
    player.x + player.width >= ball.x &&
    player.x <= ball.x + ball.raio &&
    player.y + player.height >= ball.y &&
    player.y <= ball.y + ball.raio
  ) {
    ball.y = ball.y - 7;
    ball.ydirection *= -1;
    multiplicando();
  }
}

function colisaoOponenteBall() {
  if (
    oponente.x + oponente.width >= ball.x &&
    oponente.x <= ball.x + ball.raio &&
    oponente.y + oponente.height >= ball.y &&
    oponente.y <= ball.y + ball.raio
  ) {
    ball.y = ball.y + 7;
    ball.ydirection *= -1;
    multiplicando();
  }
}

function moveball() {
  ball.x = ball.x + ball.xspeed * ball.xdirection;
  ball.y = ball.y + ball.yspeed * ball.ydirection;

  // o oposto de um numero positivo é seu negativo
  if (ball.x > width - ball.raio || ball.x < ball.raio) {
    ball.xdirection *= -1;
  }
  // desenhar ball
  stroke(225, 144, 53);
  strokeWeight(4);
  fill(15, 3, 20);
  ellipse(ball.x, ball.y, ball.raio, ball.raio);
}

function ver() {
  if (player.x + player.width >= width) {
    colisaoBorderDireita = true;
  }
  if (player.x <= 0) {
    colisaoBorderEsquerda = true;
  }
}

function moverPlayer() {
  let velocidade = 10;
  rect(player.x, player.y, player.width, player.height, 3);

  ver();
  if (keyIsDown(RIGHT_ARROW) && colisaoBorderDireita === false) {
    player.x = player.x + velocidade;
    colisaoBorderEsquerda = false;
  }
  if (keyIsDown(LEFT_ARROW) && colisaoBorderEsquerda === false) {
    player.x = player.x - velocidade;
    colisaoBorderDireita = false;
  }
}
let pontosOponent = 0;
let pontos = 0;
let winTarget = 5; // Default to 5 points
let gameEnded = false; // Flag to prevent multiple victory calls

function calcularPontos() {
  if (player.y + 100 < ball.y) {
    pontosOponent = pontosOponent + 1;
    posicoesIniciais();
  }
  if (oponente.y - 100 > ball.y) {
    pontos = pontos + 1;
    posicoesIniciais();
  }
  document.getElementById("player").textContent = pontos;
  document.getElementById("oponente").textContent = pontosOponent;
}
