export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

    // публичный метод, который отвечает за отрисовку всех элементов

  renderItems() {
    this._renderedItems.forEach((items) => {
      this._renderer(items);
    })
  }

  // метод, который принимает DOM-элемент и добавляет его в контейнер

  addItem(cardElement) {
    this._container.append(cardElement);
  }
}
