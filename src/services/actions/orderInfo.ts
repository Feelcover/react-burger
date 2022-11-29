export const CLOSE_ORDER_INFO_MODAL: "CLOSE_ORDER_INFO_MODAL" = "CLOSE_ORDER_INFO_MODAL";

export type TOrderInfoModalActions = IOrderInfoCloseModal;

export interface IOrderInfoCloseModal {
	readonly type: typeof CLOSE_ORDER_INFO_MODAL;
}

export const closeOrderInfoModal = (): IOrderInfoCloseModal => {
  return {
    type: CLOSE_ORDER_INFO_MODAL,
  };
};
