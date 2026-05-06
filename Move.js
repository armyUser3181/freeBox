/**
 * Movement vector class with velocity and acceleration.
 * 속도와 가속도를 가진 이동 벡터 클래스입니다.
 */
class Move {
  /**
   * @param {Object} params
   * @param {number} [params.vx=0] - x-axis velocity
   * @param {number} [params.vy=0] - y-axis velocity
   * @param {number} [params.ax=0] - x-axis acceleration
   * @param {number} [params.ay=0] - y-axis acceleration
   */
  constructor({ vx = 0, vy = 0, ax = 0, ay = 0 } = {}) {
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
  }

  clone() {
    return new Move({ vx: this.vx, vy: this.vy, ax: this.ax, ay: this.ay });
  }

  add(other) {
    if (!other) {
      return this.clone();
    }
    return new Move({
      vx: this.vx + other.vx,
      vy: this.vy + other.vy,
      ax: this.ax + other.ax,
      ay: this.ay + other.ay
    });
  }

  subtract(other) {
    if (!other) {
      return this.clone();
    }
    return new Move({
      vx: this.vx - other.vx,
      vy: this.vy - other.vy,
      ax: this.ax - other.ax,
      ay: this.ay - other.ay
    });
  }

  scale(factor = 1) {
    return new Move({
      vx: this.vx * factor,
      vy: this.vy * factor,
      ax: this.ax * factor,
      ay: this.ay * factor
    });
  }

  update(deltaTime = 1) {
    this.vx += this.ax * deltaTime;
    this.vy += this.ay * deltaTime;
    return this;
  }

  deltaPosition(deltaTime = 1) {
    return {
      x: this.vx * deltaTime + 0.5 * this.ax * deltaTime * deltaTime,
      y: this.vy * deltaTime + 0.5 * this.ay * deltaTime * deltaTime
    };
  }

  toString() {
    return `Move(vx=${this.vx.toFixed(2)}, vy=${this.vy.toFixed(2)}, ax=${this.ax.toFixed(2)}, ay=${this.ay.toFixed(2)})`;
  }
}

export default Move;
