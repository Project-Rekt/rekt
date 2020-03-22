import gril from "../../../spriteObjects/grillSprite";

export default class Weeb extends Monster {
  constructor(bounds) {
    super(bounds, 20, 0.1, 1, gril);
  }
}
