import SuperElement from './SuperElement.js';

/**
 * Rectangle element class for canvas rendering.
 * 캔버스 렌더링을 위한 사각형 요소 클래스입니다.
 */
class RectElement extends SuperElement {
  /**
   * Creates a new RectElement instance.
   * 새로운 RectElement 인스턴스를 생성합니다.
   * @param {Object} params - constructor parameters
   * @param {string|null} [params.id=null] - unique identifier / 고유 식별자
   * @param {number} [params.x=0] - x-coordinate / x 좌표
   * @param {number} [params.y=0] - y-coordinate / y 좌표
   * @param {number} [params.w=0] - width / 너비
   * @param {number} [params.h=0] - height / 높이
   * @param {string} [params.color='gray'] - fill color / 채우기 색상
   * @param {Object} [params.style={}] - style overrides / 스타일 재정의
   * @param {'fill'|'line'} [params.tag='fill'] - draw mode / 그리기 모드
   * @param {Draw|null} [params.draw=null] - Draw instance reference / Draw 참조
   * @param {CanvasRenderingContext2D|null} [params.context=null] - canvas context / 캔버스 컨텍스트
   */
  constructor({
    id = null,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    color = 'gray',
    style = {},
    tag = 'fill',
    draw = null,
    context = null
  } = {}) {
    super({drawInstance: draw, id, x, y, w, h, color, style, tag, context});
  }

  /**
   * Draws the rectangle using the provided Draw instance.
   * 제공된 Draw 인스턴스를 사용해 사각형을 그립니다.
   * @param {Draw} [draw=null] - optional Draw instance
   * @param {{x:number,y:number}} [offset={x:0,y:0}] - position offset
   */
  draw(draw = null, offset = {x: 0, y: 0}) {
    const drawer = draw || this.drawInstance;
    if (!drawer || typeof drawer.rect !== 'function') {
      return;
    }

    const { x, y, w, h, color, style, tag } = this;
    drawer.rect({
      x: x + offset.x,
      y: y + offset.y,
      w,
      h,
      color,
      style,
      tag
    });
  }

  /**
   * Returns the axis-aligned bounds for the rectangle.
   * @param {{x:number,y:number}} [offset={x:0,y:0}]
   * @returns {{left:number,right:number,top:number,bottom:number}}
   */
  getBounds(offset = {x: 0, y: 0}) {
    const centerX = this.x + offset.x;
    const centerY = this.y + offset.y;
    const halfW = this.w / 2;
    const halfH = this.h / 2;

    return {
      left: centerX - halfW,
      right: centerX + halfW,
      top: centerY - halfH,
      bottom: centerY + halfH
    };
  }

  /**
   * Checks whether this rectangle collides with another rectangle.
   * @param {RectElement} other
   * @param {{x:number,y:number}} [offset={x:0,y:0}]
   * @param {{x:number,y:number}} [otherOffset={x:0,y:0}]
   * @returns {boolean}
   */
  collidesWith(other, offset = {x: 0, y: 0}, otherOffset = {x: 0, y: 0}) {
    if (!other || typeof other.getBounds !== 'function') {
      return false;
    }

    const a = this.getBounds(offset);
    const b = other.getBounds(otherOffset);

    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }
}

export default RectElement;
