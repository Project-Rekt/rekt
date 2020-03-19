import Engine from 'engine';

export default class Player extends Engine.Actor {
    constructor(hp, currency) {
        super({});
        this.currency = currency;
        this.hp = hp
        this.towerSelect = null
    }

    //Function to add money.
    gainMoney(money) {
        this.currency += money;
        console.log("Wallet = " + this.currency)
    }

    //Function to subtract money.
    spendMoney(money) {
        this.currency -= money;
        console.log("Wallet = " + this.currency)
    }

    getMoney(){
        return this.currency
    }
    getHp(){
        return this.hp
    }

    damage(damage){
        this.hp -= damage
        console.log("HP = " + this.hp)
        if(this.isDead()){
            this.stage.playerKilled()
        }
    }
    isDead(){
        return this.hp <= 0
    }
}