export class UserInfo {
constructor({name, info}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

  // возвращает объект с данными пользователя

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
