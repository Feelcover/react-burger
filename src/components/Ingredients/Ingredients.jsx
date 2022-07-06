import React from "react";
import ingredientsStyles from "./Ingredients.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";
import PropTypes from "prop-types";

const Ingredients = ({ data, type, openModal }) => {

  const categories = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const ingredientCategory = data.filter((element) => element.type === type);

  return (
    <li className={ingredientsStyles.category} id={data.type}>
      <h2
        className={`${ingredientsStyles.name} text text_type_main-medium pb-6 pt-2`}
      >
        {categories[type]}
      </h2>
      <ul className={ingredientsStyles.list}>
        {ingredientCategory.map((element) => (
          <li
            className={`${ingredientsStyles.item}`}
            key={element._id}
            onClick={() => openModal(element)}
          >

            <IngredientItem key={element._id} ingredient={element} />

          </li>
        ))}
      </ul>
    </li>
  );
};

Ingredients.propTypes = {
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredients;
