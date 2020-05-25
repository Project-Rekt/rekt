import DOMElement from "./domElement";
import Image from "./image";

export default class ImageHoverText extends Image {
    constructor(image, x, y, width, height, alt_text){
        super(image, x, y, width, height);
        this.alt = new DOMElement('p');
        this.alt.applyStyles(
            {
                position: "fixed",
                top: `${y+20}px`,
                left: `${x+26}px`,
                display: 'none',
                color: 'grey',
            });
        this.alt.changeText(alt_text)
    }

    handler_onHover() {
        console.log("Hi!");
        this.alt.applyStyles({
            display: 'block'
        })
    }

    handler_onExit() {
        console.log("Bye!");
        this.alt.applyStyles({
            display: 'none'
        })
    }

    create(){
        this.gui.addInterface(this.alt)
    }

    changeAltText(alt_text) {
        this.alt.changeText(alt_text);
    }
}