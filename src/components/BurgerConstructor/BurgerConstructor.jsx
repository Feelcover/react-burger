import React from "react";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import BurgerConstructorItems from "../BurgerConstructorItems/BurgerConstructorItems";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientsContext } from "../../services/IngredientsContext";

const BurgerConstructor = ({ getOrder, openModal }) => {
  const { data } = React.useContext(IngredientsContext);

  const [total, setTotal] = React.useState(0);

  const burgerId = React.useMemo(() => data.map((item) => item._id), [data]);

  const bunItem = React.useMemo(
    () => data.find((item) => item.type === "bun"),
    [data]
  );

  const filling = React.useMemo(
    () => data.filter((item) => item.type !== "bun"),
    [data]
  );

  React.useEffect(() => {
    const totalPrice = filling.reduce(
      (sum, item) => sum + item.price,
      bunItem ? bunItem.price * 2 : 0
    );
    setTotal(totalPrice);
  }, [bunItem, filling]);

  return (
    <section className={`${burgerConstructorStyles.section} pt-25 ml-10`}>
      <div className={`${burgerConstructorStyles.container}`}>
        <div className={`${burgerConstructorStyles.upper_locked}`}>
          {bunItem && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunItem.name + "(верх)"}
              price={bunItem.price}
              thumbnail={bunItem.image}
            />
          )}
        </div>

        <ul className={`${burgerConstructorStyles.list} pr-4`}>
          {data.map((element) => {
            if (element.type === "sauce" || element.type === "main") {
              return (
                <BurgerConstructorItems key={element._id} items={element} />
              );
            }
          })}
        </ul>

        <div className={`${burgerConstructorStyles.lower_locked} pt-3`}>
          {bunItem && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunItem.name + "(низ)"}
              price={bunItem.price}
              thumbnail={bunItem.image}
            />
          )}
        </div>
      </div>
      <div className={`${burgerConstructorStyles.total} pt-10 pr-4 pb-10`}>
        <div className={`${burgerConstructorStyles.summ} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            getOrder(burgerId);
            openModal();
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  getOrder: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;
