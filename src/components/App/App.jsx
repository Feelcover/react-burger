import React, { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppStyle from "./App.module.css";
import { Api, processResponse } from "../../utils/Api";
import { IngredientsContext } from "../../services/IngredientsContext";

function App() {
  const [data, setData] = useState([]);
  const [orderNumber, setOrderNumber] = useState({
    name: "",
    order: { number: "" },
    success: false,
  });

  function getData() {
    fetch(`${Api.url}/ingredients`)
      .then(processResponse)
      .then((res) => {
        setData(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function getOrder(ingredientsId) {
    fetch(`${Api.url}/orders`, {
      method: "POST",
      body: JSON.stringify({ ingredients: ingredientsId }),
      headers: { "Content-Type": "application/json" },
    })
      .then(processResponse)
      .then((res) => setOrderNumber(res))
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    getData();
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
      <IngredientsContext.Provider value={{ data, setData }}>
        <AppHeader />
        <main className={AppStyle.content}>
          <BurgerIngredients
            openModal={openIngredientDetailsModal}
          />
          <BurgerConstructor
            openModal={openOrderDetailsModal}
            getOrder={getOrder}
          />
        </main>
        {orderDetailsModal && (
          <Modal
            description="Детали заказа"
            open={openOrderDetailsModal}
            closeModal={closeModal}
          >
            <OrderDetails orderNumber={orderNumber} />
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
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
