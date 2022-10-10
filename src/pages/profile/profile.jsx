import { useState, useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  NavLink,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import {
  singOut,
  updateUser,
  getUser,
} from "../../services/actions/authorization";
import { OrdersHistory } from "./OrdersHistory/OrdersHistory";
import { OrderInfo } from "../../components/OrderInfo/OrderInfo";
import {
  wsAuthConnectionClosed,
  wsAuthConnectionOpen,
} from "../../services/actions/wsAuthActions";
import profileStyle from "./profile.module.css";

export const Profile = () => {
  const { email, name } = useSelector((state) => state.authorization.user);

  const dispatch = useDispatch();

  const location = useLocation();

  const matchOrderDetails = !!useRouteMatch({ path: "/profile/orders/:id" });
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(wsAuthConnectionOpen());
    return () => {
      dispatch(wsAuthConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    setForm({
      email: email,
      name: name,
      password: "",
    });
  }, [email, name]);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  function onSingOut() {
    dispatch(singOut());
  }

  function submit(evt) {
    evt.preventDefault();
    dispatch(updateUser(form.email, form.name, form.password));
  }

  function onChange(evt) {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  }

  function reset(evt) {
    evt.preventDefault();
    setForm({
      email: email,
      name: name,
      password: "",
    });
  }

  return (
    <div className={`${profileStyle.container} pt-30`}>
      {!matchOrderDetails && (
        <nav className={`${profileStyle.nav} pr-10`}>
          <ul className={`${profileStyle.items}`}>
            <li className={`${profileStyle.item}`}>
              <NavLink
                to="/profile"
                exact
                className={`${profileStyle.link} text_type_main-medium text_color_inactive text`}
                activeClassName={`${profileStyle.linkActive} text_type_main-medium text`}
              >
                Профиль
              </NavLink>
            </li>
            <li className={`${profileStyle.item}`}>
              <NavLink
                to="/profile/orders"
                exact
                className={`${profileStyle.link} text_type_main-medium text_color_inactive text`}
                activeClassName={`${profileStyle.linkActive} text_type_main-medium text`}
              >
                История заказов
              </NavLink>
            </li>
            <li className={`${profileStyle.item}`}>
              <NavLink
                to="/login"
                exact
                className={`${profileStyle.link} text_type_main-medium text_color_inactive text`}
                activeClassName={`${profileStyle.linkActive} text_type_main-medium text`}
                onClick={onSingOut}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p
            className={`${profileStyle.description} pt-20 pb-4 text_type_main-default text_color_inactive text`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
      )}
      <Switch location={background || location}>
        <Route path="/profile/orders" exact>
          <OrdersHistory />
        </Route>
        <Route path="/profile/orders/:id" exact>
          <OrderInfo />
        </Route>
        <Route exact path="/profile">
          <form className={profileStyle.form} onSubmit={submit}>
            <div className="pb-6">
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onChange}
                icon={"EditIcon"}
                value={form.name}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className="pb-6">
              <Input
                type={"email"}
                placeholder={"Логин"}
                onChange={onChange}
                icon={"EditIcon"}
                value={form.email}
                name={"email"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className="pb-6">
              <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={onChange}
                icon={"EditIcon"}
                value={form.password}
                name={"password"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className={profileStyle.buttons}>
              <Button
                disabled={form.email && form.name}
              type="primary" size="medium" onClick={reset}>
                Oтмена
              </Button>
              <Button
                disabled={!form.email && !form.password && !form.name}
                type="primary"
                size="medium"
              >
                Сохранить
              </Button>
            </div>
          </form>
        </Route>
      </Switch>
    </div>
  );
};
