import DOMElement from "./domElement";

export default class Image extends DOMElement {
    constructor(image, x, y, width, height) {
        super("img");
        this.element.src = image;
        this.changePosition(x, y);
        this.changeSize(width, height);
        this.element.style.zIndex = "-1";
    }

    handler_onHover() {

    }

    handler_onExit() {
    
    }

    attachHandler() {
        this.element.removeEventListener("mouseover", this.handler_onHover)
        this.element.addEventListener("mouseover", this.handler_onHover.bind(this));
        this.element.removeEventListener("mouseout", this.handler_onExit)
        this.element.addEventListener("mouseout", this.handler_onExit.bind(this));
    }

    changePosition(x, y) {
        this.applyStyles(
            {
                position: "fixed",
                top: `${y}px`,
                left: `${x}px`
            });
    }

    changeSize(w, h) {
        this.applyStyles(
            {
                width: `${w}px`,
                height: `${h}px`
            });
    }
}