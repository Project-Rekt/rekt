import Engine from 'engine';
import Monster from './monster';

/*
 * spawn list in format of
 * 
 * [ <- every contained list in this bracket is a wave
 *      [ <- every contained list is a group of enemies for a spawner to take
 *          [ <- every contained list is a pair of [timing, monster]
 *              [timing, monster]
 *          ]
 *      ]
 * ]
 */

export default class Spawner extends Engine.Actor {
    constructor(x, y) {
        super({});
        this.positionX = x
        this.positionY = y
        this.realx = (x + 1) * 50;
        this.realy = (y + 1) * 50;
        this.path = [];
        this.mobs = [];
        this.spawned = [];
        this.startTime = 0.0;
        this.distance = 0
        this.scaleFunction = null
        this.scale = 1
    }

    setScaleFunction(func){
        this.scaleFunction = func
    }
    updateScale(n){
        this.scale = this.scaleFunction(n)
    }

    mobsExhausted(){
        if (this.mobs.length == 0){
            for(let i = 0; i < this.spawned.length; i++){
                if (this.spawned[i].isActive()){//!(this.spawned[i].isDead() || this.spawned[i].hasReachedGoal())){
                    //console.log("not exhausted")
                    //console.log(this.spawned[i].id)
                    return false
                }
            }
            return true
        }
        return false
    }

    update = (dt) => {
        this.spawnMobs(dt)
    }

    getPosition(){
        return [this.positionX, this.positionY]
    }

    isEmpty(){
        return this.mobs.length == 0
    }

    setPath(path){
        this.path = path
        this.distance = this.sumPath(path)
    }

    sumPath(path){
        let total = 0
        for(let i = 1; i < path.length; i++){
           total += Math.sqrt(Math.pow(path[i-1][0] - path[i][0], 2) + Math.pow(path[i-1][1] - path[i][1], 2))
       }
        return total
    }

    /*
     *uses realx and realy not x, y, which are virtual representations, not graphical
     */
    render = (dt) => {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.realx - 49, this.realy - 49, 49, 49);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("S", this.realx - 25, this.realy - 15);
    }

    /*
     * takes a list of lists where the inner list is
     * [timing, mob]
     * the list must be sorted in order of increasing timing
     */
    setMobs(mobs) {
        this.mobs = mobs
        this.startTime = 0.0
        this.spawned = []
    }

    spawnMobs(deltaTime) {
        this.startTime += deltaTime
        while (this.mobs.length > 0 && this.mobs[0][0] <= this.startTime) {
            let toSpawn = this.mobs[0][1]
            this.mobs.shift()
            this.spawn(toSpawn)
        }
    }

    /*
     * adds mob to world, sets coordinates to the spawner's, copies the path to the mob
     */
    spawn(mobType) {
        //console.log(mobType)
        let mob = new mobType({ x: 0, y: 0, width: 0, height: 0 })
        mob.scaleStats(this.scale)
        mob.updatePosition([this.positionY, this.positionX])
        mob.setDistance(this.distance)
        mob.setPath(this.path)
        //console.log(mob)
        this.stage.addActor(mob, 9)
        if(mob instanceof Monster) {
            //console.log("YEAH BITCH")
            mob.ctx = this.stage.fCanvas.getContext('2d')
          }
        this.spawned.push(mob)
        //console.log(mob)
    }

    mobsRemaining() {
        return this.mobs.length
    }
}
