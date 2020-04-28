import norm from "../spriteObjects/ryeSprite";
import Monster from "./monster";

export default class Normie extends Monster {
  constructor(bounds) {
    super(bounds, 5, 0.01, 7, norm);
  }
}
