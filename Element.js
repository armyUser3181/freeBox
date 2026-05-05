class Element {
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
