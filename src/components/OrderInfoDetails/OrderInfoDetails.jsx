import { useMemo } from "react";
import { useSelector } from "react-redux";
import { OrderAttachedImage } from "../OrderAttachedImage/OrderAttachedImage";
import uniqid from "uniqid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import OrderInfoDetailsStyles from "./OrderInfoDetails.module.css";

export const OrderInfoDetails = ({ details }) => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const count = (elem) => {
    let count = details.filter((item) => {
      return item === elem;
    }).length;
    return count;
  };

  const orderIngredient = useMemo(() => {
    return details?.map((elem) => {
      return ingredients?.find((item) => {
        return elem._id === item._id;
      });
    });
  }, [details, ingredients]);

  return (
    <div className={OrderInfoDetailsStyles.container}>
      {orderIngredient &&
        [...new Set(orderIngredient)].map((item) => {
          return (
            <li
              className={`${OrderInfoDetailsStyles.item} pb-3`}
              key={uniqid()}
            >
              {item && (
                <>
                  <div className={OrderInfoDetailsStyles.info}>
                    <OrderAttachedImage
                      image={item.image}
                      alt={item.name}
                      key={uniqid()}
                    />
                    <p
                      className={`${OrderInfoDetailsStyles.text} text text_type_main-default pl-4`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className={OrderInfoDetailsStyles.price}>
                    <p className="text text_type_digits-default pr-2">
                      {" "}
                      {count(item)} x{" "}
                      {item.type === "bun" ? item.price * 2 : item.price}
                    </p>
                    <CurrencyIcon type="primary" key={uniqid()} />
                  </div>
                </>
              )}
            </li>
          );
        })}
    </div>
  );
};

OrderInfoDetails.propTypes = {
  details: propTypes.array.isRequired,
};
