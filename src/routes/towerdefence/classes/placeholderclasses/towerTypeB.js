import Tower from "../tower";

export default class TowerTypeB extends Tower{
    constructor(x, y){
        super(50, 15, "nearest", 7, x, y)
    }
}