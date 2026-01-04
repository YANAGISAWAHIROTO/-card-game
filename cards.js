function createCard(name,hp,shield,skills){
  return {
    name,hp,shield,maxShield:shield,
    skills,
    status:{fire:0,thunder:0,poison:0,confuse:0}
  };
}

const baseDeck = [
  createCard("剣士",8,2,[
    {name:"切断",dmg:2,dice:[1,2,3]},
    {name:"乱舞🔥",dmg:3,dice:[4,5],effect:"fire"},
    {name:"雷剣⚡",dmg:5,dice:[6],effect:"thunder"}
  ]),
  createCard("魔法使い",7,3,[
    {name:"炎強化🔥",dmg:2,dice:[2,3],effect:"fire"},
    {name:"雷強化⚡",dmg:2,dice:[4,5],effect:"thunder"},
    {name:"氷龍",dmg:4,dice:[4,6]}
  ]),
  createCard("弓使い",7,2,[
    {name:"当敵",dmg:1,dice:[1,2,3,4]},
    {name:"乱射",dmg:3,dice:[2,3]}
  ]),
  createCard("死者サリク",8,2,[
    {name:"断罪",dmg:4,dice:[1,3]},
    {name:"破炎🔥",dmg:3,dice:[2,1],effect:"fire"},
    {name:"復活の呪文",dmg:0,dice:[4,1],effect:"revive"}
  ])
];

// 2倍デッキ
const deck = [...baseDeck, ...baseDeck].map(c => structuredClone(c));
