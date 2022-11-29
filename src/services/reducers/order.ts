import {
  CLOSE_ORDER_MODAL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAILED,
  TOrderDetailsActions 
} from "../actions/order";

type TOrderInitialState = {
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
  number: number | null;
};

const orderInitialState: TOrderInitialState = {
  orderDetailsFailed: false,
  number: null,
  orderDetailsRequest: false,
};

export const orderReducer = (
  state = orderInitialState,
  action: TOrderDetailsActions
): TOrderInitialState => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsFailed: false,
        orderDetailsRequest: true,
      };
    }
    case ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderDetailsFailed: true,
        orderDetailsRequest: false,
      };
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        number: action.number,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        number: null,
      };
    }
    default: {
      return state;
    }
  }
};
