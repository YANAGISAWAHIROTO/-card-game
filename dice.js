function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollMultiple(count = 2) {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(rollDice());
  }
  return results;
}
