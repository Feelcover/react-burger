import React from "react";
import ingredientDetailsStyles from "./IngredientDetails.module.css";
import ingredientType from "../../utils/types";
import IngredientsDetailsItem from "../IngredientsDetailsItem/IngredientsDetailsItem";

const IngredientDetails = (props) => {
  return (
    <div className={`${ingredientDetailsStyles.container} pr-25 pb-15 pl-25`}>
      <img
        className={`${ingredientDetailsStyles.pic}`}
        src={props.item.image_large}
        alt={props.item.name}
      />
      <h3
        className={`${ingredientDetailsStyles.title} text text_type_main-medium pt-3`}
      >
        {props.item.name}
      </h3>
      <ul className={`${ingredientDetailsStyles.list} pt-8`}>
        <IngredientsDetailsItem
          value={props.item.calories}
          text="Калорийность, ккал"
        />

        <IngredientsDetailsItem
          value={props.item.proteins}
          text="Белки, г" />

        <IngredientsDetailsItem
          value={props.item.fat}
          text="Жиры, г" />

        <IngredientsDetailsItem
          value={props.item.carbohydrates}
          text="Углеводы, г"
        />
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  item: ingredientType.isRequired,
};

export default IngredientDetails;
