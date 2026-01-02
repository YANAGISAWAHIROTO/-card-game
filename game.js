const ROWS = 5;
const COLS = 3;

let board = [];
let selected = null;
let battle = null;
let currentDice = null;

let playerTurn = true;
let playerHP = 6;
let enemyHP = 6;

const boardDiv = document.getElementById("board");
const log = document.getElementById("log");
const diceBtn = document.getElementById("dice-btn");
const diceResult = document.getElementById("dice-result");
const skillsDiv = document.getElementById("skills");
const turnIndicator = document.getElementById("turn-indicator");
const playerBase = document.getElementById("player-base");
const enemyBase = document.getElementById("enemy-base");

function initBoard() {
  boardDiv.innerHTML = "";
  board = [];

  for (let r=0;r<ROWS;r++){
    board[r]=[];
    for (let c=0;c<COLS;c++){
      let cell = { unit:null, trap:null };

      if (r===4) cell.unit = createUnit("剣士","player");
      if (r===0) cell.unit = createUnit("死者サリク","enemy");
      if (r===2 && c===0) cell.trap = trapCards[0];

      board[r][c]=cell;

      const div = document.createElement("div");
      div.className="cell";
      div.onclick=()=>onCellClick(r,c);
      boardDiv.appendChild(div);
    }
  }
  render();
}

function createUnit(name, side){
  const card = allCards.find(c=>c.name===name);
  return { side, card, hp:card.hp, status:[] };
}

function render(){
  [...boardDiv.children].forEach((div,i)=>{
    const r=Math.floor(i/COLS);
    const c=i%COLS;
    const cell=board[r][c];

    div.className="cell";
    div.textContent="";

    if(cell.unit){
      div.textContent=`${cell.unit.card.name}(${cell.unit.hp})`;
      div.classList.add(cell.unit.side);
    }
    if(cell.trap) div.classList.add("trap");
    if(selected && selected.r===r && selected.c===c) div.classList.add("selected");
  });

  playerBase.textContent=`自分本体 ❤️${playerHP}`;
  enemyBase.textContent=`敵本体 ❤️${enemyHP}`;
  turnIndicator.textContent=playerTurn?"自分のターン":"敵のターン";
}

function onCellClick(r,c){
  const cell=board[r][c];
  if(!playerTurn||battle) return;

  if(cell.unit && cell.unit.side==="player"){
    selected={r,c};
    render();
    return;
  }

  if(selected){
    const dr=Math.abs(selected.r-r);
    const dc=Math.abs(selected.c-c);
    if(dr+dc!==1) return;

    moveUnit(selected.r,selected.c,r,c);
    selected=null;
  }
}

function moveUnit(sr,sc,tr,tc){
  const from=board[sr][sc];
  const to=board[tr][tc];

  if(to.unit){
    startBattle(from.unit,to.unit,sr,sc,tr,tc);
    return;
  }

  to.unit=from.unit;
  from.unit=null;

  if(to.trap){
    log.textContent=`罠${to.trap.name}発動`;
    to.unit.hp-=to.trap.damage||0;
    to.trap=null;
  }

  endPlayerTurn();
}

function startBattle(att,def,sr,sc,tr,tc){
  battle={att,def,sr,sc,tr,tc};
  log.textContent=`${att.card.name} vs ${def.card.name}`;
  skillsDiv.innerHTML="";
}

diceBtn.onclick=()=>{
  if(!battle) return;
  currentDice=rollDice();
  diceResult.textContent=currentDice;
  showSkills();
};

function showSkills(){
  skillsDiv.innerHTML="";
  battle.att.card.skills.forEach(sk=>{
    const b=document.createElement("button");
    b.textContent=`${sk.name}(${sk.damage}) 🎲${sk.dice}`;
    if(!sk.dice.includes(currentDice)) b.disabled=true;
    b.onclick=()=>useSkill(sk);
    skillsDiv.appendChild(b);
  });
}

function useSkill(sk){
  let dmg=Math.max(0,sk.damage-battle.def.card.shield.value);
  battle.def.hp-=dmg;

  if(sk.status){
    battle.def.status.push({...sk.status});
  }

  if(battle.def.hp<=0){
    board[battle.tr][battle.tc].unit=battle.att;
    board[battle.sr][battle.sc].unit=null;
    log.textContent+=" 撃破！";
  }

  battle=null;
  currentDice=null;
  skillsDiv.innerHTML="";
  endPlayerTurn();
}

function endPlayerTurn(){
  playerTurn=false;
  setTimeout(enemyTurn,700);
}

function enemyTurn(){
  playerTurn=true;
  render();
}

initBoard();
