import BadButton from "./badButton";

export default class WaveStart extends BadButton{
    constructor(x, y, text, tower){
        super(x, y, text)
        this.tower = tower
    }

    activate(){
        //console.log("Pressed start")
        this.stage.startWave()
    }
}