import monkey from "../spriteObjects/monkeySprite";
import Monster from "./monster";

export default class Monkey extends Monster {
  constructor(bounds) {
    super(bounds, 4, 0.02, 2, monkey);
  }
}
