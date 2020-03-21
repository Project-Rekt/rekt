import Button from "../ui/button";

export default class WaveStart extends Button{
    constructor(x, y, text, tower){
        super(x, y, text)
        this.tower = tower
    }

    handler(){
        console.log("Pressed start")
        this.stage.startWave()
    }
}