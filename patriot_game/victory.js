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
  title.textContent = "Escolha o modo de jogo";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "gamemode-buttons";

  const modes = [
    { points: 1, text: "1 Ponto " },
    { points: 3, text: "3 Pontos" },
    { points: 5, text: "5 Pontos" },
  ];

  modes.forEach((mode) => {
    const button = document.createElement("button");
    button.className = "gamemode-button";
    button.textContent = mode.text;
    button.addEventListener("click", function () {
      winTarget = mode.points;
      gameEnded = false;
      overlay.remove();
      pontos = 0;
      pontosOponent = 0;
      posicoesIniciais();
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
  hint.textContent = "Jogar novamente";
  container.appendChild(text);
  container.appendChild(hint);
  overlay.appendChild(container);

  overlay.addEventListener("click", function () {
    overlay.remove();
  });

  document.body.appendChild(overlay);
}

function victory() {
  if (pontos === winTarget) {
    gameEnded = true;
    showVictoryScreen("Você venceu!");
    setTimeout(() => showGameModeSelector(), 2000);
  }
  if (pontosOponent === winTarget) {
    gameEnded = true;
    showVictoryScreen("Computador venceu!");
    setTimeout(() => showGameModeSelector(), 2000);
  }
}
