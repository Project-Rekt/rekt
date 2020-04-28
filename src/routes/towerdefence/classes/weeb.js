import weeb from "../spriteObjects/weebSprite";
import Monster from "./monster";

export default class Weeb extends Monster {
  constructor(bounds) {
    super(bounds, 6, 0.02, 0, weeb);
    this.states = weeb.states;
  }
}
