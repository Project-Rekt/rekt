import Tower from "../tower";

export default class TowerTypeA extends Tower{
    constructor(x, y){
        super(20, 4, "nearest", 4, x, y)
    }
}