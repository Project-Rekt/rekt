export default class Effect {
  constructor(name, modifier, value) {
    this.name = name;
    this.modifier = modifier;
    this.value = value;
    this.maxTime = 2000;
  }
  attach(monster) {
    if (this.modifier == "def") {
      monster.def = this.value;
    }
    if (this.modifier == "speed") {
      monster.speed = this.value;
    }
    let contains = false;
    for (var i = 0; i < monster.effectsList.length; i++) {
      if (monster.effectsList[i]["effect"].name == this.name) {
        contains = true;
        break;
      }
    }
    if (contains == false) {
      monster.effectsList.push({ effect: this, time: 0 });
    }
  }
}
