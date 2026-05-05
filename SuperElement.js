/**
 * Super base class for drawable element metadata.
 * 그리기 가능한 요소 메타데이터의 최상위 클래스입니다.
 */
class SuperElement {
  /**
   * @param {Object} params - base parameters
   * @param {string|null} [params.id=null] - unique identifier
   * @param {number} [params.x=0] - center x coordinate
   * @param {number} [params.y=0] - center y coordinate
   * @param {number} [params.w=0] - width
   * @param {number} [params.h=0] - height
   * @param {string} [params.color='gray'] - default color
   * @param {Object} [params.style={}] - drawing style options
   * @param {'fill'|'line'} [params.tag='fill'] - draw mode
   * @param {*} [params.context=null] - arbitrary metadata
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
    context = null
  } = {}) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.style = style;
    this.tag = tag;
    this.context = context;
  }

  /**
   * Get common drawing properties.
   * 공통 드로우 속성을 반환합니다.
   * @returns {Object}
   */
  getDrawProperties() {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      color: this.color,
      style: this.style,
      tag: this.tag
    };
  }
}

export default SuperElement;
