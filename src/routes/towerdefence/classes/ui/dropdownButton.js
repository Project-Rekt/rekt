import Button from './button';

export default class DropdownMenu extends Button {
    constructor(x, y, text, text_list) {
        super(x, y, text)
        this.subButtons = [];
        for(let i = 0; i < text_list.length; i++){
            this.subButtons.push(new Button(x, y + (i+1) * 50, text_list[i]));
            this.subButtons[i].applyStyles({
                position: "fixed",
                display: 'none'
            })         
        }
        this.toggle = false;
    }

    handler() {
        this.toggle = !this.toggle;
        for(let i = 0; i < this.subButtons.length; i++){
            this.subButtons[i].applyStyles({
                display: (this.toggle) ? 'block' : 'none'
            })
        }
    }

    create() {
        for(let i = 0; i < this.subButtons.length; i++){
            this.gui.addInterface(this.subButtons[i]);
        }
    }
}