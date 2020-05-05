import DOMElement from "./domElement";

export default class Image extends DOMElement {
    constructor(image, x, y, width, height) {
        super("img");
        this.element.src = image;
        this.changePosition(x, y);
        this.changeSize(width, height);
        this.element.style.zIndex = "-1";
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