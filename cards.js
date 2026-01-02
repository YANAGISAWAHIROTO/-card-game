const STATUS_RULES = {
  fire:   { name: "🔥炎上", damage: 1 },
  poison: { name: "💀毒", damage: 1 },
  thunder:{ name: "⚡麻痺", skip: true },
  confuse:{ name: "🌀混乱", skip: true }
};

const allCards = [
  {
    name: "剣士",
    hp: 8,
    shield: { value: 2, dice: [6,2,1] },
    skills: [
      { name: "切断", damage: 2, dice: [1,2,3] },
      { name: "乱舞", damage: 3, dice: [4,5] },
      { name: "雷剣", damage: 5, dice: [6], status:{type:"thunder",turns:3} }
    ]
  },
  {
    name: "死者サリク",
    hp: 8,
    shield: { value: 2, dice: [3,4] },
    skills: [
      { name: "断罪", damage: 4, dice: [1,3] },
      { name: "破炎", damage: 3, dice: [2,1], status:{type:"fire",turns:3} },
      { name: "復活の呪文", damage: 0, dice: [4,1], revive:true }
    ]
  }
];

const trapCards = [
  { name:"命の籠", damage:2 },
  { name:"炎の弓", damage:1, status:{type:"fire",turns:3} },
  { name:"洗脳魔法", skip:true },
  { name:"黄泉の砦", damage:4 }
];
