import norm from "../../../spriteObjects/ryeSprite";

export default class Weeb extends Monster {
  constructor(bounds) {
    super(bounds, 25, 0.001, 3, norm);
  }
}
