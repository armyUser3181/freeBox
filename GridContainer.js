import ElementContainer from './ElementContainer.js';

/**
 * GridCell stores a single element at matrix coordinates.
 * 행렬 위치에 요소를 저장하는 GridCell 클래스입니다.
 */
class GridCell {
  /**
   * @param {number} row - row index
   * @param {number} col - column index
   * @param {*} element - drawable element instance
   */
  constructor(row, col, element) {
    this.row = row;
    this.col = col;
    this.element = element;
  }

  /**
   * Returns the matrix position.
   * 위치 정보를 반환합니다.
   * @returns {{row: number, col: number}}
   */
  getPosition() {
    return { row: this.row, col: this.col };
  }

  /**
   * Returns the contained element.
   * 요소를 반환합니다.
   * @returns {*}
   */
  getElement() {
    return this.element;
  }

  /**
   * Sets the contained element.
   * 요소를 설정합니다.
   * @param {*} element - drawable element
   */
  setElement(element) {
    this.element = element;
  }
}

/**
 * GridContainer holds GridCell objects and inherits container behavior.
 * GridCell 객체를 보관하며 컨테이너 동작을 상속받는 클래스입니다.
 */
class GridContainer extends ElementContainer {
  /**
   * @param {Object} params - container parameters
   * @param {number} [params.rows=3] - number of rows
   * @param {number} [params.cols=3] - number of cols
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
    rows = 3,
    cols = 3
  } = {}) {
    super({id, x, y, w, h, color, style, tag, context, elements: []});
    this.rows = rows;
    this.cols = cols;
  }

  /**
   * Adds a new GridCell at the given row/col.
   * 지정한 행/열에 GridCell을 추가합니다.
   * @param {number} row - row index
   * @param {number} col - column index
   * @param {*} element - drawable element
   * @returns {GridCell}
   */
  addCell(row, col, element) {
    const cell = new GridCell(row, col, element);
    this.elements.push(cell);
    return cell;
  }

  /**
   * Returns the cell at row/col or null.
   * 행/열에 해당하는 셀을 반환합니다.
   * @param {number} row - row index
   * @param {number} col - column index
   * @returns {GridCell|null}
   */
  getCell(row, col) {
    return this.elements.find((cell) => cell.row === row && cell.col === col) || null;
  }

  /**
   * Returns all GridCell objects.
   * 모든 GridCell 객체를 반환합니다.
   * @returns {Array<GridCell>}
   */
  getCells() {
    return this.elements;
  }
}

export default GridContainer;
