import {
  forgotPassRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  resetPassRequest,
  updateUserRequest,
  registerUserRequest,
  updateTokenRequest,
} from "../../utils/Api";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk, TUsers } from "../types";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" =
  "FORGOT_PASSWORD_FAILED";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const LOGIN_FORM_SET_VALUE: "LOGIN_FORM_SET_VALUE" =
  "LOGIN_FORM_SET_VALUE";
export const LOGIN_FORM_REQUEST: "LOGIN_FORM_REQUEST" = "LOGIN_FORM_REQUEST";
export const LOGIN_FORM_SUCCESS: "LOGIN_FORM_SUCCESS" = "LOGIN_FORM_SUCCESS";
export const LOGIN_FORM_FAILED: "LOGIN_FORM_FAILED" = "LOGIN_FORM_FAILED";
export const LOGOUT_FORM_REQUEST: "LOGOUT_FORM_REQUEST" = "LOGOUT_FORM_REQUEST";
export const LOGOUT_FORM_SUCCESS: "LOGOUT_FORM_SUCCESS" = "LOGOUT_FORM_SUCCESS";
export const LOGOUT_FORM_FAILED: "LOGOUT_FORM_FAILED" = "LOGOUT_FORM_FAILED";
export const PATCH_USER_REQUEST: "PATCH_USER_REQUEST" = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS: "PATCH_USER_SUCCESS" = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED: "PATCH_USER_FAILED" = "PATCH_USER_FAILED";
export const RESET_FORM_SET_VALUE: "RESET_FORM_SET_VALUE" =
  "RESET_FORM_SET_VALUE";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";
export const REGISTER_FORM_SET_VALUE: "REGISTER_FORM_SET_VALUE" =
  "REGISTER_FORM_SET_VALUE";
export const REGISTER_FORM_REQUEST: "REGISTER_FORM_REQUEST" =
  "REGISTER_FORM_REQUEST";
export const REGISTER_FORM_SUCCESS: "REGISTER_FORM_SUCCESS" =
  "REGISTER_FORM_SUCCESS";
export const REGISTER_FORM_FAILED: "REGISTER_FORM_FAILED" =
  "REGISTER_FORM_FAILED";
export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" =
  "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" =
  "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

export type TAuthorizationActions =
  | IResetPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IForgotPasswordFailed
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IGetUserFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IRegisterUserFailed
  | IRegisterUserRequest
  | IRegisterUserSuccess
  | ISingInFailed
  | ISingInRequest
  | ISingInSuccess
  | ISingOutFailed
  | ISingOutRequest
  | ISingOutSuccess
  | IUpdateTokenFailed
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | ISetResetFormValue
  | ISetLoginFormValue
  | ISetRegisterFormValue;

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
interface ISetResetFormValue {
  readonly type: typeof RESET_FORM_SET_VALUE;
  field: string;
  value: string;
}

export const setResetFormValue = (field: string, value: string) => ({
  type: RESET_FORM_SET_VALUE,
  field,
  value,
});

export const resetPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPassRequest(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
};

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  message: string;
}
interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export const forgotPassword: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPassRequest(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: res.message,
        });
      })
      .catch(() => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
};

export interface ISetLoginFormValue {
  readonly type: typeof LOGIN_FORM_SET_VALUE;
  field: string;
  value: string;
}

export const setLoginFormValue = (field: string, value: string) => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value,
});

interface ISingInSuccess {
  readonly user: TUsers;
  readonly type: typeof LOGIN_FORM_SUCCESS;
}
interface ISingInFailed {
  readonly type: typeof LOGIN_FORM_FAILED;
}
interface ISingInRequest {
  readonly type: typeof LOGIN_FORM_REQUEST;
}

export const singIn: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_FORM_REQUEST,
    });
    loginRequest(email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: LOGIN_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FORM_FAILED,
        });
      });
  };
};

interface ISingOutSuccess {
  readonly type: typeof LOGOUT_FORM_SUCCESS;
}
interface ISingOutFailed {
  readonly type: typeof LOGOUT_FORM_FAILED;
}
interface ISingOutRequest {
  readonly type: typeof LOGOUT_FORM_REQUEST;
}

export const singOut: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_FORM_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        const refreshToken = res.refreshToken;
        deleteCookie("token");
        localStorage.removeItem(refreshToken);
        if (res && res.success) {
          dispatch({
            type: LOGOUT_FORM_SUCCESS,
          });
        } else {
          dispatch({ type: LOGOUT_FORM_FAILED });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FORM_FAILED,
        });
      });
  };
};

interface ISetRegisterFormValue {
  readonly type: typeof REGISTER_FORM_SET_VALUE;
  value: string;
  field: string;
}

export const setRegisterFormValue = (field: string, value: string) => ({
  type: REGISTER_FORM_SET_VALUE,
  field,
  value,
});

interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_FORM_SUCCESS;
  readonly user: TUsers;
}
interface IRegisterUserFailed {
  readonly type: typeof REGISTER_FORM_FAILED;
}
interface IRegisterUserRequest {
  readonly type: typeof REGISTER_FORM_REQUEST;
}

export const registerUser: AppThunk = (
  email: string,
  password: string,
  name: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_FORM_REQUEST,
    });
    registerUserRequest(email, password, name)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: REGISTER_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FORM_FAILED,
        });
      });
  };
};

interface IGetUserSuccess {
  readonly user: TUsers;
  readonly type: typeof GET_USER_SUCCESS;
}
interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

interface IUpdateUserSuccess {
  readonly user: TUsers;
  readonly type: typeof PATCH_USER_SUCCESS;
}
interface IUpdateUserFailed {
  readonly type: typeof PATCH_USER_FAILED;
}
interface IUpdateUserRequest {
  readonly type: typeof PATCH_USER_REQUEST;
}

export const updateUser: AppThunk = (
  email: string,
  name: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    updateUserRequest(email, name, password)
      .then((res) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
      });
  };
};

interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}
interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export const updateToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    updateTokenRequest()
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", authToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
};
