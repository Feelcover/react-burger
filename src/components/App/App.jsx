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
import { closeOrderModal } from "../../services/actions/order-details";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import { closeIngredientModal } from "../../services/actions/ingredient-details";
import { RESET_INGREDIENT } from "../../services/actions/burger-constructor";

function App() {
  const openDetailsModal = useSelector(
    (store) => store.ingredientDetails.openModal
  );

  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const hasError = useSelector((store) => store.burgerIngredients.hasError);
    

  const dispatch = useDispatch();

  const orderNumberModal = useSelector((store) => store.order.number);
  

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const handleCloseOrderModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_INGREDIENT });
  }, [dispatch]);

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
  }, [dispatch]);




  
  return (
    <div className={AppStyle.page}>
      <AppHeader />
      <main className={AppStyle.content}>
      {isLoading && (
         <div className={AppStyle.loader}/>
      )}
        {hasError && "Что-то пошло не так...(   Попробуйте позже!"}
        {!isLoading && !hasError && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        )}
      </main>
      {orderNumberModal && (
        <Modal description="Детали заказа" closeModal={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
      {openDetailsModal && (
        <Modal
          description="Детали ингредиентов"
          closeModal={handleCloseIngredientDetailsModal}
        >
          <IngredientDetails data={openDetailsModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
