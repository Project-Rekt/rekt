export default class GUI {
    constructor(element, stage) {
        this.element = element;
        this.stage = stage;
        this.children = [];
    }

    addInterface(inter) {
        this.children.push(inter);
        this.element.appendChild(inter.element);
        inter.stage = this.stage;
        inter.gui = this;
    }
}