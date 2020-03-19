//Low damage but fast firing tower
import Tower from './tower'

export default class LightTower extends Tower{
    constructor(x, y){
        super(x, y);
        this.atkspeed = 7;
        this.atk = 3;
        this.range = 3;
        this.cost = 50;
    }

    render = (dt) => {
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(this.realX - 24, this.realY - 24, 49, 49);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("L", this.realX, this.realY + 10);

        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.realX, this.realY, this.range * 50, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    upgrade = () => {
        if(this.level < 4){
            this.atk += 1
            this.range += 0.5
            this.atkspeed -= 2
            this.level += 1
        }
    }
}