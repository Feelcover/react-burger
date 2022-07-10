export const Api = {
  url: "https://norma.nomoreparties.space/api/ingredients",
  headers: {
    "Content-Type": "application.json",
  },
};

export const processResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: Код ${res.status}`));
};

export function getData() {
  return fetch(`${Api.url}`)
    .then(processResponse)
    .catch((err) => {
      error = err;
    });
}

export let error = null;
