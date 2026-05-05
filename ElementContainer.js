import SuperElement from './SuperElement.js';

/**
 * Container for grouping drawable elements.
 * 드로우 요소를 모아서 관리하는 컨테이너 클래스입니다.
 */
class ElementContainer extends SuperElement {
  /**
   * @param {Object} params - container parameters
   * @param {string|null} [params.id=null] - identifier
   * @param {number} [params.x=0] - container x coordinate
   * @param {number} [params.y=0] - container y coordinate
   * @param {number} [params.w=0] - container width
   * @param {number} [params.h=0] - container height
   * @param {string} [params.color='gray'] - default container color
   * @param {Object} [params.style={}] - style overrides
   * @param {'fill'|'line'} [params.tag='fill'] - draw mode
   * @param {*} [params.context=null] - extra metadata
   * @param {Array} [params.elements=[]] - initial element list
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
    context = null,
    elements = []
  } = {}) {
    super({id, x, y, w, h, color, style, tag, context});
    this.elements = elements;
  }

  /**
   * Adds an element to the container.
   * 컨테이너에 요소를 추가합니다.
   * @param {*} element - any drawable element or container
   */
  addElement(element) {
    this.elements.push(element);
  }

  /**
   * Returns contained elements.
   * 컨테이너에 담긴 요소를 반환합니다.
   * @returns {Array}
   */
  getElements() {
    return this.elements;
  }

  /**
   * Removes elements that match the predicate.
   * 조건에 맞는 요소를 제거합니다.
   * @param {function(*): boolean} predicate - filter callback
   */
  removeElement(predicate) {
    this.elements = this.elements.filter((element) => !predicate(element));
  }
}

export default ElementContainer;
