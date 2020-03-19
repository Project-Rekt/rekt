import Engine from 'engine';
import BulletLine from './bulletLine';

export default class Tower extends Engine.Actor {
    constructor(atkspeed, atk, targetingMode, range, x, y) {
        super({});
        this.atkspeed = atkspeed;
        this.atk = atk;
        this.targetingMode = targetingMode;
        this.range = range;
        this.positionX = x
        this.positionY = y
        this.realX = (x + 1) * 50 - 25;
        this.realY = (y + 1) * 50 - 25;
        this.aimAngle = 0.0
        this.target = null
        this.shotTimer = 0
        this.color = 'blue'
    }

    update = (dt) => {
        this.shotTimer += dt
        if (this.shotTimer > this.atkspeed){
            this.shotTimer = this.atkspeed
        }
        if (this.target == null || !this.target.isActive() ||  this.target.hasReachedGoal() || this.target.isDead() || !this.targetInRange()){
            //console.log("seeking target")
            this.findTarget()
            return
        }
        if(this.target == null){
            
        }
        else{
            this.turnToTarget(this.target)
            this.shoot(dt)
        }
    }

    targetInRange(){
        let distance = Math.sqrt(Math.pow(this.positionX - this.target.positionX, 2) + Math.pow(this.positionY - this.target.positionY, 2))
        return distance <= this.range
    }

    shoot(time){
        if (this.shotTimer >= this.atkspeed){
            //console.log("shooting!")
            this.shotTimer -= this.atkspeed
            this.fireBulletNoProjectile()
        }
    }

    fireBulletNoProjectile(){
        this.stage.addActor(new BulletLine(50, this.realX, this.realY, this.target.px + 25, this.target.py + 25), 30)
        //console.log(this.realX + " " + this.realY + " " + this.target.px + " " + this.target.py)
        this.target.takeDamage(this.atk)
    }

    render = (dt) => {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.realX - 24, this.realY - 24, 49, 49);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("T", this.realX, this.realY + 10);

        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.realX, this.realY, this.range * 50, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    turnToTarget(target){
        let targetPosition = target.getPosition()
        let currentPosition = [this.positionY, this.positionX]
        //pointing straight up or straight down case to avoid NaN with Math.atan() function
        if (currentPosition[1] - targetPosition[1] == 0)
        {
            if (currentPosition[0] - targetPosition[0] >= 0){
                this.aimAngle = Math.PI*0.5
            }
            else{
                this.aimAngle = Math.PI*1.5
            }
        }
        //general case
        else{
            this.aimAngle = Math.atan((currentPosition[0] - targetPosition[0])/(currentPosition[1] - targetPosition[1]))
        }
    }

    findTarget(){
        let inRange = this.findInRadius(this.stage.getActiveEnemies())
        this.target = this.prioritizeTarget(inRange)
    }
    findInRadius(entities) {
        let h = this.positionX;
        let k = this.positionY;
        let array = [];
    
        entities.forEach(element => {
            let x = element.positionX;
            let y = element.positionY;
            let distance = Math.sqrt(((x - h) ** 2) + ((y - k) ** 2))
            if (distance <= this.range) {
                array.push(element);
            };
        });
    
        return array;
    }
    prioritizeTarget(entities) {
        let target = entities[0];
    
        switch (this.targetingMode) {
            //Target monster with the lowest HP.
            case "lowestHP":
                entities.forEach(element => {
                    if (element.hp < target.hp) {
                        target = element;
                    }
                });
                break;
            
            //Target monster with the highest HP.
            case "highestHP":
                entities.forEach(element => {
                    if (element.hp > target.hp) {
                        target = element;
                    }
                });
                break;
            
            //Target monster nearest to the end point.
            case "nearest":
                entities.forEach(element => {
                    if (element.distance < target.distance) {
                        target = element;
                    }
                });
                break;
            
            //Target monster furthest to the end point.
            case "furthest":
                entities.forEach(element => {
                    if (element.distance > target.distance) {
                        target = element;
                    }
                });
                break;
        }
    
        return target;
    }

    //Function to change targeting mode.
    setMode(targetingMode) {
        this.targetingMode = targetingMode;
    }

    //Function to change tower range.
    setRange(range) {
        this.range = range;
    }
}