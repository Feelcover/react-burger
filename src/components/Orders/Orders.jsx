import { OrdersCard } from "../OrdersCard/OrdersCard";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import OrdersStyles from "./Orders.module.css";

export const Orders = () => {
  const orders = useSelector((store) => store.wsFeed.orders);

  const location = useLocation();

  return (
    <div className={OrdersStyles.container}>
      {orders &&
        orders.map((order, index) => {
          return (
            <Link
              to={{
                pathname: `/feed/${order._id}`,
                state: { background: location },
              }}
              className={`${OrdersStyles.link}`}
              key={order._id}
            >
              <OrdersCard order={order} status={false} key={index} />
            </Link>
          );
        })}
    </div>
  );
};
