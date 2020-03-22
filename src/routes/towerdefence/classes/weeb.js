import weeb from "../../../spriteObjects/weebSprite";

export default class Weeb extends Monster {
  constructor(bounds) {
    super(bounds, 10, 0.01, 2, weeb);
  }
}
