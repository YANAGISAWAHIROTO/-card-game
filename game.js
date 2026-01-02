const card = cards[0];
const cardDiv = document.getElementById("card");
const log = document.getElementById("log");
const diceBtn = document.querySelector(".dice-btn");

function renderCard() {
  cardDiv.innerHTML = `
    <h2>${card.name}</h2>
    <p>HP: ${card.hp}</p>
    <p>シールド: ${card.shield.value} (🎲 ${card.shield.dice.join(",")})</p>

    ${card.skills.map((s, i) => `
      <div class="skill" data-index="${i}">
        ${s.name} / DMG ${s.dmg} (🎲 ${s.dice.join(",")})
      </div>
    `).join("")}
  `;
}

diceBtn.addEventListener("click", () => {
  rollDice();

  document.querySelectorAll(".skill").forEach(skill => {
    skill.classList.remove("active");
    const i = skill.dataset.index;
    if (card.skills[i].dice.includes(currentDice)) {
      skill.classList.add("active");
    }
  });
});

cardDiv.addEventListener("click", e => {
  if (!e.target.classList.contains("skill")) return;
  if (!e.target.classList.contains("active")) return;

  const skill = card.skills[e.target.dataset.index];
  log.textContent = `${skill.name} 発動！ DMG ${skill.dmg}`;
});

renderCard();
