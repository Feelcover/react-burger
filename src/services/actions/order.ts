import { getOrderDetailsData } from "../../utils/Api";
import { AppDispatch, AppThunk } from "../types";

export const ORDER_DETAILS_REQUEST:'ORDER_DETAILS_REQUEST' = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS:'ORDER_DETAILS_SUCCESS' = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAILED:'ORDER_DETAILS_FAILED' = 'ORDER_DETAILS_FAILED';
export const CLOSE_ORDER_MODAL:'CLOSE_ORDER_MODAL'= 'CLOSE_ORDER_MODAL';


export type TOrderDetailsActions =
	| IOrderDetailsFailed
	| IOrderDetailsSuccess
	| IOrderDetailsRequest
	| IOrderDetailsModal;

export interface IOrderDetailsFailed {
	readonly type: typeof ORDER_DETAILS_FAILED;
}
export interface IOrderDetailsSuccess {
	readonly type: typeof ORDER_DETAILS_SUCCESS;
	readonly number: number;
}
export interface IOrderDetailsRequest {
	readonly type: typeof ORDER_DETAILS_REQUEST;
}

export const getOrderDetails: AppThunk = (order: Array<string>) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    getOrderDetailsData(order)
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          number: res.order.number,
        });
      })
      .catch(() => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
}




export interface IOrderDetailsModal {
	readonly type: typeof CLOSE_ORDER_MODAL;
}

export const closeOrderModal = () => {
  return {
    type: CLOSE_ORDER_MODAL,
  };
}
