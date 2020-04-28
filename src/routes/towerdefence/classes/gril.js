import gril from "../spriteObjects/grillSprite";
import Monster from "./monster";

export default class Gril extends Monster {
  constructor(bounds) {
    super(bounds, 15, 0.005, .1, gril);
  }
}
