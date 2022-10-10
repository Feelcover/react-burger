import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { OrdersCard } from "../../../components/OrdersCard/OrdersCard";
import OrdersHistoryStyles from "./OrdersHistory.module.css";

export const OrdersHistory = () => {
  const orders = useSelector((store) => store.wsAuthFeed.orders);
  const location = useLocation();
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
              <OrdersCard order={order} status={true} />
            </Link>
          );
        })}
    </div>
  );
};
