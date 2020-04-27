import DOMElement from "./domElement"

export default class Notification extends DOMElement {
    constructor(text, lifetime = 2000) {
        super("div");
        this.lifetime = lifetime;
        this.changeText(text);
        this.init();
        this.intro();
        this.outro();
    }

    //function called for setup
    init() {
        this.applyStyles({
            opacity: 1,
            fontSize: "30px"
        });
    }

    //function called for intro animation(default is nothing)
    intro() {

    }

    //function called for outro animation(default is opacity fade)
    outro() {
        let count = 1;
        let fps = 60;
        let fadeout = window.setInterval(function () {
            if (count <= 0) {
                window.clearInterval(fadeout);
                this.gui.removeInterface(this);
            }
            this.applyStyles({
                opacity: count
            });
            count -= 1/fps;
        }.bind(this), this.lifetime/fps);
    }
}