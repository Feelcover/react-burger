import { getCookie } from "./cookie";


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

export const forgotPassRequest = async email => {
	return await fetch(`${Api.url}/password-reset`, {
		method: 'POST',
		body: JSON.stringify(
			email
		),
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
		.then(processResponse);
}

export const resetPassRequest = async (password, token) => {
	return await fetch(`${Api.url}/password-reset/reset`, {
		method: 'POST',
		body: JSON.stringify(
			password,
			token,
		),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(processResponse);
}

export const loginRequest = async (email, password) => {
	return await fetch(`${Api.url}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then(processResponse);
}

export const registerUserRequest = async (email, password, name) => {
	return await fetch(`${Api.url}/auth/register`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(processResponse);
}

export const logoutRequest = async () => {
	return await fetch(`${Api.url}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(processResponse);
}

export const getUserRequest = async () => {
	return await fetch(`${Api.url}/auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
	})
		.then(processResponse);
}

export const updateUserRequest = async (email, name, password) => {
	return await fetch(`${Api.url}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			email: email,
			name: name,
			password: password,
		}),
	})
		.then(processResponse);
}

export const updateTokenRequest = async () => {
	return await fetch(`${Api.url}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(processResponse);
}
