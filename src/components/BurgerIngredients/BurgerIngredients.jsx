import React from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "../Ingredients/Ingredients";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";

const BurgerIngredients = ({ data, openModal }) => {
  const [current, setCurrent] = React.useState("bun");

  return (
    <section className={`${burgerIngredientsStyles.section} mt-10 pl-5`}>
      <h1
        className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${burgerIngredientsStyles.category} mb-5`}>
        <Tab active={current === "bun"} onClick={setCurrent} value="bun">
          Булки
        </Tab>

        <Tab active={current === "sauce"} onClick={setCurrent} value="sauce">
          Соусы
        </Tab>

        <Tab active={current === "main"} onClick={setCurrent} value="main">
          Начинки
        </Tab>
      </div>

      <ul className={`${burgerIngredientsStyles.ingredients} pt-5`}>
        <Ingredients data={data} openModal={openModal} type="bun" />
        <Ingredients data={data} openModal={openModal} type="sauce" />
        <Ingredients data={data} openModal={openModal} type="main" />
      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
