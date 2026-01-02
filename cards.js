const cards = [
  {
    id: "sarik",
    name: "死者サリク",
    type: "monster",
    hp: 8,
    shield: { value: 2, dice: [3,4] },
    skills: [
      { name: "断罪", dmg: 4, dice: [1,3] },
      { name: "復活の呪文", dmg: 8, dice: [4,1], special: "revive" },
      { name: "破炎", dmg: 3, dice: [2,1], attr: "fire" }
    ]
  },

  {
    id: "annie",
    name: "森の精アニー",
    type: "monster",
    hp: 5,
    shield: { value: 4, dice: [2,4] },
    skills: [
      { name: "花道", dmg: 1, dice: [1,2,3], attr: "confuse" },
      { name: "巨木", dmg: 3, dice: [3,2], pierce: true },
      { name: "毒花", dmg: 2, dice: [2,4], attr: "poison" }
    ]
  },

  {
    id: "balan",
    name: "光者バラン",
    type: "monster",
    hp: 5,
    shield: { value: 3, dice: [2,3] },
    skills: [
      { name: "光魔剣", dmg: 3, dice: [1,6], attr: "confuse" },
      { name: "閃斬", dmg: 4, dice: [5,2] }
    ]
  }
];
