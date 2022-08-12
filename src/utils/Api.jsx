export const Api = {
  url: "https://norma.nomoreparties.space/api",
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

export const getIngredientsData = async () => {
  const res = await fetch(`${Api.url}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return processResponse(res);
};

export const getOrderDetailsData = async (productsId) => {
  const res = await fetch(`${Api.url}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: productsId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return processResponse(res);
};
