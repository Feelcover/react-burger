import React from "react";
import headerStyles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={`${headerStyles.menu}`}>
        <div className={headerStyles.menu_container}>
          <div
            className={`${headerStyles.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-5 mr-2`}
          >
            <a className={headerStyles.menu_link} href="#">
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </a>
          </div>
          <div
            className={`${headerStyles.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-3`}
          >
            <a className={headerStyles.menu_link} href="#">
              <ListIcon type="secondary" />
              <p className='text text_type_main-default text_color_inactive pl-2'>
                Лента заказов
              </p>
            </a>
          </div>
          <div className={`${headerStyles.logo} ml-25`}>
          <Logo type="primary" />
        </div>
        </div>

        <div
          className={`${headerStyles.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-5`}
        >
          <a className={headerStyles.menu_link} href="#">
          <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">
              Личный кабинет
            </p>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
