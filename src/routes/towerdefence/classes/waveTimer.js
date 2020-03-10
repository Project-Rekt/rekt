import Engine from 'engine';

export default class WaveTimer extends Engine.Actor{
    constructor(){
        super({})
        this.spawners = []
        this.waveStep = 1
        this.waves = []

    }

    update = (dt) => {
        //console.log(this.waveCompleted())
        if (this.waveCompleted()){
            console.log("starting wave " + this.waveStep)
            
            this.startWave()
        }
    }


    startWave(){
        if(this.waveStep > this.waves.length){
            return
        }
        for(let i = 0; i < this.spawners.length; i++){
            this.spawners[i].setMobs(this.waves[this.waveStep-1][i])
        }
        this.waveStep ++
    }

    setWaves(waves){
        this.waves = waves
        this.waveStep = 1
    }

    setSpawners(spawners){
        this.spawners = spawners
    }

    waveCompleted(){
        for(let i = 0; i < this.spawners.length; i++){
            if (!this.spawners[i].mobsExhausted()){
                return false
            }
        }
        return true
    }


}