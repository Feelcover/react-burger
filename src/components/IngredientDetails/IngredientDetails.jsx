import ingredientDetailsStyles from "./IngredientDetails.module.css";
import ingredientType from "../../utils/types";
import IngredientsDetailsItem from "../IngredientsDetailsItem/IngredientsDetailsItem";

const IngredientDetails = ({ingredient}) => {
  return (
    <div className={`${ingredientDetailsStyles.container} pr-25 pb-15 pl-25`}>
      <img
        className={`${ingredientDetailsStyles.pic}`}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h3
        className={`${ingredientDetailsStyles.title} text text_type_main-medium pt-3`}
      >
        {ingredient.name}
      </h3>
      <ul className={`${ingredientDetailsStyles.list} pt-8`}>
        <IngredientsDetailsItem
          value={ingredient.calories}
          text="Калорийность, ккал"
        />

        <IngredientsDetailsItem
          value={ingredient.proteins}
          text="Белки, г" />

        <IngredientsDetailsItem
          value={ingredient.fat}
          text="Жиры, г" />

        <IngredientsDetailsItem
          value={ingredient.carbohydrates}
          text="Углеводы, г"
        />
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientDetails;
