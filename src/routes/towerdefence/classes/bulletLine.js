import Engine from 'engine';
export default class BulletLine extends Engine.Actor {
    constructor(maxLifeTime, x1, y1, x2, y2) {
        super({});
        this.maxLifeTime = maxLifeTime
        this.lifeTime = maxLifeTime
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2
        this.y2 = y2
    }

    update = (dt) => {
        this.lifeTime = this.lifeTime - dt
        if (this.lifeTime <= 0){
            this.destroy(dt)
        }
    }

    destroy = (dt) => {
        this.ctx.clearRect((this.x1 + this.x2)/2, (this.y1 + this.y2)/2, Math.abs(this.x2-this.x1), Math.abs(this.y2-this.y1));
        this.stage.removeActor(this)
    }

    render = (dt) => {
        let ratio = (this.lifeTime / this.maxLifeTime) * 254
        
        let hexComponent = Math.floor(ratio).toString(16)
        let colorString = "#" + hexComponent + hexComponent + hexComponent
        this.ctx.strokeStyle = colorString;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1, this.y1);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.stroke();
    }
}