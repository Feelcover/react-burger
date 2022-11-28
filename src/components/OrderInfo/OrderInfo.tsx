import { useEffect, useMemo, FC } from "react";
import { useSelector, useDispatch } from "../../services/types";
import { useParams, useRouteMatch } from "react-router-dom";
import { OrderInfoDetails } from "../OrderInfoDetails/OrderInfoDetails";
import {
  wsConnectionClosed,
  wsConnectionOpen,
} from "../../services/actions/wsActions";
import {
  wsAuthConnectionClosed,
  wsAuthConnectionOpen,
} from "../../services/actions/wsAuthActions";
import { formatDate } from "../../utils/cookie";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderInfoStyles from "./OrderInfo.module.css";
import { TIngredients } from "../../services/types";

export const OrderInfo: FC = () => {
  const allOrders = useSelector((store) => store.wsFeed.orders);
  const authorizationOrders = useSelector((store) => store.wsAuthFeed.orders);
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const dispatch = useDispatch();

  let { id } = useParams<{id: string}>();
  let match = useRouteMatch();
  const isProfile = "/profile/orders/:id";
  const isFeed = "/feed/:id";

  let orders = match.path === isProfile ? authorizationOrders : allOrders;
  let order = orders?.find((order) => order._id === id);

  const orderIngredientsData = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order?.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData?.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, [orderIngredientsData]);

  useEffect(() => {
    if (!order) {
      if (match.path === isProfile) {
        dispatch(wsAuthConnectionOpen());
      }
      if (match.path === isFeed) {
        dispatch(wsConnectionOpen());
      }
    }
    return () => {
      if (match.path === isProfile) {
        dispatch(wsAuthConnectionClosed());
      }
      if (match.path === isFeed) {
        dispatch(wsConnectionClosed());
      }
    };
  }, [dispatch, order, match.path, match.url]);

  return (
    <>
      {order && (
        <div className={OrderInfoStyles.container}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <h2
            className={`${OrderInfoStyles.name} text text_type_main-medium pt-10`}
          >
            {order.name}
          </h2>
          {!!order.status && (
            <p
              className={`${OrderInfoStyles.status} text text_type_main-default pt-3`}
            >
              {order.status === "done"
                ? "Выполнен"
                : order.status === "pending"
                ? "Готовится"
                : order.status === "created"
                ? "Создан"
                : "Выполнен"}
            </p>
          )}
          <h3
            className={`${OrderInfoStyles.order} text text_type_main-medium pt-15`}
          >
            Состав:
          </h3>
          <ul className={`${OrderInfoStyles.list}`}>
            <OrderInfoDetails details={orderIngredientsData as TIngredients[]} key={id} />
          </ul>
          <div className={`${OrderInfoStyles.total} pb-10`}>
            <p className="text text_type_main-default text_color_inactive">
              {formatDate(order.createdAt)}
            </p>
            <div className={OrderInfoStyles.price}>
              <p className="text text_type_digits-default pr-2">
                {orderTotalPrice}
              </p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
