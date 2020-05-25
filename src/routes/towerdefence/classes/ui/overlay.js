import DOMElement from './domElement';
import Button from './button'

export default class Overlay extends DOMElement{
    constructor(x, y, text_list){
        super("div")
        this.applyStyles({
            position: 'absolute',
            width: `200px`,
            height: `150px`,
            top: `${y}px`,
            left: `${x}px`,
            background: 'white'
        });
        this.element.style.zIndex = "100";
        this.subButtons = [];
        for(let i = 0; i < text_list.length; i++){
            let b = new Button(x + (i+1) * 50, y, text_list[i])
            this.subButtons.push(b)
            this.subButtons[i].applyStyles({
                position: "fixed",
                display: 'none'
            })    
            this.overlay.element.appendChild(document.createTextNode(b));
        }
    }
} 