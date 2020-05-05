import DOMElement from "./domElement"
import Button from './button'
import TowerSelect from './towerSelect'

export default class TowerSelectMenu extends Button {
    constructor(x, y, text, text_list, tower_list) {
        super(x, y, text)
        this.subButtons = [];
        for(let i = 0; i < tower_list.length; i++){
            this.subButtons.push(new TowerSelect(x + 100, y + (i * 50), text_list[i], tower_list[i]));
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

    changeTipText(tip_text) {
        this.tip.changeText(tip_text);
    }
}