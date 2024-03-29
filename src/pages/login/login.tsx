import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, FC, FormEvent } from "react"
import { useSelector, useDispatch } from "../../services/types";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  setLoginFormValue,
  singIn,
} from "../../services/actions/authorization";
import { getCookie } from "../../utils/cookie";
import { TLocation } from "../../services/types";
import loginStyle from "./login.module.css";

export const Login: FC = () => {
  const { email, password } = useSelector((state) => state.authorization.form);

  const requestLogin = useSelector((state) => state.authorization.loginRequest);
  const errorLogin = useSelector((state) => state.authorization.loginFailed);

  const dispatch = useDispatch();


  const cookie = getCookie("token");
  const location = useLocation<TLocation>();

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(singIn(email, password));
  }

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(setLoginFormValue(evt.target.name, evt.target.value));
  }

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={loginStyle.container}>
      <h2 className={`${loginStyle.title} pb-6 text_type_main-medium text`}>
        Вход
      </h2>
      {requestLogin ? (
                <div className={loginStyle.loader} />
            ) : (
      <form className={loginStyle.form} onSubmit={onSubmit}>
        <div className="pb-5">
          <EmailInput
            onChange={onChange}
            value={email}
            name={"email"}
            size="default"
          />
        </div>
        <div className="pb-5">
          <PasswordInput
            onChange={onChange}
            value={password}
            name={"password"}
            size="default"
          />
        </div>
        
              <Button disabled={!password || !email} type="primary" size="medium">
        Войти
        </Button>

            
        
        {errorLogin ? (
        <p className={loginStyle.error}
        >Не правильный логин или пароль, повторите попытку</p>
      ) : (
        null
      )}
      </form>
      )}
      <p className="pt-20 pb-4 text_type_main-default text_color_inactive text">
        Вы — новый пользователь?
        <Link className={loginStyle.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text_type_main-default text_color_inactive text">
        Забыли пароль?
        <Link className={loginStyle.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
