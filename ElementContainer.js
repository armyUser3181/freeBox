import SuperElement from './SuperElement.js';

class ElementContainer extends SuperElement {
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

  addElement(element) {
    this.elements.push(element);
  }

  getElements() {
    return this.elements;
  }

  removeElement(predicate) {
    this.elements = this.elements.filter((element) => !predicate(element));
  }
}

export default ElementContainer;
