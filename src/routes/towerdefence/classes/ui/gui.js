export default class GUI {
    constructor(element, stage) {
        this.element = element;
        this.stage = stage;
    }

    addInterface(inter) {
        this.element.appendChild(inter.element);
        inter.stage = this.stage;
        inter.gui = this;
    }

    removeInterface(inter) {
        this.element.removeChild(inter.element);
    }
}