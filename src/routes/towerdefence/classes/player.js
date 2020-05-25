import Engine from "engine";
import ImageHoverText from "./ui/imageHoverText"

export default class Player extends Engine.Actor {
  constructor(hp, currency) {
    super({});
    this.currency = currency;
    this.hp = hp;
    this.towerSelect = null;

    this.wallet = new ImageHoverText("../spriteAssets/world/tear.png", 100, 600, 80, 80, "" + this.currency);
    this.lifeCounter = new ImageHoverText("../spriteAssets/world/heart.png", 5, 600, 80, 80, "" + this.hp);
  }

  update = dt => {
    this.wallet.changeAltText("" + this.currency);
    this.lifeCounter.changeAltText("" + this.hp);
  };

  //Function to add money.
  gainMoney(money) {
    this.currency += money;
    //console.log("Wallet = " + this.currency)
  }

  //Function to subtract money.
  spendMoney(money) {
    this.currency -= money;
    //console.log("Wallet = " + this.currency)
  }

  getMoney() {
    return this.currency;
  }
  getHp() {
    return this.hp;
  }

  damage(damage) {
    this.hp -= damage;
    //console.log("HP = " + this.hp)
    if (this.isDead()) {
      this.stage.playerKilled();
    }
  }
  isDead() {
    return this.hp <= 0;
  }
}
