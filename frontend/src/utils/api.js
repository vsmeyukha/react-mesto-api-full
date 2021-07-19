export const BASE_URL = 'https://api.victor.nomoredomains.rocks';

function _getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(_getResponseData);
};

export const addNewCard = (obj) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  .then(_getResponseData);
};

export const deleteCard = (id) => {
  return fetch(`${BASE_URL}/cards/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(_getResponseData);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(_getResponseData);
};

export const editProfile = (obj) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  .then(_getResponseData);
};

export const changeAvatar = (obj) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  .then(_getResponseData);
};

export const addALike = (id) => {
  return fetch(`${BASE_URL}/cards/likes/${id}`, {
    method: 'PUT',
    credentials: 'include',
  })
  .then(_getResponseData);
};

export const deleteLike = (id) => {
  return fetch(`${BASE_URL}/cards/likes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(_getResponseData);
};

export const changeLikeCardStatus = (id, isLiked) => {
  if (isLiked) {
    return addALike(id);
  }
  else {
    return deleteLike(id);
  }

}







// class Api {
//   constructor(baseUrl) {
//     this.baseUrl = baseUrl
//   }

//   _getResponseData(url, method, headers, body) {
//     return fetch(url, {
//       method: method,
//       headers: headers,
//       body: body
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();  
//         } else {
//           return Promise.reject();
//         }
//       });
//   }

//   getInitialCards() {
//     return this._getResponseData(`${this.baseUrl}/cards`, 'GET');
//   }

//   addNewCard(obj) {
//     return this._getResponseData(`${this.baseUrl}/cards`, 'POST', { 'Content-Type': 'application/json' }, JSON.stringify(obj));
//   }

//   deleteCard(id) {
//     return this._getResponseData(`${this.baseUrl}/cards/${id}`, 'DELETE', this.headers);
//   }

//   getUserInfo() {
//     return this._getResponseData(`${this.baseUrl}/users/me`, 'GET', this.headers);
//   }
  
//   getAllNeededData() {
//     return Promise.all([this.getUserInfo(), this.getInitialCards()]);
//   }

//   editProfile(obj) {
//     return this._getResponseData(`${this.baseUrl}/users/me`, 'PATCH', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
//   }

//   changeAvatar(obj) {
//     return this._getResponseData(`${this.baseUrl}/users/me/avatar`, 'PATCH', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
//   }

//   addALike(id) {
//     return this._getResponseData(`${this.baseUrl}/cards/likes/${id}`, 'PUT', this.headers);
//   }

//   deleteLike(id) {
//     return this._getResponseData(`${this.baseUrl}/cards/likes/${id}`, 'DELETE', this.headers);
//   }

//   changeLikeCardStatus(id, isLiked) {
//     if (isLiked) {
//       return this.addALike(id);
//     }
//     else {
//       return this.deleteLike(id);
//     }

//   }
// }

// const api = new Api('https://api.victor.nomoredomains.rocks');

// class Api {
//   constructor(apiKey, baseUrl) {
//     this.headers = {
//       authorization: apiKey
//     };
//     this.baseUrl = baseUrl
//   }

//   _getResponseData(url, method, headers, body) {
//     return fetch(url, {
//       method: method,
//       headers: headers,
//       body: body
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();  
//         } else {
//           return Promise.reject();
//         }
//       });
//   }

//   getInitialCards() {
//     return this._getResponseData(`${this.baseUrl}/cards`, 'GET', this.headers);
//   }

//   addNewCard(obj) {
//     return this._getResponseData(`${this.baseUrl}/cards`, 'POST', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
//   }

//   deleteCard(id) {
//     return this._getResponseData(`${this.baseUrl}/cards/${id}`, 'DELETE', this.headers);
//   }

//   getUserInfo() {
//     return this._getResponseData(`${this.baseUrl}/users/me`, 'GET', this.headers);
//   }
  
//   getAllNeededData() {
//     return Promise.all([this.getUserInfo(), this.getInitialCards()]);
//   }

//   editProfile(obj) {
//     return this._getResponseData(`${this.baseUrl}/users/me`, 'PATCH', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
//   }

//   changeAvatar(obj) {
//     return this._getResponseData(`${this.baseUrl}/users/me/avatar`, 'PATCH', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
//   }

//   addALike(id) {
//     return this._getResponseData(`${this.baseUrl}/cards/likes/${id}`, 'PUT', this.headers);
//   }

//   deleteLike(id) {
//     return this._getResponseData(`${this.baseUrl}/cards/likes/${id}`, 'DELETE', this.headers);
//   }

//   changeLikeCardStatus(id, isLiked) {
//     if (isLiked) {
//       return this.addALike(id);
//     }
//     else {
//       return this.deleteLike(id);
//     }

//   }
// }

// const api = new Api('2dbd0122-ea43-4557-862d-f5c5a66a918e', 'https://api.victor.nomoredomains.rocks');

// export default api;