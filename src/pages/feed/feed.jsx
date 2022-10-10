import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  wsConnectionClosed,
  wsConnectionOpen,
} from "../../services/actions/wsActions";
import { OrdersStatus } from "../../components/OrderStatus/OrderStatus";
import { Orders } from "../../components/Orders/Orders";
import feedStyles from "./feed.module.css";


export const Feed = () => {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(wsConnectionOpen());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);


  return (
    <div className={feedStyles.container}>
      <h2 className={`${feedStyles.text} pb-5 pt-10 text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={feedStyles.orders}>
        <Orders />
        <OrdersStatus />
      </div>
    </div>
  );
};
