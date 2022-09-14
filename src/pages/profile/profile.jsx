import { useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { singOut, updateUser } from "../../services/actions/authorization";
import { Orders } from "./orders/orders";
import profileStyle from "./profile.module.css";

export const Profile = () => {
  const dispatch = useDispatch();

  const { email, name } = useSelector((state) => state.authorization.user);

  const [form, setForm] = useState({
    email: email,
    name: name,
    password: "",
  });

  function onSingOut() {
    dispatch(singOut());
  }

  function submit(evt) {
    evt.preventDefault();
    dispatch(updateUser(form.email, form.name, form.password));
  }

  function change(evt) {
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
      <nav className={`${profileStyle.nav} pr-15`}>
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
      <Switch>
        <Route exact path="/profile/orders">
          <Orders />
        </Route>
        <Route exact path="/profile">
          <form className={profileStyle.form} onSubmit={submit}>
            <div className="pb-6">
              <Input
                onChange={change}
                type={"text"}
                placeholder={"Имя"}
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
                onChange={change}
                type={"email"}
                placeholder={"Логин"}
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
                onChange={change}
                type={"password"}
                placeholder={"Пароль"}
                icon={"EditIcon"}
                value={form.password}
                name={"password"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className={profileStyle.buttons}>
              <Button type="primary" size="medium" onClick={reset}>
                Oтмена
              </Button>
              <Button disabled={!form.password} type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </form>
        </Route>
      </Switch>
    </div>
  );
};
