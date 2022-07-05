import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppStyle from "./App.module.css";
import { Api, processResponse } from "../Api/Api";

function App() {
  function getData() {
    fetch(`${Api.url}`)
      .then(processResponse)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    getData();
  }, []);

  const [data, setData] = React.useState([]);
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

  const сloseModal = () => {
    setOrderDetailsModal(false);
    setIngredientDetailsModal(false);
  };

  return (
    <div className={AppStyle.page}>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients data={data} openModal={openIngredientDetailsModal} />
        <BurgerConstructor data={data} openModal={openOrderDetailsModal} />
      </main>
      {orderDetailsModal && (
        <Modal
          description="Детали заказа"
          open={openOrderDetailsModal}
          closeModal={сloseModal}
        >
          <OrderDetails />
        </Modal>
      )}
      {ingredientDetailsModal && (
        <Modal
          description="Детали ингредиентов"
          open={openIngredientDetailsModal}
          closeModal={сloseModal}
        >
          <IngredientDetails item={ingredientInModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
