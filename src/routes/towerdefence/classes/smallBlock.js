import TerrainBlocker from "./terrainBlocker"

export default class SmallBlock extends TerrainBlocker{
    constructor(x, y){
        super({}, x, y, null)
        this.cost = 10
    }

    render = (dt) => {
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);
        this.ctx.fillStyle = "#3F3F3F";
        this.ctx.fillRect(this.realX - 25, this.realY - 25, 50, 50);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("B", this.realX, this.realY + 8);
    }
}