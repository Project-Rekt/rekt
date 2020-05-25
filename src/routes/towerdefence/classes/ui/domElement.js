export default class DOMElement {
        constructor(element) {
            this.element = document.createElement(element);
        }
        
        applyStyles(styles) {
            Object.assign(this.element.style, styles);
        }
    
        changeText(text) {
            this.text = text;
            this.element.textContent = text;
        }
}