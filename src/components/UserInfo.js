export class UserInfo {
constructor({name, job}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(job);
  }

  // возвращает объект с данными пользователя

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._info.textContent
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._info.textContent = job;
  }
}
