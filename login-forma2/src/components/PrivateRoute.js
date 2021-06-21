import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        JSON.parse(localStorage.getItem("user")).admin === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
