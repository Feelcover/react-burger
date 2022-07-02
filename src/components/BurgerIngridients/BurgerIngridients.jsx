import React from "react";
import burgerIngridientsStyles from "./BurgerIngridients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from '../Ingridients/Ingridients'

function BurgerIngridients() {
  const [current, setCurrent] = React.useState("bun");
  
  const categories = [
    { type: 'bun', text: 'Булки' },
    { type: 'sauce', text: 'Соусы' },
    { type: 'main', text: 'Начинки' },
  ]

  return (
    <section className={`${burgerIngridientsStyles.section} mt-10 pl-5`}>
      <h1
        className={`${burgerIngridientsStyles.title} text text_type_main-large mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${burgerIngridientsStyles.category} mb-5`}>
        <a className={burgerIngridientsStyles.link} href="#bun">
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

      <ul className={`${burgerIngridientsStyles.ingridients} pt-5`}>
      {categories.map((element) => (
					<Ingredients key={element.type} type={element.type} text={element.text} />
				))}
      </ul>
    </section>
  );
}

export default BurgerIngridients;
