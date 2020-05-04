import DOMElement from "./domElement"
import Button from './button'

export default class TestMulti extends Button {
    constructor(x, y, text) {
        super(x, y, text)
        this.tip = new DOMElement('p')
        this.tip.applyStyles(
            {
                position: "fixed",
                top: `${y-50}px`,
                left: `${x}px`,
                display: 'none'
            });
        this.tip.changeText("HI IM A TOOL TIP")
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
}