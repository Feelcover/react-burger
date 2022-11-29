import { FC } from 'react';
import { useSelector } from "../../../services/types";
import { Link, useLocation } from "react-router-dom";
import { OrdersCard } from "../../../components/OrdersCard/OrdersCard";
import OrdersHistoryStyles from "./OrdersHistory.module.css";
import { TLocation } from '../../../services/types';

export const OrdersHistory: FC = () => {
  const orders = useSelector((store) => store.wsAuthFeed.orders);
  const location = useLocation<TLocation>();
  orders.reverse()

  return (
    <div className={OrdersHistoryStyles.container}>
      {orders &&
        orders?.map((order) => {
          return (
            <Link
              to={{
                pathname: `/profile/orders/${order._id}`,
                state: { background: location },
              }}
              className={`${OrdersHistoryStyles.link}`}
              key={order._id}
            >
              <OrdersCard order={order} status={order.status} />
            </Link>
          );
        })}
    </div>
  );
};
