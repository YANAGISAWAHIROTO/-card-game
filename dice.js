let currentDice = null;

function rollDice() {
  currentDice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").textContent =
    "出目：" + currentDice;
  return currentDice;
}
