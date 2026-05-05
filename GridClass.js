import SuperElement from './SuperElement.js';
import GridContainer from './GridContainer.js';

class CridElement extends SuperElement {
  constructor({
    draw = null,
    container = null,
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
    super({id, x, y, w, h, color, style, tag, context});
    this.draw = draw;
    this.container = container || new GridContainer({rows, cols});
  }

  setContainer(container) {
    this.container = container;
  }

  getContainer() {
    return this.container;
  }

  addElement(row, col, element) {
    return this.container.addCell(row, col, element);
  }

  drawGridLines({x = 0, y = 0, cols = 3, rows = 3, width = 120, height = 120, color = 'black'} = {}) {
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    const startX = x - width / 2;
    const startY = y - height / 2;

    // 가로선 그리기
    for (let i = 0; i <= rows; i++) {
      this.draw.rect({
        x: x,
        y: startY + i * cellHeight,
        w: width,
        h: 1,
        color: color,
        tag: 'fill'
      });
    }

    // 세로선 그리기
    for (let i = 0; i <= cols; i++) {
      this.draw.rect({
        x: startX + i * cellWidth,
        y: y,
        w: 1,
        h: height,
        color: color,
        tag: 'fill'
      });
    }
  }

  drawGridBackground({x = 0, y = 0, cols = 3, rows = 3, width = 120, height = 120, borderWidth = 1, color = 'white'} = {}) {
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    const startX = x - width / 2;
    const startY = y - height / 2;

    // 각 셀의 배경 그리기
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cellX = startX + col * cellWidth + cellWidth / 2;
        const cellY = startY + row * cellHeight + cellHeight / 2;
        const cellW = cellWidth - borderWidth;
        const cellH = cellHeight - borderWidth;

        this.draw.rect({
          x: cellX,
          y: cellY,
          w: cellW,
          h: cellH,
          color: color,
          tag: 'fill'
        });
      }
    }
  }

  drawGridElements({x = 0, y = 0, cols = 3, rows = 3, width = 120, height = 120, borderWidth = 1, defaultColor = 'gray'} = {}) {
    if (!this.container || !this.container.getCells || this.container.getCells().length === 0) {
      return;
    }

    const cellWidth = width / cols;
    const cellHeight = height / rows;
    const startX = x - width / 2;
    const startY = y - height / 2;
    const defaultElementW = Math.max(0, cellWidth - borderWidth * 2);
    const defaultElementH = Math.max(0, cellHeight - borderWidth * 2);

    this.container.getCells().forEach((cell) => {
      const position = typeof cell.getPosition === 'function'
        ? cell.getPosition()
        : { row: cell.row, col: cell.col };
      const element = typeof cell.getElement === 'function'
        ? cell.getElement()
        : cell.element;

      if (!element || position.row == null || position.col == null) {
        return;
      }

      const row = position.row;
      const col = position.col;
      if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return;
      }

      const baseX = startX + col * cellWidth + cellWidth / 2;
      const baseY = startY + row * cellHeight + cellHeight / 2;
      const elementX = baseX + (element.x != null ? element.x : 0);
      const elementY = baseY + (element.y != null ? element.y : 0);
      const elementW = element.w > 0 ? element.w : defaultElementW;
      const elementH = element.h > 0 ? element.h : defaultElementH;
      const color = element.color || defaultColor;
      const tag = element.tag || 'fill';
      const style = element.style || {};

      this.draw.rect({
        x: elementX,
        y: elementY,
        w: elementW,
        h: elementH,
        color,
        tag,
        style
      });
    });
  }
}

export default CridElement;
