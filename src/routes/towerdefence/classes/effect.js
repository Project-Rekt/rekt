export default class Effect {
  constructor(name, modifier, value) {
    this.name = name;
    this.modifier = modifier;
    this.value = value;
    this.maxTime = 5000;
  }
  attach(monster) {
    if (this.modifier == "def") {
      monster.def = this.value;
    }
    if (this.modifier == "speed") {
      monster.speed = this.value;
    }
    monster.effectsList.push({ effect: this, time: 0 });
  }
}
