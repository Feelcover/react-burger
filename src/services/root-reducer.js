import { constructorReducer } from "./reducers/constructor";
import { ingredientsReducer } from "./reducers/ingredients";
import { detailsReducer } from "./reducers/details";
import { orderReducer } from "./reducers/order";
import { combineReducers } from "redux";


export const rootReducer = combineReducers({
	order: orderReducer,
	burgerIngredients: ingredientsReducer,
	ingredientDetails: detailsReducer,
	burgerConstructor: constructorReducer
});