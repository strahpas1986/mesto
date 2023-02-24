export class UserInfo {
constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._info.textContent,
      avatar: this._avatar.src
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу

  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
