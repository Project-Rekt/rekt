import Engine from 'engine';
export default class menuBackground extends Engine.Actor{
    constructor(){
        super({})

    }

    render = (dt) => {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(600, 0, 200, 600);
    }
}