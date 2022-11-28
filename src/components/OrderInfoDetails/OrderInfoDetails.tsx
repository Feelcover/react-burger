import { useMemo, FC } from "react";
import { useSelector } from "../../services/types";
import OrderAttachedImage from "../OrderAttachedImage/OrderAttachedImage";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import OrderInfoDetailsStyles from "./OrderInfoDetails.module.css";
import { TOrderInfoDetails } from "../../services/types";

export const OrderInfoDetails: FC<TOrderInfoDetails> = ({ details }) => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  

  const count = (elem:object) => {
    
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
              key={item?._id}
            >
              {item && (
                <>
                  <div className={OrderInfoDetailsStyles.info}>
                    <OrderAttachedImage
                      image={item.image}
                      alt={item.name}
                      key={item.name}
                    />
                    <p
                      className={`${OrderInfoDetailsStyles.text} text text_type_main-default pl-4`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className={OrderInfoDetailsStyles.price}>
                    <p className="text text_type_digits-default pr-2">

                      {item.type === "bun"
                        ? `${count(item) * 2} x ${item.price}`
                        : `${count(item)} x ${item.price}`}
                    </p>
                    <CurrencyIcon type="primary"/>
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
