import ElementContainer from './ElementContainer.js';

class GridCell {
  constructor(row, col, element) {
    this.row = row;
    this.col = col;
    this.element = element;
  }

  getPosition() {
    return { row: this.row, col: this.col };
  }

  getElement() {
    return this.element;
  }

  setElement(element) {
    this.element = element;
  }
}

class GridContainer extends ElementContainer {
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

  addCell(row, col, element) {
    const cell = new GridCell(row, col, element);
    this.elements.push(cell);
    return cell;
  }

  getCell(row, col) {
    return this.elements.find((cell) => cell.row === row && cell.col === col) || null;
  }

  getCells() {
    return this.elements;
  }
}

export default GridContainer;
