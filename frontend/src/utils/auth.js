export const BASE_URL = 'https://api.victor.nomoredomains.rocks';

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(_checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(_checkResponse);
};

export const getUserData = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json', 
    }
  })
  .then(_checkResponse);
};

export const signOut = () => {
  return fetch(`${BASE_URL}/users/me/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(_checkResponse);
}