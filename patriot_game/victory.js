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
  hint.textContent = "Clique para jogar novamente";
  container.appendChild(text);
  container.appendChild(hint);
  overlay.appendChild(container);

  overlay.addEventListener("click", function () {
    overlay.remove();
    pontos = 0;
    pontosOponent = 0;
  });

  document.body.appendChild(overlay);
}

function victory() {
  if (pontos === 5) {
    showVictoryScreen("Você venceu!");
    pontos = 0;
    pontosOponent = 0;
  }
  if (pontosOponent === 5) {
    showVictoryScreen("Computador venceu!");
    pontos = 0;
    pontosOponent = 0;
  }
}
