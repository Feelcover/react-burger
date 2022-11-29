import { TFeedResponse } from "../types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_SEND_ORDERS: "WS_SEND_ORDERS" = "WS_SEND_ORDERS";

export type TWsActions =
  | IWsConnectionSuccess
  | IWsConnectionStart
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage;

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export const wsConnectionOpen = (): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
  };
};

interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

interface IWsGetMessage {
  readonly type: typeof WS_GET_ORDERS;
  payload: TFeedResponse;
}
export const wsGetMessage = (order: TFeedResponse): IWsGetMessage => {
  return {
    type: WS_GET_ORDERS,
    payload: order,
  };
};

interface IWsSendMessage {
  readonly type: typeof WS_SEND_ORDERS;
  payload: TFeedResponse;
}
export const wsSendMessage = (order: TFeedResponse): IWsSendMessage => {
  return {
    type: WS_SEND_ORDERS,
    payload: order,
  };
};
