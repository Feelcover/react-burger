import React from "react";
import ingredientItemStyles from "./IngredientItem.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";

const IngredientItem = (props) => {
  return (
    <div className={`${ingredientItemStyles.item} `}>
      <img
        className={ingredientItemStyles.image}
        src={props.ingredient.image}
        alt={props.ingredient.name}
      />
      <div className={`${ingredientItemStyles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default">
          {props.ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientItemStyles.name} text text_type_main-default pb-10 pt-1`}>
        {props.ingredient.name}
      </p>
      <Counter count={1} size="small" />
    </div>
  );
};


IngridientItem.protoType = {
  ingredient: ingredientType.isRequired,
};

export default IngredientItem;
