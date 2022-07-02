import React from "react";
import ingridientsStyles from "./Ingridients.module.css";
import { data } from "../../utils/data";
import IngridientItem from "../IngridientItem/IngridientItem";
import PropTypes from "prop-types";

const Ingridients = (props) => {
  const ingridientCategory = data.filter(
    (element) => element.type === props.type
  );

  return <li className={ingridientsStyles.category} id={props.type}>
    <h2
        className={`${ingridientsStyles.name} text text_type_main-medium pb-6 pt-2`}
      >
        {props.text}
      </h2>
      <ul className={ingridientsStyles.list}>
        {ingridientCategory.map((element) => (
          <IngridientItem key={element._id} ingredient={element} />
        ))}
      </ul>
  </li>;
};

Ingridients.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Ingridients;
