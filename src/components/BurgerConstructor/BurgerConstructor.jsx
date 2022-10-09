import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { getCookie } from "../../utils/cookie";
import { useHistory } from "react-router-dom";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import BurgerConstructorItems from "../BurgerConstructorItems/BurgerConstructorItems";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderDetails } from "../../services/actions/order";
import {
  ADD_BUN,
  ADD_INGREDIENT_CONSTRUCTOR
} from "../../services/actions/constructor";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const cookie = getCookie("token");
  const history = useHistory();


  const { bun, items, itemsId } = useSelector(
    (state) => state.burgerConstructor
  );
  const { orderDetailsRequest } = useSelector((state) => state.order);

  const filling = useMemo(
    () => items.filter((item) => item.type !== "bun"),
    [items]
  );

  const orderDetailsModal = (itemsId) => {
    cookie && dispatch(getOrderDetails(itemsId));
    !cookie && history.push("/login");
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = filling.reduce(
      (sum, item) => sum + item.price,
      bun.length === 0 ? 0 : bun.price * 2
    );
    setTotal(totalPrice);
  }, [bun, filling]);

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      if (item.ingredient.type === "bun") {
        dispatch({
          type: ADD_BUN,
          data: item.ingredient,
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT_CONSTRUCTOR,
          data: { ...item.ingredient, id: Date.now() },
        });
      }
    },
  });

  return (
    <section className={`${burgerConstructorStyles.section} pt-25 ml-10`}>
      <div className={`${burgerConstructorStyles.container}`} ref={dropTarget}>
        {bun.length === 0 ? (
          <p
            className={`${burgerConstructorStyles.instructionbun} text text_type_main-large pr-2 text_color_inactive`}
          >
            Перетащите булочку сюда
          </p>
        ) : (
          <ConstructorElement
            key={bun._id}
            type="top"
            isLocked={true}
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        {items.length === 0 ? (
          <p
            className={`${burgerConstructorStyles.instructionmain} ${burgerConstructorStyles.listmain} ${burgerConstructorStyles.text} pr-2 text text_type_main-large text_color_inactive`}
          >
            Перетащите начинку сюда
          </p>
        ) : (
          <ul className={`${burgerConstructorStyles.list} pr-4`}>
            {items.map((element, index) => {
              if (element.type === "sauce" || element.type === "main") {
                return (
                  <BurgerConstructorItems
                    key={element.id}
                    items={element}
                    index={index}
                  />
                );
              }
              return null;
            })}
          </ul>
        )}
        {bun.length === 0 ? (
          <p
            className={`${burgerConstructorStyles.instructionbun} text text_type_main-large pr-2 text_color_inactive`}
          >
            Перетащите булочку сюда{" "}
          </p>
        ) : (
          <ConstructorElement
            key={`bottom: ${bun._id}`}
            type="bottom"
            isLocked={true}
            text={bun.name + "(низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <div className={`${burgerConstructorStyles.total} pt-10 pr-4 pb-10`}>
        <div className={`${burgerConstructorStyles.summ} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        {items.length === 0 || !!orderDetailsRequest ? (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              orderDetailsModal(itemsId);
            }}
            disabled
          >
            {orderDetailsRequest ? (
                <div className={burgerConstructorStyles.loader} />

            ) : (
              "Оформить заказ"
            )}
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              orderDetailsModal(itemsId);
            }}
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
