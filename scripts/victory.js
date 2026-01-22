function showGameModeSelector() {
  const existing = document.getElementById("gameModeSelector");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "gameModeSelector";
  overlay.className = "gamemode-overlay";

  const container = document.createElement("div");
  container.className = "gamemode-container";

  const title = document.createElement("p");
  title.className = "gamemode-title";
  title.textContent = "Choose game mode";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "gamemode-buttons";

  const modes = [
    { points: 1, text: "1 Point" },
    { points: 3, text: "3 Points" },
    { points: 5, text: "5 Points" },
  ];

  modes.forEach((mode) => {
    const button = document.createElement("button");
    button.className = "gamemode-button";
    button.textContent = mode.text;
    button.addEventListener("click", function () {
      winTarget = mode.points;
      gameEnded = false;
      overlay.remove();
      playerScore = 0;
      opponentScore = 0;
      initialPositions();
    });
    buttonsContainer.appendChild(button);
  });

  container.appendChild(title);
  container.appendChild(buttonsContainer);
  overlay.appendChild(container);
  document.body.appendChild(overlay);
}

function showVictoryScreen(message) {
  const existing = document.getElementById("victoryScreen");
  if (existing) existing.remove();
  const overlay = document.createElement("div");
  overlay.id = "victoryScreen";
  overlay.className = "victory-overlay";
  const container = document.createElement("div");
  container.className = "victory-container";
  const text = document.createElement("p");
  text.className = "victory-text";
  text.textContent = message;
  const hint = document.createElement("p");
  hint.className = "victory-hint";
  hint.textContent = "Play again";
  container.appendChild(text);
  container.appendChild(hint);
  overlay.appendChild(container);

  const handleClick = function () {
    overlay.removeEventListener("click", handleClick);
    overlay.remove();
    showGameModeSelector();
  };
  
  overlay.addEventListener("click", handleClick);
  document.body.appendChild(overlay);
}

let victoryShown = false;

function victory() {
  if (victoryShown) return;
  
  if (playerScore === winTarget) {
    victoryShown = true;
    gameEnded = true;
    showVictoryScreen("You won!");
  }
  if (opponentScore === winTarget) {
    victoryShown = true;
    gameEnded = true;
    showVictoryScreen("Computer won!");
  }
}
