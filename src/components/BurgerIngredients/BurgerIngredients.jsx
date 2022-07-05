import React from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from '../Ingredients/Ingridients'

const BurgerIngredients = ({data, openModal}) => {
  const [current, setCurrent] = React.useState("bun");
  
  
  return (
    <section className={`${burgerIngredientsStyles.section} mt-10 pl-5`}>
      <h1
        className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${burgerIngredientsStyles.category} mb-5`}>
        <a className={burgerIngredientsStyles.link} href="#bun">
          <Tab
            active={current === "bun"}
            onClick={setCurrent}
            value="bun"
          >
            Булки
          </Tab>
        </a>
        <a href="#sauce">
          <Tab
            active={current === "sauce"}
            onClick={setCurrent}
            value="sauce"
          >
            Соусы
          </Tab>
        </a>
        <a href="#main">
          <Tab
            active={current === "main"}
            onClick={setCurrent}
            value="main"
          >
            Начинки
          </Tab>
        </a>
      </div>

      <ul className={`${burgerIngredientsStyles.ingredients} pt-5`}>
					<Ingredients data={data} openModal={openModal} type='bun' />
          <Ingredients data={data} openModal={openModal} type='sauce' />
          <Ingredients data={data} openModal={openModal} type='main' />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
	data: PropTypes.array.isRequired,
	openModal: PropTypes.func.isRequired
}

export default BurgerIngredients;
