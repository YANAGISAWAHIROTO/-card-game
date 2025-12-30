const hand = document.getElementById("hand");
const diceResult = document.getElementById("diceResult");
const rollButton = document.getElementById("rollDice");

// 手札にカード表示
function drawCard(card) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <div class="card-name">${card.name}</div>
    <div class="card-stats">
      HP: ${card.hp}<br>
      シールド: ${card.shield.value} (${card.shield.dice.join(",")})
    </div>
  `;

  div.onclick = () => selectCard(card);
  hand.appendChild(div);
}

// カード選択
function selectCard(card) {
  const dice = rollMultiple(2);
  diceResult.textContent = `出目: ${dice.join(", ")}`;

  card.skills.forEach(skill => {
    if (skill.dice.some(d => dice.includes(d))) {
      alert(`${skill.name} 発動！ ダメージ ${skill.damage}`);
    }
  });
}

// 初期処理
drawCard(cards[0]);

rollButton.onclick = () => {
  diceResult.textContent = `出目: ${rollMultiple(2).join(", ")}`;
};
