import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "./store";
import { ReactNode } from "react";
import { rootReducer } from "./rootReducer";
import { TConstructorActions } from "./actions/constructor";
import { TAuthorizationActions } from "./actions/authorization";
import { TIngredientsModalActions } from "./actions/details";
import { TIngredientsActions } from "./actions/ingredients";
import { TOrderInfoModalActions } from "./actions/orderInfo";
import { TOrderDetailsActions } from "./actions/order";
import { TWsActions } from "./actions/wsActions";
import { TWsAuthActions } from "./actions/wsAuthActions";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

type TApplicationActions =
  | TConstructorActions
  | TOrderDetailsActions
  | TIngredientsModalActions
  | TAuthorizationActions
  | TWsActions
  | TWsAuthActions
  | TIngredientsActions
  | TOrderInfoModalActions;


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<any> | void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();


export type TFeedResponse = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<TFeed>;
};

export type TWsMiddlewareActions = {
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
  length:number;
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
  description: string;
  children: ReactNode;
  closeModal: () => void;
};

export type TModalOverlay = {
  closeModal: () => void;
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

export type TBurgerConstructorItems = {
	index: number;
	items: TIngredients;
}

export type TDragItems = {
	index: number;
	type: string;
	id?: string;
};

export type TRequest = {
  method: string;
  headers: THeaders;
  body?: string | null;
  mode?: any;
  cache?: any;
  credentials?: any;
  redirect?: any;
  referrerPolicy?: any;
};


export type THeaders = {
  "Content-Type": string;
  Authorization?: string;
};

export type TIngredientsItems = {
	ingredient: TIngredients;
}


export type TIngredientsCategories = {
	ingredients: TIngredients[];
	type: string;
  tabRef: (node?: Element | null | undefined) => void;
}

export type TCategories = {
	[key: string]: string;
}

export type TDetailsItemData = {
  text: string;
  value: number;
}

export type TOrderAttachedImage = {
  image?: string;
  alt: string;
}

export type TOrdersCards = {
	order: TFeed;
	status: string;
}

export type TOrderInfoDetails = {
	details: TIngredients[];
}