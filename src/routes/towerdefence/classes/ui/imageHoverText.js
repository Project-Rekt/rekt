import DOMElement from "./domElement";
import Image from "./image";

export default class ImageHoverText extends Image {
    constructor(image, x, y, width, height, alt_text){
        super(image, x, y, width, height);
        this.alt = new DOMElement('h1');
        this.alt.applyStyles(
            {
                position: "fixed",
                top: `${y+20}px`,
                left: `${x+26}px`,
                color: 'white',
                backgroundColor: 'rgba(0, 84, 148, 0.7)',
                fontSize: '30px',
                transition: '0.25s linear'
            });
        this.changeAltText(alt_text)
    }

    handler_onHover() {
        console.log("Hi!");
        this.alt.applyStyles({
            fontSize: "50px"
        })
    }

    handler_onExit() {
        console.log("Bye!");
        this.alt.applyStyles({
            fontSize: "30px"
        })
    }

    create(){
        this.gui.addInterface(this.alt)
    }

    changeAltText(alt_text) {
        this.alt.element.textContent = alt_text;
    }
}