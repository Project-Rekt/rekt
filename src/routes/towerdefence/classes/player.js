import Engine from "engine";
import Button from "./ui/button";
import TestMulti from "./ui/testMulti";

export default class Player extends Engine.Actor {
  constructor(hp, currency) {
    super({});
    this.currency = currency;
    this.hp = hp;
    this.towerSelect = null;

    this.wallet = new TestMulti(153, 685, "Tears", "" + this.currency);
    this.lifeCounter = new TestMulti(50, 685, "Life", "" + this.hp);
  }

  update = dt => {
    this.wallet.changeTipText("" + this.currency);
    this.lifeCounter.changeTipText("" + this.hp);
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
