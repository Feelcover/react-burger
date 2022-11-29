import { getIngredientsData } from "../../utils/Api";
import { AppDispatch, AppThunk, TIngredients } from "../types";

export const BURGER_INGREDIENTS_REQUEST = "BURGER_INGREDIENTS_REQUEST";
export const BURGER_INGREDIENTS_SUCCESS = "BURGER_INGREDIENTS_SUCCESS";
export const BURGER_INGREDIENTS_FAILED = "BURGER_INGREDIENTS_FAILED";

export type TIngredientsActions =
  | IIngredientsSuccess
  | IIngredientsFailed
  | IIngredientsRequest;

export interface IIngredientsSuccess {
  readonly type: typeof BURGER_INGREDIENTS_SUCCESS;
  ingredients: Array<TIngredients>;
}
export interface IIngredientsFailed {
  readonly type: typeof BURGER_INGREDIENTS_FAILED;
}
export interface IIngredientsRequest {
  readonly type: typeof BURGER_INGREDIENTS_REQUEST;
}

export const getBurgerIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: BURGER_INGREDIENTS_REQUEST,
    });
    getIngredientsData()
      .then((res) => {
        dispatch({
          type: BURGER_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: BURGER_INGREDIENTS_FAILED,
        });
      });
  };
};
