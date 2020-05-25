export default class GUI {
    constructor(element, stage) {
        this.element = element;
        this.stage = stage;
    }

    addInterface(inter) {
        this.element.appendChild(inter.element);
        inter.stage = this.stage;
        inter.gui = this;

        //call create function this happens with stage and gui refs
        if(inter.create) {
            inter.create();
        }
    }

    removeInterface(inter) {
        this.element.removeChild(inter.element);
    }
}