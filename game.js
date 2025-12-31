const diceBtn = document.querySelector(".dice-btn");
const skills = document.querySelectorAll(".skill");

diceBtn.addEventListener("click", () => {
  // 1〜6のサイコロ
  const dice = Math.floor(Math.random() * 6) + 1;
  alert("出目：" + dice);

  // 全技を一旦オフ
  skills.forEach(skill => skill.classList.remove("active"));

  // 技の🎲条件をチェック
  skills.forEach(skill => {
    const diceText = skill.querySelector(".skill-dice").textContent;
    if (diceText.includes(dice)) {
      skill.classList.add("active");
    }
  });
});
