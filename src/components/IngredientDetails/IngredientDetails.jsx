import React from "react";
import ingredientDetailstStyles from "./IngredientDetails.module.css";
import ingredientType from "../../utils/types";


const IngredientDetails = (props) => {
  return (
    <div className={`${ingredientDetailstStyles.container} pr-25 pb-15 pl-25`}>
      <img
        className={`${ingredientDetailstStyles.pic}`}
        src={props.item.image_large}
        alt={props.item.name}
      />
      <h3
        className={`${ingredientDetailstStyles.title} text text_type_main-medium pt-3`}
      >
        {props.item.name}
      </h3>
      <ul className={`${ingredientDetailstStyles.list} pt-8`}>
        <li className={`${ingredientDetailstStyles.item}`}>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive pb-2`}
          >
            Калории, ккал
          </p>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive`}
          >
            {props.item.calories}
          </p>
        </li>
        <li className={`${ingredientDetailstStyles.item}`}>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive pb-2`}
          >
            Белки, г
          </p>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive`}
          >
            {props.item.proteins}
          </p>
        </li>
        <li className={`${ingredientDetailstStyles.item}`}>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive pb-2`}
          >
            Жиры, г
          </p>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive`}
          >
            {props.item.fat}
          </p>
        </li>
        <li className={`${ingredientDetailstStyles.item}`}>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive pb-2`}
          >
            Углеводы, г
          </p>
          <p
            className={`${ingredientDetailstStyles.text} text text_type_main-default text_color_inactive`}
          >
            {props.item.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
    item: ingredientType.isRequired
  };

export default IngredientDetails;
