import TerrainBlocker from "./terrainBlocker"
import Engine from "engine";
import BulletLine from "./bulletLine";

const targeting = Object.freeze({
  HIGH_HP: "highestHP",
  LOW_HP: "lowestHP",
  NEAR: "nearest",
  FAR: "furthest"
});

export default class Tower extends TerrainBlocker {
  constructor(x, y) {
    super({}, x, y, null);

    this.atkspeed;
    this.atk;
    this.targetingMode = targeting.NEAR;
    this.range;
    this.aimAngle = 0.0;
    this.target = null;
    this.shotTimer = 0;

    this.level = 1;
    this.effect = null;
  }

  update = dt => {
    this.shotTimer += dt;
    if (this.shotTimer > this.atkspeed) {
      this.shotTimer = this.atkspeed;
    }
    if (
      this.target == null ||
      !this.target.isActive() ||
      this.target.hasReachedGoal() ||
      this.target.isDead() ||
      !this.targetInRange()
    ) {
      //console.log("seeking target")
      this.findTarget();
      return;
    }
    if (this.target == null) {
    } else {
      this.turnToTarget(this.target);
      this.shoot(dt);
    }
  };

  targetInRange() {
    let distance = Math.sqrt(
      Math.pow(this.positionX - this.target.positionX, 2) +
        Math.pow(this.positionY - this.target.positionY, 2)
    );
    return distance <= this.range;
  }

  shoot(time) {
    if (this.shotTimer >= this.atkspeed) {
      //console.log("shooting!")
      this.shotTimer -= this.atkspeed;
      this.fireBulletNoProjectile();
      if (this.effect != null) {
        // console.log("TOWER EFFECT: " + this.effect);
        // console.log("MONSTER SPEED: " + this.target.speed);
        this.effect.attach(this.target);
        // console.log(
        //   "MONSTER EFFECTS: " + JSON.stringify(this.target.effectsList)
        // );
        // console.log("EFFECTS TIME: " + this.target.effectsList[0]["time"]);
        // console.log("MONSTER SPEED: " + this.target.speed);
      }
    }
  }

  fireBulletNoProjectile() {
    this.stage.addActor(
      new BulletLine(
        50,
        this.realX,
        this.realY,
        this.target.px + 25,
        this.target.py + 25
      ),
      30
    );
    //console.log(this.realX + " " + this.realY + " " + this.target.px + " " + this.target.py)
    this.target.takeDamage(this.atk);
  }

  render = dt => {};

  turnToTarget(target) {
    let targetPosition = target.getPosition();
    let currentPosition = [this.positionY, this.positionX];
    //pointing straight up or straight down case to avoid NaN with Math.atan() function
    if (currentPosition[1] - targetPosition[1] == 0) {
      if (currentPosition[0] - targetPosition[0] >= 0) {
        this.aimAngle = Math.PI * 0.5;
      } else {
        this.aimAngle = Math.PI * 1.5;
      }
    }
    //general case
    else {
      this.aimAngle = Math.atan(
        (currentPosition[0] - targetPosition[0]) /
          (currentPosition[1] - targetPosition[1])
      );
    }
  }

  findTarget() {
    let inRange = this.findInRadius(this.stage.getActiveEnemies());
    this.target = this.prioritizeTarget(inRange);
  }

  findInRadius(entities) {
    let h = this.positionX;
    let k = this.positionY;
    let array = [];

    entities.forEach(element => {
      let x = element.positionX;
      let y = element.positionY;
      let distance = Math.sqrt((x - h) ** 2 + (y - k) ** 2);
      if (distance <= this.range) {
        array.push(element);
      }
    });

    return array;
  }

  prioritizeTarget(entities) {
    let target = entities[0];

    switch (this.targetingMode) {
      //Target monster with the lowest HP.
      case targeting.LOW_HP:
        entities.forEach(element => {
          if (element.hp < target.hp) {
            target = element;
          }
        });
        break;

      //Target monster with the highest HP.
      case targeting.HIGH_HP:
        entities.forEach(element => {
          if (element.hp > target.hp) {
            target = element;
          }
        });
        break;

      //Target monster nearest to the end point.
      case targeting.NEAR:
        entities.forEach(element => {
          if (element.distance < target.distance) {
            target = element;
          }
        });
        break;

      //Target monster furthest to the end point.
      case targeting.FAR:
        entities.forEach(element => {
          if (element.distance > target.distance) {
            target = element;
          }
        });
        break;
    }

    return target;
  }

  upgradeTower = () => {};

  //Function to change targeting mode.
  setMode(targetingMode) {
    this.targetingMode = targetingMode;
  }

  //Function to change tower range.
  setRange(range) {
    this.range = range;
  }
}
