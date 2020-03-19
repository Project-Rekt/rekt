import Engine from 'engine';
export default class BadButton extends Engine.Actor {

    constructor(x, y, text) {
        super({})
        this.x = x
        this.y = y
        this.text = text
        this.width = 25
        this.height = 25
    }


    activate(){

    }

    isClicked(x, y){
        if (x <= this.x + this.width && x >= this.x - this.width && y <= this.y + this.height && y >= this.y - this.height){
            //console.log("YES!!!")
            return true
        }
        return false
    }
    
    render = (dt) => {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x - 24, this.y - 24, 50, 50);

        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text, this.x, this.y + 10);
    }
}