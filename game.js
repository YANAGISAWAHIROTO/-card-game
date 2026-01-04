let deck = [];
let hand = [];
let field = [];
let currentPlayer = "player";

let drawCountThisTurn = 0;
const MAX_DRAW_PER_TURN = 1;

// ★ 多重ドロー防止
let isDrawing = false;

function initGame() {
  deck = createDeck();
  shuffle(deck);
  hand = [];
  field = [];
  drawCountThisTurn = 0;
  isDrawing = false;
  updateDrawButton();
  render();
}

function createDeck() {
  const allCards = [];
  cards.forEach(card => {
    allCards.push({ ...card });
    allCards.push({ ...card }); // 2倍デッキ
  });
  return allCards;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== ドロー（完全ロック版）=====
function drawCard() {
  if (isDrawing) return;

  if (drawCountThisTurn >= MAX_DRAW_PER_TURN) {
    alert("このターンはもうカードを引けません");
    return;
  }

  if (deck.length === 0) {
    alert("山札がありません");
    return;
  }

  isDrawing = true;

  const card = deck.pop();
  hand.push(card);
  drawCountThisTurn++;

  updateDrawButton();
  renderHand();

  // ★ 非同期対策
  setTimeout(() => {
    isDrawing = false;
  }, 100);
}

function endTurn() {
  drawCountThisTurn = 0;
  currentPlayer = currentPlayer === "player" ? "enemy" : "player";
  updateDrawButton();
  alert(currentPlayer === "player" ? "あなたのターン" : "相手のターン");
}

function updateDrawButton() {
  const btn = document.getElementById("draw-button");
  btn.disabled = drawCountThisTurn >= MAX_DRAW_PER_TURN;
}

// ===== 描画 =====
function render() {
  renderDeck();
  renderHand();
}

function renderDeck() {
  document.getElementById("deck-count").textContent = deck.length;
}

function renderHand() {
  const handArea = document.getElementById("hand");
  handArea.innerHTML = "";
  hand.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card.name;
    handArea.appendChild(div);
  });
}

initGame();
