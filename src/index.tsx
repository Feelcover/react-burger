import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);


reportWebVitals();
