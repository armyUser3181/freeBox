import SuperElement from './SuperElement.js';

class RectElement extends SuperElement {
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
    super({id, x, y, w, h, color, style, tag, context});
  }
}

export default RectElement;
