import monkey from "../../../spriteObjects/monkeySprite";

export default class Weeb extends Monster {
  constructor(bounds) {
    super(bounds, 10, 0.1, 3, monkey);
  }
}
