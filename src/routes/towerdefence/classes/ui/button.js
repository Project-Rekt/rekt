export default class Button {
    constructor(x, y, text) {
        this.element = document.createElement('button');
        this.changePosition(x, y);
        this.changeText(text);

        this.attachHandler();
    }

    handler() {
        console.log("You Clicked Me!");
        console.log(this.stage);
    }

    attachHandler() {
        this.element.removeEventListener('click', this.handler);
        this.element.addEventListener('click', this.handler.bind(this));
    }

    changePosition(x, y) {
        Object.assign(this.element.style,
            {
                position: "fixed",
                top: `${y}px`,
                left: `${x}px`
            });
    }

    changeText(text) {
        this.text = text;
        this.element.textContent = text;
    }
}