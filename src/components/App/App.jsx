import { useEffect, useCallback } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppStyle from "./App.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { closeOrderModal } from '../../services/actions/order-details';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { closeIngredientModal } from '../../services/actions/ingredient-details';
import { RESET_ITEM } from '../../services/actions/burger-constructor';

function App() {
  const dispatch = useDispatch();
  const orderNumber = useSelector(store => store.order.number);
  const openIngredientDetailsModal  = useSelector(store => store.ingredientDetails.openModal);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const handleCloseOrderModal = useCallback(() => {
    dispatch(closeOrderModal())
    dispatch({ type: RESET_ITEM });
  }, [dispatch]);

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
  }, [dispatch]);

  return (
    <div className={AppStyle.page}>
        <AppHeader />
        <main className={AppStyle.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
          </DndProvider>
        </main>
        {!!orderNumber && (
          <Modal
            description="Детали заказа"
            closeModal={handleCloseOrderModal}
          >
            <OrderDetails/>
          </Modal>
        )}
        {!!openIngredientDetailsModal  && (
          <Modal
            description="Детали ингредиентов"
            closeModal={handleCloseIngredientDetailsModal}
          >
            <IngredientDetails ingredient={openIngredientDetailsModal} />
          </Modal>
        )}
    </div>
  );
}

export default App;
