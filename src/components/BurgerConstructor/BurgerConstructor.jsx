import React from "react";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import BurgerConstructorItems from "../BurgerConstructorItems/BurgerConstructorItems";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";
import PropTypes from 'prop-types';

const BurgerConstructor = ({data, openModal}) => {
  return (
    <section className={`${burgerConstructorStyles.section} pt-25 ml-10`}>
      <div className={`${burgerConstructorStyles.container}`}>
        <div className={`${burgerConstructorStyles.upper_locked}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>

        <ul className={`${burgerConstructorStyles.list} pr-4`}>
          {data.map((element) => {
            if (element.type === "sauce" || element.type === "main") {
              return (
                <BurgerConstructorItems key={element._id} items={element} />
              );
            }
          })}
        </ul>

        <div className={`${burgerConstructorStyles.lower_locked} pt-3`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>
      </div>
      <div className={`${burgerConstructorStyles.total} pt-10 pr-4 pb-10`}>
        <div className={`${burgerConstructorStyles.summ} pr-10`}>
          <p className="text text_type_digits-medium pr-2">15000</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
	openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;
