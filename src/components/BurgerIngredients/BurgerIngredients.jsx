import React, { useState } from 'react';
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "../Ingredients/Ingredients";
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
  const ingredients = useSelector(store => store.burgerIngredients.ingredients)

  const [current, setCurrent] = useState("bun");

  const bunRef = React.useRef();
  const sauceRef = React.useRef();
  const mainRef = React.useRef();
  const scrollTabClick = (e, tab) => {
    setCurrent(e);
    tab.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`${burgerIngredientsStyles.section} mt-10 pl-5`}>
      <h1
        className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${burgerIngredientsStyles.category} mb-5`}>
        <Tab
          active={current === "bun"}
          onClick={(e) => scrollTabClick(e, bunRef)}
          value="bun"
        >
          Булки
        </Tab>

        <Tab
          active={current === "sauce"}
          onClick={(e) => scrollTabClick(e, sauceRef)}
          value="sauce"
        >
          Соусы
        </Tab>

        <Tab
          active={current === "main"}
          onClick={(e) => scrollTabClick(e, mainRef)}
          value="main"
        >
          Начинки
        </Tab>
      </div>

      <ul className={`${burgerIngredientsStyles.ingredients} pt-5`}>
        <Ingredients
          ingredients={ingredients}
          type="bun"
          tabRef={bunRef}
        />
        <Ingredients
          ingredients={ingredients}
          type="sauce"
          tabRef={sauceRef}
        />
        <Ingredients
          ingredients={ingredients}
          type="main"
          tabRef={mainRef}
        />
      </ul>
    </section>
  );
};

export default BurgerIngredients;
