import Engine from 'engine';
export default class Line extends Engine.Actor {
    constructor(bounds) {
        super(bounds);
    }

    render = () => {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    }
}