function rollDice(){
  return Math.floor(Math.random()*6)+1;
}

function applyStatus(card){
  if(card.status.fire>0) card.hp--;
  if(card.status.poison>0) card.hp--;
}

function endTurnStatus(card){
  for(let k in card.status){
    if(card.status[k]>0) card.status[k]--;
  }
  card.shield = Math.min(card.maxShield, card.shield+1);
}

function attack(attacker, defender, dice){
  const usable = attacker.skills.filter(s=>s.dice.includes(dice));
  if(usable.length===0) return "攻撃失敗";

  const skill = usable.reduce((a,b)=>a.dmg>b.dmg?a:b);
  let dmg = skill.dmg;

  if(defender.shield>0){
    const block = Math.min(defender.shield, dmg);
    defender.shield -= block;
    dmg -= block;
  }
  defender.hp -= dmg;

  if(skill.effect){
    defender.status[skill.effect]=
      skill.effect==="fire"?3:
      skill.effect==="thunder"?3:1;
  }
  return `${skill.name} 発動`;
}
