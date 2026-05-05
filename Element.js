/**
 * Base element class for drawing metadata.
 * 그리기 메타데이터를 담는 기본 요소 클래스입니다.
 */
class Element {
  /**
   * @param {Object} params - element parameters
   * @param {string|null} [params.id=null] - element identifier
   * @param {number} [params.x=0] - center x coordinate
   * @param {number} [params.y=0] - center y coordinate
   * @param {number} [params.w=0] - width
   * @param {number} [params.h=0] - height
   * @param {string} [params.color='gray'] - fill/stroke color
   * @param {Object} [params.style={}] - extra drawing styles
   * @param {'fill'|'line'} [params.tag='fill'] - drawing mode
   * @param {*} [params.context=null] - additional user context
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
   * Returns draw properties for rendering.
   * 렌더링을 위한 드로우 속성을 반환합니다.
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

export default Element;
