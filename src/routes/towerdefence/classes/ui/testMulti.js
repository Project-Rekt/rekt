import DOMElement from "./domElement"
import Button from './button'

export default class TestMulti extends Button {
    constructor(x, y, text, tip_text) {
        super(x, y, text)
        this.tip = new DOMElement('p')
        this.tip.applyStyles(
            {
                position: "fixed",
                top: `${y-65}px`,
                left: `${x+5}px`,
                display: 'none'
            });
        this.tip.changeText(tip_text)
        this.toggle = false;
    }

    handler() {
        this.toggle = !this.toggle;
        this.tip.applyStyles({
            display: (this.toggle) ? 'block' : 'none'
        })
    }

    create() {
        console.log("Added tool tip")
        this.gui.addInterface(this.tip);
    }

    changeTipText(tip_text) {
        this.tip.changeText(tip_text);
    }
}