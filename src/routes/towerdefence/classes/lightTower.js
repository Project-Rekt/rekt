//Low damage but fast firing tower
import Tower from './tower'

export default class LightTower extends Tower{
    constructor(x, y){
        super(x, y);
        this.atkspeed = 70;
        this.atk = 3;
        this.range = 3;
        this.cost = 50;
    }

    render = (dt) => {
        this.realX = this.positionX * this.stage.blockWidth + this.stage.startX
        this.realY = this.positionY * this.stage.blockHeight + this.stage.startY
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(this.realX, this.realY, this.stage.blockWidth, this.stage.blockHeight);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("L", this.realX + this.stage.blockWidth/2, this.realY + this.stage.blockHeight/2 + 8);

        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.realX + this.stage.blockWidth/2, this.realY + this.stage.blockHeight/2, this.range * 50, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    upgrade = () => {
        if(this.level < 4){
            this.atk += 1
            this.range += 0.5
            this.atkspeed -= 20
            this.level += 1
        }
    }
}