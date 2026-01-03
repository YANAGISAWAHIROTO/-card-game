/* ===== データ定義 ===== */

const deck = [
  createSwordsman(),
  createMage(),
  createArcher(),
  createSalik(),
  createSwordsman(),
  createMage(),
  createArcher(),
  createSalik() // 2倍デッキ
];

let hand = [];
let diceResult = null;

/* ===== 初期化 ===== */

const board = document.getElementById("board");
const handEl = document.getElementById("hand");
const logEl = document.getElementById("log");

for (let i = 0; i < 25; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  board.appendChild(cell);
}

/* ===== ボタン ===== */

document.getElementById("drawBtn").onclick = drawCard;
document.getElementById("diceBtn").onclick = rollDice;

/* ===== 関数 ===== */

function log(text) {
  logEl.innerHTML = text + "<br>" + logEl.innerHTML;
}

function drawCard() {
  if (deck.length === 0) {
    log("山札が空");
    return;
  }
  const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
  hand.push(card);
  renderHand();
  log(card.name + " を引いた");
}

function rollDice() {
  diceResult = Math.floor(Math.random() * 6) + 1;
  log("🎲 出目：" + diceResult);
  renderHand();
}

function renderHand() {
  handEl.innerHTML = "";
  hand.forEach((card, index) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <b>${card.name}</b><br>
      HP:${card.hp}<br>
      🛡️${card.shield}
    `;

    if (diceResult !== null) {
      card.skills.forEach(s => {
        if (s.dice.includes(diceResult)) {
          el.classList.add("active");
        }
      });
    }

    el.onclick = () => useCard(index);
    handEl.appendChild(el);
  });
}

function useCard(index) {
  const card = hand[index];
  if (diceResult === null) {
    log("先にサイコロを振れ");
    return;
  }

  const usable = card.skills.filter(s => s.dice.includes(diceResult));
  if (usable.length === 0) {
    log(card.name + " は技を出せない");
    return;
  }

  const skill = usable.reduce((a, b) => a.dmg > b.dmg ? a : b);
  log(card.name + " の " + skill.name + " 発動！");

  diceResult = null;
  renderHand();
}

/* ===== カード定義 ===== */

function baseCard(name, hp, shield, skills) {
  return {
    name,
    hp,
    shield,
    skills,
    status: { fire: 0, thunder: 0, poison: 0, confuse: 0 }
  };
}

function createSwordsman() {
  return baseCard("剣士", 8, 2, [
    { name: "切断", dmg: 2, dice: [1,2,3], effects: [] },
    { name: "乱舞🔥", dmg: 3, dice: [4,5], effects: ["fire"] },
    { name: "雷剣⚡", dmg: 5, dice: [6], effects: ["thunder"] }
  ]);
}

function createMage() {
  return baseCard("魔法使い", 7, 3, [
    { name: "炎強化", dmg: 2, dice: [2,3], effects: ["fire"] },
    { name: "雷強化", dmg: 2, dice: [4,5], effects: ["thunder"] },
    { name: "氷龍", dmg: 4, dice: [4,6], effects: [] }
  ]);
}

function createArcher() {
  return baseCard("弓使い", 7, 2, [
    { name: "当敵", dmg: 1, dice: [1,2,3,4], effects: [] },
    { name: "乱射", dmg: 3, dice: [2,3], effects: [] }
  ]);
}

function createSalik() {
  return baseCard("死者サリク", 8, 2, [
    { name: "断罪", dmg: 4, dice: [1,3], effects: [] },
    { name: "破炎🔥", dmg: 3, dice: [2,1], effects: ["fire"] },
    { name: "復活の呪文", dmg: 0, dice: [4,1], effects: ["revive"] }
  ]);
                           }
