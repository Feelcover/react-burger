import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { openIngredientModal } from "../../services/actions/details";
import ingredientItemStyles from "./IngredientItem.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";

const IngredientItem = ({ ingredient }) => {
  const { bun, items } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const { image, name, price } = ingredient;

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const counter = useMemo(
    () =>
      (count = 0) => {
        for (let { _id } of items)

        if (_id === ingredient._id) count++;

        if (bun && bun._id === ingredient._id) return 2;

        return count;
      },
    [bun, items, ingredient._id]
  );

  const handleOpenIngredientModal = (ingredient) => {
    dispatch(openIngredientModal(ingredient));
  };

  return (
    <div
      className={`${ingredientItemStyles.item} `}
      onClick={() => handleOpenIngredientModal(ingredient)}
      style={{ opacity }}
      ref={dragRef}
    >
      <img className={ingredientItemStyles.image} src={image} alt={name} />
      <div className={`${ingredientItemStyles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientItemStyles.name} text text_type_main-default pb-10 pt-1`}
      >
        {name}
      </p>
      {counter() > 0 && <Counter count={counter()} size="default" />}
    </div>
  );
};

IngredientItem.protoType = {
  ingredient: ingredientType.isRequired,
};

export default IngredientItem;
