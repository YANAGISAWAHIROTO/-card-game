let deck = [];
let hand = [];
let isDrawnThisTurn = false;
let currentTurn = "PLAYER";

// ===== ゲーム開始 =====
function startGame() {
  deck = createDeck();
  shuffle(deck);
  updateDeckCount();
  log("ゲーム開始！");
}

window.onload = startGame;

// ===== 山札作成 =====
function createDeck() {
  // cards.js に定義している全カードをコピー
  return [...cards];
}

// ===== シャッフル =====
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== ドロー =====
function drawCard() {
  if (isDrawnThisTurn) {
    alert("このターンはもうドローできません");
    return;
  }

  if (deck.length === 0) {
    alert("山札がありません");
    return;
  }

  const card = deck.pop();
  hand.push(card);
  isDrawnThisTurn = true;

  updateDeckCount();
  renderHand();
  log(`ドロー：${card.name}`);
}

// ===== ターン終了 =====
function endTurn() {
  isDrawnThisTurn = false;
  currentTurn = currentTurn === "PLAYER" ? "ENEMY" : "PLAYER";
  document.getElementById("turn-display").textContent = currentTurn;
  log(`${currentTurn} のターン`);
}

// ===== 表示更新 =====
function updateDeckCount() {
  document.getElementById("deck-count").textContent = deck.length;
}

function log(text) {
  const logArea = document.getElementById("log");
  logArea.innerHTML += `<div>${text}</div>`;
    }
