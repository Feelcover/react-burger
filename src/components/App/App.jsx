import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppStyle from "./App.module.css";
import { getData, error } from "../../utils/Api";

function App() {
  const [loadingState, setLoadingState] = React.useState({
    data: [],
    hasError: false,
    isLoading: true,
  });

  React.useEffect(() => {
    setLoadingState({ ...loadingState, hasError: false, isLoading: true });
    getData()
      .then((res) => {
        setLoadingState({ ...loadingState, data: res.data, isLoading: false });
      })
      .catch((err) => {
        setLoadingState({ ...loadingState, hasError: true, isLoading: false });
      });
  }, []);

  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const [ingredientDetailsModal, setIngredientDetailsModal] =
    React.useState(false);
  const [ingredientInModal, setIngredientInModal] = React.useState({});

  const openOrderDetailsModal = () => {
    setOrderDetailsModal(true);
  };

  const openIngredientDetailsModal = (item) => {
    setIngredientInModal(item);
    setIngredientDetailsModal(true);
  };

  const closeModal = () => {
    setOrderDetailsModal(false);
    setIngredientDetailsModal(false);
  };

  return (
    <div className={AppStyle.page}>
      <AppHeader />
      <main className={AppStyle.content}>
        {loadingState.isLoading && "Идёт загрузка..."}
        {loadingState.hasError && `Произошла ошибка загрузки ${error}`}
        {!loadingState.isLoading && !loadingState.hasError && (
          <>
            <BurgerIngredients
              data={loadingState.data}
              openModal={openIngredientDetailsModal}
            />
            <BurgerConstructor
              data={loadingState.data}
              openModal={openOrderDetailsModal}
            />
          </>
        )}
      </main>
      {orderDetailsModal && (
        <Modal
          description="Детали заказа"
          open={openOrderDetailsModal}
          closeModal={closeModal}
        >
          <OrderDetails />
        </Modal>
      )}
      {ingredientDetailsModal && (
        <Modal
          description="Детали ингредиентов"
          open={openIngredientDetailsModal}
          closeModal={closeModal}
        >
          <IngredientDetails item={ingredientInModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
