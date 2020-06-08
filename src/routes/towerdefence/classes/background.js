import Engine from 'engine';

export default class Background extends Engine.Actor {
    constructor(color) {
        super({});
        this.realX = 0
        this.realY = 0
        this.width = 0
        this.height = 0
        this.color = color
    }

    render = (dt) => {
        this.width = this.stage.totalWidth
        this.height = this.stage.totalHeight
        this.realX = this.stage.startX
        this.realY = this.stage.startY
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.realX, this.realY, this.width, this.height);
    }
}