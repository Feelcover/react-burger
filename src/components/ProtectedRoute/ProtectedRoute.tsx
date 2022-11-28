import { FC, ReactNode } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { TLocation } from "../../services/types"

interface Prop {
  children: ReactNode;
  exact?: boolean;
  path: string;
}

export const ProtectedRoute: FC<Prop> = ({ children, ...rest }) => {
  const location = useLocation<TLocation>();
  const cookie = getCookie("token");

  return (
    <Route
      {...rest}
      render={() =>
        cookie ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
