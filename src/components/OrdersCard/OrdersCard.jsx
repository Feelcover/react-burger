import { useMemo } from "react";
import { useSelector } from "react-redux";
import { OrderAttachedImage } from "../OrderAttachedImage/OrderAttachedImage";
import { formatDate } from "../../utils/cookie";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import OrdersCardStyles from "./OrdersCard.module.css";

export const OrdersCard = ({ order, status }) => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const { createdAt, number, name } = order;

  const orderIngredientsData = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order?.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData?.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, [orderIngredientsData]);
  const MaxLength = order.ingredients.length;
  const hideItems = MaxLength - 6;

  return (
    <div className={OrdersCardStyles.container}>
      <div className={OrdersCardStyles.order}>
        <p className="text_type_digits-default text">#{number}</p>
        <p className="text_type_main-default text_color_inactive text">
          {formatDate(createdAt)}
        </p>
      </div>
      <div className={OrdersCardStyles.info}>
        <h2 className={`${OrdersCardStyles.text} text text_type_main-medium`}>
          {name}
        </h2>
        {!!status && (
          <p
            className={`${OrdersCardStyles.status} text text_type_main-default`}
          >
            {status === "done"
              ? "Выполнен"
              : status === "pending"
              ? "Готовится"
              : status === "created"
              ? "Создан"
              : "Выполнен"}
          </p>
        )}
      </div>
      <div className={OrdersCardStyles.price}>
        <ul className={OrdersCardStyles.list}>
          {orderIngredientsData &&
            MaxLength <= 5 &&
            orderIngredientsData.map((item, index) => {
              return (
                <li className={OrdersCardStyles.items} key={index}>
                  {item && (
                    <OrderAttachedImage image={item.image} alt={item.name} />
                  )}
                </li>
              );
            })}
          {orderIngredientsData &&
            MaxLength >= 6 &&
            orderIngredientsData.slice(0, 5).map((item, index) => {
              return (
                <li className={OrdersCardStyles.items} key={index}>
                  {item && (
                    <OrderAttachedImage image={item.image} alt={item.name} />
                  )}
                </li>
              );
            })}
          {orderIngredientsData &&
            MaxLength > 6 &&
            orderIngredientsData.slice(5, 6).map((item, index) => {
              return (
                <li className={OrdersCardStyles.items} key={index}>
                  {item && (
                    <>
                      <p
                        className={`${OrdersCardStyles.hideText} text text_type_main-default`}
                      >{`+${hideItems}`}</p>
                      <div className={OrdersCardStyles.hideImage}>
                        <OrderAttachedImage
                          image={item.image}
                          alt={item.name}
                        />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
        <div className={OrdersCardStyles.price}>
          <p className="pr-2 text_type_digits-default text">
            {orderTotalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrdersCard.propTypes = {
  order: propTypes.object.isRequired,
  status: propTypes.bool,
};
