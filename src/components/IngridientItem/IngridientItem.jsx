import React from "react";
import ingridientItemStyles from "./IngridientItem.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const IngridientItem = (props) => {
  return (
    <li className={`${ingridientItemStyles.item} `}>
      <img
        className={ingridientItemStyles.image}
        src={props.ingredient.image}
        alt={props.ingredient.name}
      />
      <div className={`${ingridientItemStyles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default">
          {props.ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingridientItemStyles.name} text text_type_main-default pb-10 pt-1`}>
        {props.ingredient.name}
      </p>
      <Counter count={1} size="small" />
    </li>
  );
};

IngridientItem.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default IngridientItem;
