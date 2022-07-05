import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from "./App.module.css";
import { Api, processResponse } from "../Api/Api";

function App() {
  
  function getData() {
    fetch(`${Api.url}`)
    .then(processResponse)
    .then((res) => {setData(res.data)})
    .catch(err => {console.log(err)});
  }

  React.useEffect(() => {
    getData();
  }, [])

  const [data, setData] = useState([]);
  const [] = React.useState(false)
  const [] = React.useState(false)
  const [] = React.useState(null)



  return (
    <div className={AppStyle.page}>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerConstructor data={data} openModal={}/>
        <BurgerIngredients data={data} openModal={}/>
      </main>
    </div>
  );
}

export default App;
