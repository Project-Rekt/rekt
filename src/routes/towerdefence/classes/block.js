import Engine from 'engine';
export default class Block extends Engine.Actor {
    constructor(x, y) {
        super({});
        this.x = (x + 1) * 50;
        this.y = (y + 1) * 50;
    }

    render = (dt) => {
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("B", this.x - 25, this.y - 15);
    }
}