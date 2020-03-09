import Engine from 'engine';

export default class Player extends Engine.Actor {
    constructor(hp, currency) {
        super({});
        this.currency = currency;
        this.hp = hp
    }

    //Function to add money.
    gainMoney(money) {
        this.currency += money;
    }

    //Function to subtract money.
    spendMoney(money) {
        this.currency -= money;
    }

    getMoney(){
        return this.currency
    }
    getHp(){
        return this.hp
    }

    damage(damage){
        this.hp -= damage
    }
}