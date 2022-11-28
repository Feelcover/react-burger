import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from "../../services/types";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  resetPassword,
  setResetFormValue,
} from "../../services/actions/authorization";
import { getCookie } from "../../utils/cookie";
import resetPasswordStyles from "./resetPassword.module.css";
import { TLocation } from "../../services/types";

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocation>();

  const cookie = getCookie("token");
  const { password, code } = useSelector((state) => state.authorization.form);

  const { resetPassSuccess, forgotPassSuccess } = useSelector(
    (state) => state.authorization
  );

  function formSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(resetPassword({ password, token: code }));
  }

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(setResetFormValue(evt.target.name, evt.target.value));
  }


  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }
  if (!forgotPassSuccess) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  return (
    <div className={resetPasswordStyles.container}>
      <h2 className="pb-6 text_type_main-medium text">Восстановление пароля</h2>

      <form className={resetPasswordStyles.form} onSubmit={formSubmit}>
        <div className="pb-6">
          <PasswordInput
            onChange={onChange}
            value={password}
            name={"password"}
            size="default"
          />
        </div>
        <div className="pb-6">
          <Input
            onChange={onChange}
            type={"text"}
            placeholder={"Введите код из письма"}
            value={code}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={resetPasswordStyles.button}>
          <Button disabled={!password || !code} type="primary" size="medium">
            {!!resetPassSuccess ? (
              <Redirect to={location.state?.from || "/profile"} />
            ) : (
              ""
            )}
            Сохранить
          </Button>
        </div>
      </form>

      <p className="pt-20 text_type_main-default text_color_inactive text">
        Вспомнили пароль?
        <Link className={resetPasswordStyles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
