import { useSelector } from "react-redux";
import uniqid from "uniqid";
import OrderStatusStyles from "./OrdersStatus.module.css";

export const OrdersStatus = () => {
  const { total, totalToday, orders } = useSelector((store) => store.wsFeed);
  const ItemId = uniqid();
  const doneStatusOrder = orders
    .filter((order) => order.status === "done")
    .filter((order, index) => index < 15);
  const pendingStatusOrder = orders
    .filter((order) => order.status !== "done")
    .filter((order, index) => index >= 10);

  return (
    <div className={OrderStatusStyles.container}>
      <div className={`${OrderStatusStyles.board} pb-15`}>
        <div className={OrderStatusStyles.column}>
          <p className=" pb-6 text_type_main-medium text">Готовы:</p>
          <ul className={OrderStatusStyles.list}>
            {doneStatusOrder.map((order, index) => {
              return (
                <li
                  className={`${OrderStatusStyles.item} ${OrderStatusStyles.done} text text_type_digits-default`}
                  key={ItemId + index}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={OrderStatusStyles.column}>
          <p className=" pb-6 text_type_main-medium text">В работе:</p>
          <ul className={OrderStatusStyles.list}>
            {pendingStatusOrder.map((order, index) => {
              return (
                <li
                  className={`${OrderStatusStyles.item} text text_type_digits-default`}
                  key={ItemId + index}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${OrderStatusStyles.completed} pb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <h2 className={`${OrderStatusStyles.total} text text_type_digits-large`}>
          {total}
        </h2>
      </div>
      <div className={OrderStatusStyles.completed}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <h2 className={`${OrderStatusStyles.total} text text_type_digits-large`}>
          {totalToday}
        </h2>
      </div>
    </div>
  );
};
