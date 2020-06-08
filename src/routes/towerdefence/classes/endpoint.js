import Engine from 'engine';
export default class EndPoint extends Engine.Actor {
    constructor(x, y) {
        super({});
        this.positionX = x;
        this.positionY = y;
        this.realX = 0//(x + 1) * 50 - 25;
        this.realY = 0//(y + 1) * 50 - 25;
    }

    render = (dt) => {/*
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("E", this.x - 25, this.y - 15);
        */
        this.realX = this.positionX * this.stage.blockWidth + this.stage.startX
        this.realY = this.positionY * this.stage.blockHeight + this.stage.startY

        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.realX, this.realY, this.stage.blockWidth, this.stage.blockHeight);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("E", this.realX + this.stage.blockWidth/2, this.realY + this.stage.blockHeight/2 + 10);

        
    }
}