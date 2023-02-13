export class UserInfo {
constructor({name, about}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(about);
  }

  // возвращает объект с данными пользователя

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._info.textContent
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._info.textContent = about;
  }
}
