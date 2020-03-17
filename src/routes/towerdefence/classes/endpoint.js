import Engine from 'engine';
export default class EndPoint extends Engine.Actor {
    constructor(x, y) {
        super({});
        this.x = x;
        this.y = x;
        this.realX = (x + 1) * 50 - 25;
        this.realY = (y + 1) * 50 - 25;
    }

    render = (dt) => {/*
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("E", this.x - 25, this.y - 15);
        */

        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.realX - 24, this.realY - 24, 50, 50);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("E", this.realX, this.realY + 10);

        
    }
}