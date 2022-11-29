import { FC } from 'react';
import { OrdersCard } from "../OrdersCard/OrdersCard";
import { useSelector } from "../../services/types";
import { Link, useLocation } from "react-router-dom";
import OrdersStyles from "./Orders.module.css";
import { TLocation } from '../../services/types';

export const Orders: FC = () => {
  const orders = useSelector((store) => store.wsFeed.orders);

  const location = useLocation<TLocation>();

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
              <OrdersCard order={order} status={order.status} key={index} />
            </Link>
          );
        })}
    </div>
  );
};
