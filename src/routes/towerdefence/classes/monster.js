import Engine from 'engine';
import moveOverPath from './movement'
export default class Monster extends Engine.Actor {
    constructor(hp, speed, def) {
        super({width: 50, height: 50 });
        //this.route = this.edgePath(path);
        this.vertex = 0;
        this.hp = hp;
        this.maxHp = hp
        this.speed = speed;
        this.def = def;
        this.distance = 0
        this.positionX = 0;
        this.positionY = 0;
        this.path = []
        this.step = 0
        this.reachedGoal = false
        this.dead = false
        this.active = true
        this.id = 0
        this.px = Math.round(this.bounds.x);
        this.py = Math.round(this.bounds.y);
    }

    render = (dt) => {
        //clearframe
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.px, this.py, this.bounds.width, this.bounds.height);

        this.px = Math.round(this.bounds.x);
        this.py = Math.round(this.bounds.y);

        //drawframe
        let ratio = (this.hp / this.maxHp) * 255
        let hexComponent = Math.floor(ratio).toString(16)
        //console.log(ratio + " " +hexComponent)
        let colorString = "#00" + hexComponent + "30"
        this.ctx.fillStyle = colorString;
        this.ctx.fillRect(this.px, this.py, this.bounds.width, this.bounds.height);
    }

    update = (dt) => {
        //console.log("acting! " + this.getPosition() + " hp: " + this.getHp())
        //console.log(this.id + " acting")
        if (this.isDead()){
            this.active = false
            //console.log("Dead! " + this.getPosition() + " hp: " + this.getHp())
            //console.log(this)
            this.stage.enemyKilled()
            this.destroy(dt)
            return
        }
        moveOverPath(this, dt)
        //this.distance -= this.speed*dt
        this.updateRealPosition()
        if (this.hasReachedGoal()){
            this.active = false
            this.stage.enemyReachedGoal()
            //console.log("Reached goal! " + this.getPosition())
            //console.log(this)
            this.destroy(dt)
        }

    }

    /*
     * update position for engine. pass x y values to function that translates virtual to visual position
     */
    updateRealPosition(){
        this.bounds.x = this.positionX * 50
        this.bounds.y = this.positionY * 50
    }

    destroy = (dt) => {
        //Clear boundingbox
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        
        //Remove actor from stage
        this.stage.removeActor(this)
    }

    hasReachedGoal(){
        this.reachedGoal = this.step + 1 >= this.path.length
        return this.reachedGoal
    }

    setPath(path){
        this.path = path
        this.step = 0
    }

    setStep(step){
        this.step = step
    }

    //Function to subtract health.
    takeDamage(damage) {
        this.hp -= damage;
    }

    //Function to add health.
    healDamage(heal) {
        this.hp += heal;
    }

    //position given in [y, x] format
    updatePosition(position) {
        this.positionX = position[1];
        this.positionY = position[0];
        this.updateRealPosition()
    }

    //Function to change distance.
    setDistance(distance) {
        this.distance = distance;
    }

    getHp(){
        return this.hp
    }
    getSpeed(){
        return this.speed
    }
    getDef(){
        return this.def
    }
    getDistance(){
        return this.distance
    }
    //position given in [y, x] format
    getPosition(){
        return [this.positionY, this.positionX]
    }
    getPath(){
        return this.path
    }
    getStep(){
        return this.step
    }
    isDead(){
        this.dead = this.hp <= 0
        //console.log(this.hp <= 0)
        return this.dead
    }

    edgePath(path) {
        // [y, x] coordinates
        let horizontal = false;
        let vertical = false;
        let edgePath = [];

        if (path[0][0] == path[1][0])
            vertical = true;
        else if (path[0][1] == path[1][1])
            horizontal = true;

        for (let i = 0; i < path.length - 1; i++) {
            if (vertical) {
                if (path[i][0] != path[i + 1][0]) {
                    edgePath.push(path[i]);
                    vertical = false;
                    horizontal = true;
                }
            }
            else if (horizontal) {
                if (path[i][1] != path[i + 1][1]) {
                    edgePath.push(path[i]);
                    vertical = true;
                    horizontal = false;
                }
            }
        }
        edgePath.push(path[path.length - 1]);
        return edgePath;
    }
    isActive(){
        return this.active
    }
}