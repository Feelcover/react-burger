import React from "react";
import burgerConstructorStyles from "./BurgerConstructorItems.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructorItems = (props) => {
  return (
    <li className={`${burgerConstructorStyles.item} pt-4 pr-3`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.items.name}
        price={props.items.price}
        thumbnail={props.items.image}
      />
    </li>
  );
}


BurgerConstructorItems.protoType = {
	items: PropTypes.arrayOf(ingredientType.isRequired)
}


export default BurgerConstructorItems;
