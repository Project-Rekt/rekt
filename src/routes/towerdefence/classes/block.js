import Engine from 'engine';
export default class Block extends Engine.Actor {
    constructor(x, y) {
        super({});
        this.x = x;
        this.y = y;
        this.realX = (x+1) * 50 - 25;
        this.realY = (y+1) * 50 - 25;
    }

    render = (dt) => {
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);
        this.ctx.fillStyle = "#8F8F8F";
        this.ctx.fillRect(this.realX - 25, this.realY - 25, 50, 50);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("B", this.realX, this.realY + 8);
    }
}