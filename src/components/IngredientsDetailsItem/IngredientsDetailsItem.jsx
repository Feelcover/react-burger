import React from "react";
import PropTypes from 'prop-types';

import ingredientsDetailsItemStyles from "./IngredientsDetailsItem.module.css"

const IngredientsDetailsItem = (props) => {
  return (
    <li className={`${ingredientsDetailsItemStyles.item}`}>
      <p
        className={`${ingredientsDetailsItemStyles.text} text text_type_main-default text_color_inactive pb-2`}
      >
        {props.text}
      </p>
      <p
        className={`${ingredientsDetailsItemStyles.text} text text_type_main-default text_color_inactive`}
      >
        {props.value}
      </p>
    </li>
  );
};

IngredientsDetailsItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default IngredientsDetailsItem;
