import { BASE_IMG_LINK } from "./constants";
class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  // Получить сохраненные фильмы
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Добавить фильм в сохраненные

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: BASE_IMG_LINK + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: BASE_IMG_LINK + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://api.papina-movies.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default api;
