import React from "react";
import acceptedImg from "../../images/AcceptedIcon.svg";
import orderDetailsStyles from "./OrderDetails.module.css";

const OrderDetails = () => {
  return (
    <div className={`${orderDetailsStyles.container} pl-25 pr-25`}>
      <h2
        className={`${orderDetailsStyles.title} text text_type_digits-large pt-15 pb-8`}
      >
        034536
      </h2>
      <p
        className={`${orderDetailsStyles.text} text text_type_main-medium pb-15`}
      >
        идентификатор заказа
      </p>
      <img
        className={`${orderDetailsStyles.icon} pb-15`}
        src={acceptedImg}
        alt={acceptedImg}
      />
      <p
        className={`${orderDetailsStyles.text} text text_type_main-default pb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.text} text text_type_main-default text_color_inactive pb-30`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;