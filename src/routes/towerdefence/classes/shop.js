import Engine from 'engine';

//Class and constructor to initiate shop object.
export default class Shop extends Engine.Actor {
    constructor() {
        super({})
        this.inventory = [];
    }

    //Function that accepts an index for tower selection
    //Then it deducts from player currency and returns a new tower object.
    buy(towerIndex) {
        this.spendMoney(this.selection[towerIndex].cost);
        return this.selection[towerIndex];
    }

    addInventoryItem(item, price){

    }

    //Function that accepts a tower object and refunds 50% of cost.
    sell(tower) {
        this.gainMoney(tower.cost / 2);
        //Destroy object here.
    }

    //Function that accepts an index in tower selection and returns its cost.
    getCost(towerIndex) {
        return this.selection[towerIndex].cost;
    }
}

//export { Shop };