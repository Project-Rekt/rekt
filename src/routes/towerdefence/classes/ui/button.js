import DOMElement from "./domElement";

export default class Button extends DOMElement {
    constructor(x, y, text) {
        super("button");
        this.changePosition(x, y);
        this.changeText(text);

        this.attachHandler();
    }

    handler() {

    }

    attachHandler() {
        this.element.removeEventListener('click', this.handler);
        this.element.addEventListener('click', this.handler.bind(this));
    }

    changePosition(x, y) {
        this.applyStyles(
            {
                position: "fixed",
                top: `${y}px`,
                left: `${x}px`
            });
    }
}