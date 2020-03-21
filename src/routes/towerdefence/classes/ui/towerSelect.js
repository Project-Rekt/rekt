import Button from "../ui/button";

export default class TowerSelect extends Button{
    constructor(x, y, text, tower){
        super(x, y, text)
        this.tower = tower
    }

    handler() {
        console.log("selected " + this.text)
        this.stage.selectBuyTower(this.tower)
    }
}