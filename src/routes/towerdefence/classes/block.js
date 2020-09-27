import Engine from 'engine';
import TerrainBlocker from './terrainBlocker';
export default class Block extends TerrainBlocker {
    constructor(x, y) {
        super({}, x, y, null);
    }

    render = (dt) => {//(x + 1) * 50 - 25
        this.realX = this.positionX * this.stage.blockWidth + this.stage.startX
        this.realY = this.positionY * this.stage.blockHeight + this.stage.startY
        //console.log(this.stage.blockWidth)
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect(this.x - 49, this.y - 49, 49, 49);
        this.ctx.fillStyle = "#8F8F8F";
        this.ctx.fillRect(this.realX, this.realY, this.stage.blockWidth, this.stage.blockHeight);

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("B", this.realX + this.stage.blockWidth/2, this.realY + 8 + this.stage.blockHeight/2);
    }
}