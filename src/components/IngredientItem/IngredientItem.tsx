import { useMemo, FC } from "react";
import { useSelector } from "../../services/types";
import { useDrag } from "react-dnd";
import ingredientItemStyles from "./IngredientItem.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { TIngredientsItems, TLocation } from "../../services/types";

const IngredientItem: FC<TIngredientsItems> = ({ ingredient }) => {
  const { bun, items } = useSelector((state) => state.burgerConstructor);
  const { image, name, price } = ingredient;

  const location = useLocation<TLocation>();
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
        for (let { _id } of items) if (_id === ingredient._id) count++;

        if (bun && bun._id === ingredient._id) return 2;

        return count;
      },
    [bun, items, ingredient._id]
  );

  return (
    <Link
      className={`${ingredientItemStyles.link}`}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
    >
      <div
        className={`${ingredientItemStyles.item} `}
        style={{ opacity }}
        ref={dragRef}
      >
        <img className={ingredientItemStyles.image} src={image} alt={name} />
        <div className={`${ingredientItemStyles.price} pt-1 pb-1`}>
          <p className="text text_type_digits-default pr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${ingredientItemStyles.name} text text_type_main-default pb-10 pt-1`}
        >
          {name}
        </p>
        {counter() > 0 && <Counter count={counter()} size="default" />}
      </div>
    </Link>
  );
};


export default IngredientItem;
