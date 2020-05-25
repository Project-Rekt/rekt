import TerrainBlocker from "./terrainBlocker"

export default class MediumBlock extends TerrainBlocker{
    constructor(x, y){
        super({}, x, y, [[1, 1]])
        this.cost = 15
    }

    render = (dt) => {
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);
        this.ctx.fillStyle = "#4F4F4F";
        this.ctx.fillRect(this.realX-25, this.realY - 25, 100, 50);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("B", this.realX+25, this.realY + 8);
    }
}