import Engine from 'engine';
export default class Node extends Engine.Actor {
    constructor(bounds) {
        super(bounds);
    }

    render = (dt) => {
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    }
}
