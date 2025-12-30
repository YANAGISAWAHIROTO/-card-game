const cards = [
  {
    id: "salik",
    name: "死者サリク",
    hp: 8,
    shield: {
      value: 2,
      dice: [3, 4]
    },
    skills: [
      { name: "断罪", damage: 4, dice: [1, 3] },
      { name: "復活の呪文", damage: 8, dice: [4, 1], special: true },
      { name: "破炎", damage: 3, dice: [2, 1], element: "🔥" }
    ]
  }
];
