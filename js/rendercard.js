class RenderCard {
  constructor(templateSelector) {
    this._element = document.querySelector(templateSelector).content.firstchild.cloneNode(true);
  }

  render(el) {
    el.prependChild(this._element);
  };
}
