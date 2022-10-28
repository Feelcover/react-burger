import { getCookie, setCookie } from "./cookie";
import { TIngredientsResponse,
  TOrderDetailsResponse, TUserResponse, TUserLogoutResponse} from "../services/types";





export const Api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application.json",
  },
};

export const processResponse = <T>(res:Response): Promise<T>  => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

// function request(url: string, options: RequestInit) {
//   return fetch(url, options).then(res => processResponse<TAllResponse>(res));
// } Должна быть вместо fetch, но пока не понимаю как типизировать 

export const getIngredientsData = async () => {
  return await fetch(`${Api.url}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => processResponse<TIngredientsResponse>(res));

};

export const getOrderDetailsData = async (productsId: string[]) => {
  return await fetch(`${Api.url}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: productsId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  })
  .then(res => processResponse<TOrderDetailsResponse>(res));

};

export const forgotPassRequest = async (email:string) => {
  return await fetch(`${Api.url}/password-reset`, {
    method: "POST",
    body: JSON.stringify(email),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
  .then(res => processResponse<TUserResponse>(res));

};

export const resetPassRequest = async (password:string, token: any) => {
  return await fetch(`${Api.url}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify(password, token),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => processResponse<TUserResponse>(res));

};

export const loginRequest = async (email:string, password:string) => {
  return await fetch(`${Api.url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .then(res => processResponse<TUserResponse>(res));

};

export const registerUserRequest = async (email:string, password:string, name:string) => {
  return await fetch(`${Api.url}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => processResponse<TUserResponse>(res));

};

export const logoutRequest = async () => {
  return await fetch(`${Api.url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(res => processResponse<TUserLogoutResponse>(res));

};

export const getUserRequest = async () => {
  return await fetchRefresh(`${Api.url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  })
};

export const updateUserRequest = async (email:string, name:string, password:string) => {
  return await fetchRefresh(`${Api.url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  });
};

export const updateTokenRequest = async () => {
  return await fetch(`${Api.url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(res => processResponse<TUserResponse>(res));

};

export const fetchRefresh = async (url:string, options:RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await processResponse<TUserResponse>(res);
  } catch (err:any) {
    if (err.message === "jwt expired") {
      const refreshToken = await updateTokenRequest();
      const accessToken = refreshToken.accessToken.split("Bearer ")[1];
      if (!refreshToken.success) {
        Promise.reject(refreshToken);
      }
      localStorage.setItem("refreshToken", refreshToken.refreshToken);
      setCookie("token", accessToken);
      (options.headers as { [key: string]: string }).Authorization = refreshToken.accessToken;
      const res = await fetch(url, options);
      return await processResponse<TUserResponse>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
