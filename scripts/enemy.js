function AI() {
  let speed = 10;

  stroke(97, 0, 255);
  strokeWeight(4);
  fill(15, 3, 20);
  rect(opponent.x, opponent.y, opponent.width, opponent.height, 3);

  if (ball.y < height / 2 && ball.ydirection < 0) {
    // Move opponent to play
    if (ball.x > opponent.x + opponent.width / 2 + speed) {
      // Move to the right
      if (opponent.x + opponent.width <= width) {
        // Screen limit
        opponent.x += speed;
      }
    }
    if (ball.x < opponent.x + opponent.width / 2 - speed) {
      // Move to the left
      if (opponent.x + opponent.width <= width) {
        // Screen limit
        opponent.x -= speed;
      }
    }
  } else {
    // Position opponent in the center
    if (opponent.x + opponent.width / 2 < width / 2) {
      opponent.x += speed;
    }
    if (opponent.x + opponent.width / 2 > width / 2) {
      opponent.x -= speed;
    }
  }
}
