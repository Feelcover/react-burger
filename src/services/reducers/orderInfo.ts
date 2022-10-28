import {
  CLOSE_ORDER_INFO_MODAL,
  TOrderInfoModalActions,
} from "../actions/orderInfo";

type TOrderInfoInitialState = {
  openModal: string | null;
};

const orderInfoInitialState: TOrderInfoInitialState = {
  openModal: null,
};

export const orderInfoReducer = (
  state = orderInfoInitialState,
  action: TOrderInfoModalActions
): TOrderInfoInitialState => {
  switch (action.type) {
    case CLOSE_ORDER_INFO_MODAL: {
      return {
        ...state,
        openModal: null,
      };
    }
    default: {
      return state;
    }
  }
};
