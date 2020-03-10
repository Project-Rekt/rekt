import Engine from 'engine';

export default class Background extends Engine.Actor {
    constructor(bounds) {
        super(bounds);
    }

    render = (dt) => {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    }
}