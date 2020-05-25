import Engine from "engine";
import moveOverPath from "./movement";
export default class Monster extends Engine.SpriteActor {
  constructor(bounds, hp, speed, def, spriteObj) {
    super(bounds, spriteObj);
    //this.route = this.edgePath(path);
    this.vertex = 0;
    this.hp = hp;
    this.maxHp = hp;
    this.speed = speed;
    this.def = def;
    this.distance = 0;
    this.positionX = 0;
    this.positionY = 0;
    this.path = [];
    this.step = 0;
    this.reachedGoal = false;
    this.dead = false;
    this.active = true;
    this.id = 0;
    this.px = Math.round(this.bounds.x);
    this.py = Math.round(this.bounds.y);
    this.effectsList = [];
    this.statRenew = { hp: this.hp, speed: this.speed, def: this.def };
    this.bounty = 1
  }

  /*
  render = dt => {
    //clearframe
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.px, this.py, this.bounds.width, this.bounds.height);

    this.px = Math.round(this.bounds.x);
    this.py = Math.round(this.bounds.y);

    //drawframe
    let ratio = (this.hp / this.maxHp) * 255;
    let hexComponent = Math.floor(ratio).toString(16);
    //console.log(ratio + " " +hexComponent)
    let colorString = "yellow";
    this.ctx.fillStyle = colorString;
    this.ctx.fillRect(this.px, this.py, this.bounds.width, this.bounds.height);
  };*/

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

  scaleStats(factor){
    this.maxHp = this.maxHp * factor
    this.hp = this.hp * factor
    this.def = this.def * factor
    this.bounty = Math.floor(this.bounty * factor)
  }

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

  updateZIndex(){
    //600 max y
    let newZ = 9 + (this.positionY/600)
    //console.log(newZ)
    this.stage.changeIndex(this, newZ)
  }

  update = dt => {
    //console.log("acting! " + this.getPosition() + " hp: " + this.getHp())
    //console.log(this.id + " acting")
    // if (this.effectsList != []) {
    //   console.log(this.effectsList);
    // }
    this.updateEffects(dt);
    //console.log(this.hp)
    if (this.isDead()) {
     
      this.active = false;
      //console.log("Dead! " + this.getPosition() + " hp: " + this.getHp())
      //console.log(this)
      this.stage.enemyKilled(this.bounty);
      this.destroyActor();
      return;
    }

    moveOverPath(this, dt);
    this.updateZIndex()
    //this.distance -= this.speed*dt
    this.updateRealPosition();
    if (this.hasReachedGoal()) {
      this.active = false;
      this.stage.enemyReachedGoal();
      //console.log("Reached goal! " + this.getPosition())
      //console.log(this)
      this.destroyActor();
    }
  };

  /*
   * update position for engine. pass x y values to function that translates virtual to visual position
   */
  updateRealPosition() {
    this.bounds.x = this.positionX * 50;
    this.bounds.y = this.positionY * 50;
  }

  destroyActor(){
    this.ctx.clearRect((this.x1 + this.x2)/2, (this.y1 + this.y2)/2, Math.abs(this.x2-this.x1), Math.abs(this.y2-this.y1));
    this.stage.removeActor(this)
    this.stage.removeActive(this)
  }
  /*
  destroy() { //not working???
    //this.ctx.clearRect((this.x1 + this.x2)/2, (this.y1 + this.y2)/2, Math.abs(this.x2-this.x1), Math.abs(this.y2-this.y1));
    console.log("!!!")
    this.stage.removeActor(this)
    this.stage.removeActive(this)
  }
  */
  hasReachedGoal() {
    this.reachedGoal = this.step + 1 >= this.path.length;
    return this.reachedGoal;
  }

  setPath(path) {
    this.path = path;
    this.step = 0;
  }

  setStep(step) {
    this.step = step;
  }

  //Function to subtract health.
  takeDamage(damage) {
    let temp = this.hp
    this.hp = this.hp - Math.max(damage - this.def, 1);
    //console.log(temp + " -> " + this.hp)
  }

  //Function to add health.
  healDamage(heal) {
    this.hp = this.hp + Math.min(this.hp + heal, this.maxHp);
  }

  //position given in [y, x] format
  updatePosition(position) {
    this.positionX = position[1];
    this.positionY = position[0];
    this.updateRealPosition();
  }

  //Function to change distance.
  setDistance(distance) {
    this.distance = distance;
  }

  getHp() {
    return this.hp;
  }
  getSpeed() {
    return this.speed;
  }
  getDef() {
    return this.def;
  }
  getDistance() {
    return this.distance;
  }
  //position given in [y, x] format
  getPosition() {
    return [this.positionY, this.positionX];
  }
  getPath() {
    return this.path;
  }
  getStep() {
    return this.step;
  }
  isDead() {
    return this.hp <= 0
  }

  edgePath(path) {
    // [y, x] coordinates
    let horizontal = false;
    let vertical = false;
    let edgePath = [];

    if (path[0][0] == path[1][0]) vertical = true;
    else if (path[0][1] == path[1][1]) horizontal = true;

    for (let i = 0; i < path.length - 1; i++) {
      if (vertical) {
        if (path[i][0] != path[i + 1][0]) {
          edgePath.push(path[i]);
          vertical = false;
          horizontal = true;
        }
      } else if (horizontal) {
        if (path[i][1] != path[i + 1][1]) {
          edgePath.push(path[i]);
          vertical = true;
          horizontal = false;
        }
      }
    }
    edgePath.push(path[path.length - 1]);
    return edgePath;
  }
  isActive() {
    return this.active;
  }
}