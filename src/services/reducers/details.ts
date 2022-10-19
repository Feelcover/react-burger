import { CLOSE_INGREDIENT_MODAL, TIngredientsModalActions } from "../actions/details";
import { TIngredients } from "../types";

export type TIngredientInitialState = {
  openModal: string | TIngredients | null;
};

const ingredientInitialState = {
  openModal: null,
};

export const detailsReducer = (
  state = ingredientInitialState,
  action: TIngredientsModalActions
): TIngredientInitialState => {
  switch (action.type) {
    case CLOSE_INGREDIENT_MODAL: {
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
