import DOMElement from "./domElement"
import Button from './button';

export default class OptionsMenu extends Button {
    constructor(x, y, text, text_list) {
        super(x, y, text)
        this.overlay = new DOMElement("div");
        this.overlay.applyStyles({
            position: 'absolute',
            width: `${200}px`,
            height: `${150}px`,
            top: `${150}px`,
            left: `${150}px`,
            background: 'white'
        });
        this.overlay.element.style.zIndex = "100";
        this.subButtons = [];
        for(let i = 0; i < text_list.length; i++){
            let b = new Button(x, y + (i+1) * 50, text_list[i])
            this.subButtons.push(b)
            this.subButtons[i].applyStyles({
                position: "fixed",
                display: 'none',
                width: '75px'
            })    
            this.overlay.element.appendChild(document.createTextNode(b));
        }
        this.toggle = false;
    }

    handler() {
        this.toggle = !this.toggle;
        for(let i = 0; i < this.subButtons.length; i++){
            this.subButtons[i].applyStyles({
                display: (this.toggle) ? 'block' : 'none'
            })
        }
        this.overlay.applyStyles({
            display: (this.toggle) ? 'block' : 'none'
        })
    }

    create() {
        for(let i = 0; i < this.subButtons.length; i++){
            this.gui.addInterface(this.subButtons[i]);
        }
    }
}