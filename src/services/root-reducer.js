import { constructorReducer } from "./reducers/burger-constructor";
import { ingredientsReducer } from "./reducers/burger-ingredients";
import { ingredientReducer } from "./reducers/ingredient-details";
import { orderReducer } from "./reducers/order-details";
import { combineReducers } from "redux";


export const rootReducer = combineReducers({
	order: orderReducer,
	burgerIngredients: ingredientsReducer,
	ingredientDetails: ingredientReducer,
	burgerConstructor: constructorReducer
});