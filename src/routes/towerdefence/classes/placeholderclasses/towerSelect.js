import BadButton from "./badButton";

export default class TowerSelect extends BadButton{
    constructor(x, y, text, tower){
        super(x, y, text)
        this.tower = tower
    }

    activate(){
        console.log("selected " + this.tower)
        this.stage.selectBuyTower(this.tower)
    }
}