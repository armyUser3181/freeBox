/**
 * Draw utility for canvas rendering.
 * 캔버스 렌더링을 위한 Draw 유틸 클래스입니다.
 */
class Draw {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas element instance.
   * @param {HTMLCanvasElement} canvas 캔버스 요소 인스턴스
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  /**
   * Draws a rectangle on the canvas.
   * 캔버스에 사각형을 그립니다.
   * @param {Object} params - draw parameters
   * @param {number} params.x - center x-coordinate
   * @param {number} params.y - center y-coordinate
   * @param {number} params.w - rectangle width
   * @param {number} params.h - rectangle height
   * @param {string} [params.color='black'] - fill or stroke color
   * @param {'fill'|'line'} [params.tag='fill'] - draw mode
   * @param {Object} [params.style={}] - optional style override
   */
  rect({x, y, w, h, color = 'black', tag = 'fill', style = {}}) {
    // Convert center coordinates to top-left canvas coordinates.
    // 중앙 좌표를 캔버스 좌상단 좌표로 변환합니다.
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
