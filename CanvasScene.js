import Draw from './DrawClass.js';
import Event from './Event.js';

/**
 * Manages canvas rendering, blocks, and collision checks.
 * 캔버스 렌더링과 블록 관리, 충돌 검사를 담당합니다.
 */
class CanvasScene {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.draw = new Draw(canvas);
    this.blocks = [];
    this.events = [];
    this.header = {
      title: '',
      score: 0,
      life: 0
    };
    this.running = false;
    this.lastTimestamp = null;
    this.animationFrameId = null;
  }

  addBlock(block) {
    if (!block) {
      return this;
    }
    block.drawInstance = block.drawInstance || this.draw;
    this.blocks.push(block);
    return this;
  }

  removeBlock(predicate) {
    this.blocks = this.blocks.filter((block) => !predicate(block));
    return this;
  }

  getBlocks() {
    return [...this.blocks];
  }

  addEvent(event) {
    if (event && typeof event.trigger === 'function' && typeof event.type === 'string') {
      this.events.push(event);
    }
    return this;
  }

  on(type, callback) {
    return this.addEvent(new Event(type, callback));
  }

  emitEvent(type, payload) {
    return this.events
      .filter((event) => event.type === type)
      .map((event) => event.trigger(payload));
  }

  setHeader(header) {
    this.header = {
      ...this.header,
      ...header
    };
    return this;
  }

  setScore(score) {
    this.header.score = score;
    return this;
  }

  clear() {
    const ctx = this.draw.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }

  drawHeader() {
    const title = this.header.title ? `${this.header.title} ` : '';
    const scoreText = `Score: ${this.header.score}`;
    const lifeText = this.header.life ? ` Life: ${this.header.life}` : '';
    this.draw.text({
      x: 10,
      y: 10,
      text: `${title}${scoreText}${lifeText}`,
      color: 'black',
      font: '16px sans-serif',
      align: 'left',
      baseline: 'top'
    });
    return this;
  }

  drawAll() {
    this.clear();
    this.blocks.forEach((block) => block.draw(this.draw));
    this.drawHeader();
    return this;
  }

  snapAdjacentTo(block, otherBlock) {
    if (!block || !otherBlock || typeof block.getBounds !== 'function' || typeof otherBlock.getBounds !== 'function') {
      return;
    }

    const a = block.getBounds();
    const b = otherBlock.getBounds();
    const overlapLeft = a.right - b.left;
    const overlapRight = b.right - a.left;
    const overlapTop = a.bottom - b.top;
    const overlapBottom = b.bottom - a.top;
    const distances = [
      { axis: 'x', offset: -overlapLeft, value: Math.abs(overlapLeft) },
      { axis: 'x', offset: overlapRight, value: Math.abs(overlapRight) },
      { axis: 'y', offset: -overlapTop, value: Math.abs(overlapTop) },
      { axis: 'y', offset: overlapBottom, value: Math.abs(overlapBottom) }
    ].filter((item) => item.value >= 0);

    if (distances.length === 0) {
      return;
    }

    distances.sort((a, b) => a.value - b.value);
    const best = distances[0];
    if (best.axis === 'x') {
      block.x += best.offset;
    } else {
      block.y += best.offset;
    }
  }

  update(deltaTime = 0) {
    this.blocks.forEach((block) => {
      if (typeof block.applyMove === 'function' && block.moveState) {
        const previousPosition = { x: block.x, y: block.y };
        block.applyMove(deltaTime);
        const collisions = this.getCollisions(block);
        if (collisions.length > 0) {
          block.x = previousPosition.x;
          block.y = previousPosition.y;
          this.snapAdjacentTo(block, collisions[0]);
          this.emitEvent('collision', {
            movingBlock: block,
            collidedBlock: collisions[0],
            previousPosition
          });
        }
      }
    });
    this.drawAll();
    return this;
  }

  getCollisions(block) {
    return this.blocks.filter((other) => other !== block && block.collidesWithBlock(other));
  }

  findAllCollisions() {
    const results = [];
    for (let i = 0; i < this.blocks.length; i += 1) {
      for (let j = i + 1; j < this.blocks.length; j += 1) {
        const a = this.blocks[i];
        const b = this.blocks[j];
        if (a.collidesWithBlock(b)) {
          results.push({ a, b });
        }
      }
    }
    return results;
  }

  start() {
    if (this.running) {
      return this;
    }
    this.running = true;
    this.lastTimestamp = performance.now();
    this._loop(this.lastTimestamp);
    return this;
  }

  stop() {
    this.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    return this;
  }

  _loop(timestamp) {
    if (!this.running) {
      return;
    }
    const delta = this.lastTimestamp ? (timestamp - this.lastTimestamp) / 1000 : 0;
    this.lastTimestamp = timestamp;
    this.update(delta);
    this.animationFrameId = requestAnimationFrame(this._loop.bind(this));
  }
}

export default CanvasScene;
