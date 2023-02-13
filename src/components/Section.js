export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

    // публичный метод, который отвечает за отрисовку всех элементов

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }

  // метод, который принимает DOM-элемент и добавляет его в контейнер

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
