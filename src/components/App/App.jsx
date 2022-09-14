import { useEffect, useCallback } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppStyle from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { closeOrderModal } from "../../services/actions/order";
import { getBurgerIngredients } from "../../services/actions/ingredients";
import { closeIngredientModal } from "../../services/actions/details";
import { RESET_INGREDIENT } from "../../services/actions/constructor";

import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  Register,
  ResetPassword,
} from "../../pages";
import { getUser, updateToken } from "../../services/actions/authorization";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { getCookie } from "../../utils/cookie";

function App() {


  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
  const token = localStorage.getItem("refreshToken");
  const cookie = getCookie("token");

  const orderNumberModal = useSelector((store) => store.order.number);

  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const hasError = useSelector((store) => store.burgerIngredients.hasError);

  const handleCloseOrderModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_INGREDIENT });
  }, [dispatch]);

  const handleCloseIngredientModal = useCallback(() => {
    dispatch(closeIngredientModal());
    history.replace("/");
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && token) {
      dispatch(updateToken());
    }
  }, [dispatch, token, cookie]);

  return (
    <div className={AppStyle.page}>
      <AppHeader />
      <>
        <Switch location={background || location}>
          <Route path="/" exact>
            <main className={AppStyle.content}>
              {isLoading && <div className={AppStyle.loader} />}
              {hasError && "Что-то пошло не так...( Попробуйте позже!"}
              {!isLoading && !hasError && (
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              )}
            </main>
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPassword />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetails />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        
        {background && (
          <Route path="/ingredients/:id" exact={true}>
            <Modal
              description="Детали ингредиента"
              closeModal={handleCloseIngredientModal}
            >
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </>
      {orderNumberModal && (
        <Modal description="Детали заказа" closeModal={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
