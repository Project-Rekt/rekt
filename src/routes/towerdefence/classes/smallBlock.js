import TerrainBlocker from "./terrainBlocker"

export default class SmallBlock extends TerrainBlocker{
    constructor(x, y){
        super({}, x, y, null)
        this.cost = 10
    }

    render = (dt) => {
        
        this.realX = this.positionX * this.stage.blockWidth + this.stage.startX
        this.realY = this.positionY * this.stage.blockHeight + this.stage.startY
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);
        this.ctx.fillStyle = "#3F3F3F";        
        this.ctx.fillRect(this.realX, this.realY, this.stage.blockWidth, this.stage.blockHeight);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("B", this.realX + this.stage.blockWidth/2, this.realY + this.stage.blockHeight/2 + 8);
    }
}