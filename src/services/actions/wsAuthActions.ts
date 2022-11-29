import { TFeedResponse } from "../types";

export const WS_AUTH_CONNECTION_START: "WS_AUTH_CONNECTION_START" =
  "WS_AUTH_CONNECTION_START";
export const WS_AUTH_CONNECTION_SUCCESS: "WS_AUTH_CONNECTION_SUCCESS" =
  "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR: "WS_AUTH_CONNECTION_ERROR" =
  "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_CLOSED: "WS_AUTH_CONNECTION_CLOSED" =
  "WS_AUTH_CONNECTION_CLOSED";
export const WS_AUTH_GET_ORDERS: "WS_AUTH_GET_ORDERS" = "WS_AUTH_GET_ORDERS";
export const WS_AUTH_SEND_ORDERS: "WS_AUTH_SEND_ORDERS" = "WS_AUTH_SEND_ORDERS";
export const WS_AUTH_USER_NAME_UPDATE: "WS_AUTH_USER_NAME_UPDATE" =
  "WS_AUTH_USER_NAME_UPDATE";


  export type TWsAuthActions =
	| IWsAuthConnectionOpen
	| IWsAuthConnectionSuccess
	| IWsAuthConnectionError
	| IWsAuthConnectionClosed
	| IWsAuthGetMessage
	| IWsAuthSendMessage;

interface IWsAuthConnectionSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}
export const wsAuthConnectionSuccess = ():IWsAuthConnectionSuccess => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS,
  };
};

interface IWsAuthConnectionOpen {
	readonly type: typeof WS_AUTH_CONNECTION_START;
}
export const wsAuthConnectionOpen = ():IWsAuthConnectionOpen => {
  return {
    type: WS_AUTH_CONNECTION_START,
  };
};


interface IWsAuthConnectionError {
	readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}
export const wsAuthConnectionError = ():IWsAuthConnectionError => {
  return {
    type: WS_AUTH_CONNECTION_ERROR,
  };
};


interface IWsAuthConnectionClosed {
	readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}
export const wsAuthConnectionClosed = ():IWsAuthConnectionClosed => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED,
  };
};


interface IWsAuthGetMessage {
	readonly type: typeof WS_AUTH_GET_ORDERS;
	payload: TFeedResponse
}
export const wsAuthGetMessage = (order:TFeedResponse):IWsAuthGetMessage => {
  return {
    type: WS_AUTH_GET_ORDERS,
    payload: order,
  };
};


interface IWsAuthSendMessage {
	readonly type: typeof WS_AUTH_SEND_ORDERS;
	payload: TFeedResponse
}
export const wsAuthSendMessage = (order:TFeedResponse):IWsAuthSendMessage => {
  return {
    type: WS_AUTH_SEND_ORDERS,
    payload: order,
  };
};
