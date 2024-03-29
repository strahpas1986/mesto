export class Api {
  constructor(options) {
    this._options = options;
    this._serverUrl = this._options.serverUrl;
    this._headers = this._options.headers;
  }
  // Загрузка информации о пользователе с сервера

  getUserInfo() {
    return fetch(this._serverUrl + '/users/me', {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //Загрузка карточек с сервера

  getInitialCards() {
    return fetch(this._serverUrl + '/cards', {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //Редактирование профиля

  editProfileInfo(name, about) {
    return fetch(this._serverUrl + '/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this._getResponseData);
  }

  //Добавление новой карточки

  addNewCard(name, link) {
    return fetch(this._serverUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      }),
    })
    .then(this._getResponseData);
  }

  //

  deleteInitialCards(_id) {
    return fetch(this._serverUrl + '/cards/' + _id, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  putLike(_id) {
    return fetch(this._serverUrl + '/cards/' + _id + '/likes', {
      method: "PUT",
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  deleteLike(_id) {
    return fetch(this._serverUrl + '/cards/' + _id + '/likes', {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  changeAvatar(avatar) {
    return fetch(this._serverUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
