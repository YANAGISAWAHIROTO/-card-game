const board = document.getElementById("board");
const handEl = document.getElementById("hand");
const logEl = document.getElementById("log");

let hand=[];
let dice=null;
let turn=0;

function log(t){
  logEl.innerHTML=t+"<br>"+logEl.innerHTML;
}

// 盤生成
for(let i=0;i<25;i++){
  const c=document.createElement("div");
  c.className="cell";
  board.appendChild(c);
}

document.getElementById("drawBtn").onclick=()=>{
  if(deck.length===0) return log("山札なし");
  const c=deck.splice(Math.random()*deck.length|0,1)[0];
  hand.push(c);
  renderHand();
};

document.getElementById("diceBtn").onclick=()=>{
  dice=rollDice();
  log("🎲 "+dice);
  renderHand();
};

function renderHand(){
  handEl.innerHTML="";
  hand.forEach((c,i)=>{
    const el=document.createElement("div");
    el.className="card";
    el.innerHTML=`${c.name}<br>HP${c.hp}<br>🛡${c.shield}`;
    if(dice!==null && c.skills.some(s=>s.dice.includes(dice))){
      el.classList.add("active");
    }
    el.onclick=()=>useCard(i);
    handEl.appendChild(el);
  });
}

function useCard(i){
  if(dice===null) return log("🎲を振れ");
  const c=hand[i];
  log(c.name+" 行動");
  dice=null;
  renderHand();
}
