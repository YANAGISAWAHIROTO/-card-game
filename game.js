// ===== 基本状態 =====
let deck = [];
let hand = [];
let field = [];
let currentPlayer = "player";

// ★ 追加：ドロー制御
let drawCountThisTurn = 0;
const MAX_DRAW_PER_TURN = 1;

// ===== 初期化 =====
function initGame() {
  deck = createDeck(); // cards.js の関数
  shuffle(deck);
  hand = [];
  field = [];
  drawCountThisTurn = 0;
  render();
}

// ===== 山札生成 =====
function createDeck() {
  const allCards = [];

  cards.forEach(card => {
    allCards.push({ ...card });
    allCards.push({ ...card }); // ★ 2倍デッキ
  });

  return allCards;
}

// ===== シャッフル =====
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== ドロー処理（★バグ修正版） =====
function drawCard() {
  if (drawCountThisTurn >= MAX_DRAW_PER_TURN) {
    alert("このターンはこれ以上カードを引けません");
    return;
  }

  if (deck.length === 0) {
    alert("山札がありません");
    return;
  }

  const card = deck.pop();
  hand.push(card);
  drawCountThisTurn++;

  renderHand();
}

// ===== ターン終了 =====
function endTurn() {
  drawCountThisTurn = 0;
  currentPlayer = currentPlayer === "player" ? "enemy" : "player";
  alert(currentPlayer === "player" ? "あなたのターン" : "相手のターン");
}

// ===== 描画 =====
function render() {
  renderDeck();
  renderHand();
  renderField();
}

function renderDeck() {
  document.getElementById("deck-count").textContent = deck.length;
}

function renderHand() {
  const handArea = document.getElementById("hand");
  handArea.innerHTML = "";

  hand.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card.name;
    handArea.appendChild(div);
  });
}

function renderField() {
  const fieldArea = document.getElementById("field");
  fieldArea.innerHTML = "";
}

// ===== 起動 =====
initGame();
