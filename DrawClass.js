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
    // 중앙 좌표를 캔버스로 좌상단 좌표로 변환합니다.
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

  /**
   * Draws text on the canvas.
   * 캔버스에 텍스트를 그립니다.
   * @param {Object} params
   * @param {number} params.x - center x-coordinate
   * @param {number} params.y - center y-coordinate
   * @param {string} params.text - text string
   * @param {string} [params.color='black']
   * @param {string} [params.font='16px sans-serif']
   * @param {'fill'|'line'} [params.tag='fill']
   * @param {string} [params.align='center']
   * @param {string} [params.baseline='middle']
   * @param {Object} [params.style={}] - optional style override
   */
  text({x, y, text = '', color = 'black', font = '16px sans-serif', tag = 'fill', align = 'center', baseline = 'middle', style = {}}) {
    this.ctx.save();
    this.ctx.font = style.font || font;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.fillStyle = style.fillStyle || color;
    this.ctx.strokeStyle = style.strokeStyle || color;
    this.ctx.lineWidth = style.lineWidth || this.ctx.lineWidth;

    if (tag === 'fill') {
      this.ctx.fillText(text, x, y);
    } else if (tag === 'line') {
      this.ctx.strokeText(text, x, y);
    this.ctx.restore();
    }
  }
}

export default Draw;
