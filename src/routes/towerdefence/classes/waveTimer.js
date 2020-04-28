import Engine from 'engine';
import Notification from "./ui/notification";

export default class WaveTimer extends Engine.Actor{
    constructor(){
        super({})
        this.spawners = []
        this.waveStep = 0
        this.waves = []
        this.enabled = false
    }

    update = (dt) => {
        //console.log(this.waveCompleted())
        if (!this.enabled){
            return
        }
        if(this.waveStep == this.waves.length){
            return
        }
        if (this.waveCompleted()){
            this.stage.gui.addInterface(new Notification("starting wave " + (this.waveStep + 1)))
            console.log("starting wave " + this.waveStep)
            
            this.startWave()
            this.enabled = false
        }
    }


    startWave(){
        
        for(let i = 0; i < this.spawners.length; i++){
            this.spawners[i].setMobs(this.waves[this.waveStep][i])
            this.spawners[i].updateScale(this.waveStep)
        }
        this.waveStep ++
    }

    setWaves(waves){
        this.waves = waves
        this.waveStep = 0
    }

    setSpawners(spawners){
        this.spawners = spawners
    }

    waveCompleted(){
        //console.log(this.stage.events)
        for(let i = 0; i < this.spawners.length; i++){
            if (!this.spawners[i].mobsExhausted()){
                return false
            }
        }
        return true
    }

    enable(){
        this.enabled = true
    }
    disable(){
        this.enabled = false
    }
    isEnabled(){
        return this.enabled
    }
}