import { TIngredients } from "../types";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT_CONSTRUCTOR: "ADD_INGREDIENT_CONSTRUCTOR" =
  "ADD_INGREDIENT_CONSTRUCTOR";
export const RESET_INGREDIENT: "RESET_INGREDIENT" = "RESET_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";

export type TConstructorActions =
  | IAddBuns
  | IAddItems
  | IDeleteItem
  | IMoveItems
  | IResetItems;


export interface IAddItems {
  readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
  data: TIngredients;
}

export interface IDeleteItem {
  readonly type: typeof DELETE_INGREDIENT;
  data: TIngredients;
  id: string;
}

export interface IAddBuns {
  readonly type: typeof ADD_BUN;
  data: TIngredients;
  itemsId: string[];
  bun: TIngredients;
}

export interface IMoveItems {
  data: {
    dragIndex: number;
    hoverIndex: number;
  };
  readonly type: typeof MOVE_INGREDIENT;
}

export interface IResetItems {
  readonly type: typeof RESET_INGREDIENT;
  data: TIngredients[];
}
