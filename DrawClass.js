class Draw {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  rect({x, y, w, h, color = 'black', tag = 'fill', style = {}}) {
    // x, y를 중앙 기준에서 좌상단 기준으로 변환
    const left = x - w / 2;
    const top = y - h / 2;

    this.ctx.save();
    this.ctx.lineWidth = style.lineWidth || this.ctx.lineWidth;
    this.ctx.fillStyle = style.fillStyle || color;
    this.ctx.strokeStyle = style.strokeStyle || color;

    if (tag === 'fill') {
      this.ctx.fillRect(left, top, w, h);
    } else if (tag === 'line') {
      this.ctx.strokeRect(left, top, w, h);
    }

    this.ctx.restore();
  }
}

export default Draw;
