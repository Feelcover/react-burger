import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import AppStyle from "./App.module.css";

function App() {
  return (
    <div className={AppStyle.page}>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerConstructor />
        <BurgerIngridients />
      </main>
    </div>
  );
}

export default App;
