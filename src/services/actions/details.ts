export const CLOSE_INGREDIENT_MODAL: "CLOSE_INGREDIENT_MODAL" =
  "CLOSE_INGREDIENT_MODAL";

export type TIngredientsModalActions = IIngredientsCloseModal;

export interface IIngredientsCloseModal {
  readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export const closeIngredientModal = (): IIngredientsCloseModal => {
  return {
    type: CLOSE_INGREDIENT_MODAL,
  };
};
