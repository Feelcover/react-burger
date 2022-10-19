import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "./store";
import { ReactNode } from "react";
import { rootReducer } from "./rootReducer";
import { TConstructorActions } from "./actions/constructor";
import { TAuthorizationActions } from "./actions/authorization"
import { TIngredientsModalActions } from "./actions/details"
import { TIngredientsActions } from "./actions/ingredients"
import { TOrderInfoModalActions } from "./actions/orderInfo"
import { TOrderDetailsActions } from "./actions/order"

type TApplicationActions =
  | TAuthorizationActions
  | TWsActions
  | TWsAuthActions
  | TIngredientsActions
  | TConstructorActions
  | TOrderDetailsActions
  | TIngredientsModalActions
  | TOrderInfoModalActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TOrderDetailsResponse = {
  success: boolean;
  name: string;
  order: TOrders;
};

export type TIngredientsResponse = {
  data: Array<TIngredients>;
  success: boolean;
};

export type TUserResponse = {
  user: TUsers;
  accessToken: string;
  refreshToken: string;
  message: string;
  success: boolean;
};

export type TUserLogoutResponse = {
  refreshToken: string;
  message: string;
  success: boolean;
};

export type TFeedResponse = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<TFeed>;
};

export type TWsSocketMiddlewareAction = {
  wsInit: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export type TIngredients = {
  type: "bun" | "main" | "sauce";
  __v: number;
  _id: string;
  id?: string;
  count?: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
};

export type TUsers = {
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TOrders = {
  ingredients: TIngredients[];
  createdAt: string;
  name: string;
  number: number;
  owner: TUsers;
  _id: string;
  price: number;
  status: string;
  updatedAt: string;
};

export type TFeed = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TModal = {
  title: string;
  children: ReactNode;
  onClickClose: () => void;
};

export type TModalOverlay = {
  onClickClose: () => void;
};

export type TLocation = {
  background: {
    pathname: string;
    search: string;
    hash: string;
    state: null;
    key: string;
  };
  from: string;
  state?: object;
};

