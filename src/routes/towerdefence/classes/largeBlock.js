import TerrainBlocker from "./terrainBlocker"

export default class LargeBlock extends TerrainBlocker{
    constructor(x, y){
        super({}, x, y, [
            [1, 1], 
            [1, 1]
        ])
        this.cost = 25
    }

    render = (dt) => {
        this.realX = this.positionX * this.stage.blockWidth + this.stage.startX
        this.realY = this.positionY * this.stage.blockHeight + this.stage.startY
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);
        this.ctx.fillStyle = "#6F6F6F";
        this.ctx.fillRect(this.realX, this.realY, this.stage.blockWidth*2, this.stage.blockHeight*2);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("B", this.realX + this.stage.blockWidth, this.realY + 8 + this.stage.blockHeight);
    }
}