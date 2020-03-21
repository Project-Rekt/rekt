# Effect Class
## Brief overview of effects

Effects are objects that are attached to monsters (only monsters atm, there may be a future in which towers can be "effected"), and act as some type of debuff. Right now the easiest effects to implement are those that directly impact the speed and defense of a monster.

Examples of effects:
 - slow effect - set the monsters walking speed to some value lower than its original value
 - stun effect - set the monsters walking speed to 0 for the duraction of the effect
 - armor rend - set the defense stat of the monster to some value lower than its original

 ## API

 ### new Effect (STR name, STR modifier, INT value)
 right now all effects have a duration of 2s or 2000ms, in the future we could add variability to this. It is important that *modifier* be identical to the property variable that this effect is modifying. Right now the only functionality is for "speed" and "def".

 ### attach(MONSTER monster)
 passing a monster as an argument to the effect method "attach" will result in the effect being applied to the target. This method confirms that the target has a property identical to the one the effect is trying to modify, modifies said value, then adds the effect onto the monster's "effectsList" which tracks which effects are currently applied to the target monster.

 ## Example

The HeavyTower class currently has a slow effect as a property. Whenever it shoots, it attaches that effect to its target. Each update cycle increments the effectsList of each monster by dt, once the accrued dt exceeds 2000ms the effect wears off and the monster's stats are renewed.
 ```js

//heavyTower.js
export default class HeavyTower extends Tower {
  constructor(x, y) {
    super(x, y);
    this.atkspeed = 450;
    this.atk = 15;
    this.range = 6;
    this.cost = 75;
    this.effect = new Effect("slow", "speed", 0.0001); //<----- Effect
  }

//tower.js
shoot(time) {
    if (this.shotTimer >= this.atkspeed) {
      //console.log("shooting!")
      this.shotTimer -= this.atkspeed;
      this.fireBulletNoProjectile();
      if (this.effect != null) {
        this.effect.attach(this.target); //<----- attaching the effect
      }
    }
  }

//effect.js
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

//monster.js this function gets called during the monster's update

updateEffects(dt) {
    // console.log(JSON.stringify(this.effectsList));
    for (var i = 0; i < this.effectsList.length; i++) {
      // console.log("UPDATING TIME: " + this.effectsList[i]["effect"].name);
      this.effectsList[i]["time"] += dt;
      if (
        this.effectsList[i]["time"] >= this.effectsList[i]["effect"].maxTime
      ) {
        this.renew(this.effectsList[i]["effect"].modifier);
        // console.log("EFFECT EXPIRED: " + this.effectsList[i]["effect"].name);
        // console.log("MONSTER'S SPEED RENEWED TO: " + this.speed);
        this.effectsList.pop(i);
      } else {
        // console.log(this.effectsList[i]["time"]);
      }
    }
  }

//monster.js only gets called once the effect has worn off
 renew(param) {
    console.log(this.statRenew);
    if (param == "hp") {
      this.hp = this.statRenew["hp"];
    }
    if (param == "speed") {
      this.speed = this.statRenew["speed"];
    }
    if (param == "def") {
      this.def = this.statRenew["def"];
    }
  }