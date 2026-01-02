const cardArea = document.getElementById("card-area");
const log = document.getElementById("log");
const diceBtn = document.querySelector(".dice-btn");

let activeCard = cards[0]; // 仮でサリク固定

function renderCard() {
  cardArea.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${activeCard.name}</h2>
    <div class="status">
      <span>❤️ HP ${activeCard.hp}</span>
      <span>🛡 ${activeCard.shield.value}</span>
    </div>
  `;

  activeCard.skills.forEach(skill => {
    const div = document.createElement("div");
    div.className = "skill disabled";
    div.dataset.dice = skill.dice.join(",");

    div.textContent =
      `${skill.name} / DMG ${skill.dmg} 🎲(${skill.dice.join(" ")})`;

    div.onclick = () => {
      log.textContent = `${skill.name} 発動！`;
    };

    card.appendChild(div);
  });

  cardArea.appendChild(card);
}

diceBtn.onclick = () => {
  const dice = rollDice();
  document.querySelectorAll(".skill").forEach(skill => {
    const need = skill.dataset.dice.split(",").map(Number);
    skill.classList.toggle("active", need.includes(dice));
    skill.classList.toggle("disabled", !need.includes(dice));
  });
};

renderCard();
