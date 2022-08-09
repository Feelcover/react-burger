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

function App() {
  const openDetailsModal = useSelector(
    (store) => store.ingredientDetails.openModal
  );

  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const hasError = useSelector((store) => store.burgerIngredients.hasError);

  const orderNumberModal = useSelector((store) => store.order.number);

  const dispatch = useDispatch();

  const handleCloseOrderModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_INGREDIENT });
  }, [dispatch]);

  const handleCloseIngredientModal = useCallback(() => {
    dispatch(closeIngredientModal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={AppStyle.page}>
      <AppHeader />
      <main className={AppStyle.content}>
        {isLoading && 
        <div className={AppStyle.loader} />
        }
        {hasError && "Что-то пошло не так...( Попробуйте позже!"}
        {!isLoading && !hasError && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
      {orderNumberModal && (
        <Modal 
        description="Детали заказа" 
        closeModal={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
      {openDetailsModal && (
        <Modal
          description="Детали ингредиентов"
          closeModal={handleCloseIngredientModal}
        >
          <IngredientDetails data={openDetailsModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
