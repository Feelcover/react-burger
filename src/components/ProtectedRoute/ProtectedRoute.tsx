import { FC, ReactNode } from "react";
import { Redirect, Route, useLocation, RouteProps } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { TLocation } from "../../services/types";

export const ProtectedRoute: FC<RouteProps & { children?: ReactNode }> = ({
  children,
  ...rest
}) => {
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
