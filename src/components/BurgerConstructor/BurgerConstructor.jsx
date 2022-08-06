import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import BurgerConstructorItems from "../BurgerConstructorItems/BurgerConstructorItems";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderDetails } from "../../services/actions/order-details";
import {
  ADD_BUN,
  ADD_ITEM_CONSTRUCTOR,
} from "../../services/actions/burger-constructor";

const BurgerConstructor = () => {
  const { bun, items } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const filling = useMemo(
    () => items.filter((item) => item.type !== "bun"),
    [items]
  );

  useEffect(() => {
    const totalPrice = filling.reduce(
      (sum, item) => sum + item.price,
      bun.length === 0 ? 0 : bun.price * 2
    );
    setTotal(totalPrice);
  }, [bun, filling]);

  const itemsId = useMemo(() => items.map((item) => item._id), [items]);

  const orderDetailsModal = (productsId) => {
    dispatch(getOrderDetails(itemsId));
  };

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
          type: ADD_ITEM_CONSTRUCTOR,
          data: { ...item.ingredient, id: Date.now() },
        });
      }
    },
  });

  return (
    <section className={`${burgerConstructorStyles.section} pt-25 ml-10`}>
      <div className={`${burgerConstructorStyles.container}`} ref={dropTarget}>
        {bun.length === 0 ? (
          <p className="text text_type_main-large pr-2">Выберите булочку</p>
        ) : (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        {items.length === 0 ? (
          <p
            className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.text} pr-2 text text_type_main-large`}
          >
            &#8592; Выберите начинку
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
            })}
          </ul>
        )}
        {bun.length === 0
					? (<p className='text text_type_main-large pr-2'>Выберите булочку </p>)
          : (<ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + "(низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />)}
          
      </div>
      <div className={`${burgerConstructorStyles.total} pt-10 pr-4 pb-10`}>
        <div className={`${burgerConstructorStyles.summ} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        {items.length === 0
        ? (<Button
          type="primary"
          size="large"
          onClick={() => {orderDetailsModal(itemsId)}}
          disabled
        >
          Оформить заказ
        </Button>)
        : (<Button
          type="primary"
          size="large"
          onClick={() => { orderDetailsModal(itemsId) }}
        >
          Оформить заказ
        </Button>)}
      </div>
    </section>
  );
};


export default BurgerConstructor;
