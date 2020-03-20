//Low damage but fast firing tower
import Tower from "./tower";
import Effect from "./effect";

export default class HeavyTower extends Tower {
  constructor(x, y) {
    super(x, y);
    this.atkspeed = 45;
    this.atk = 15;
    this.range = 6;
    this.cost = 75;
    this.effect = new Effect("slow", "speed", 0.001);
  }

  render = dt => {
    this.ctx.fillStyle = "orange";
    this.ctx.fillRect(this.realX - 24, this.realY - 24, 49, 49);

    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("H", this.realX, this.realY + 10);

    this.ctx.strokeStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.realX, this.realY, this.range * 50, 0, 2 * Math.PI);
    this.ctx.stroke();
  };

  upgrade = () => {
    if (this.level < 4) {
      this.atk += 2;
      this.range += 0.5;
      this.atkspeed -= 4;
      this.level += 1;
    }
  };
}
