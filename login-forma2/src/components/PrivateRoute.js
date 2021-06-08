import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authenticationService } from "../_services/authenticationService";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      if (roles && roles.indexOf(currentUser.role) === -1) {
        return <Redirect to={{ pathname: "/" }} />;
      }
      return <Component {...props} />;
    }}
  />
);
// const {currentUser}=useAuth()
// return (
//     <Route
//     {...rest}
//     render={props=>{
//       return  currentUser ? <Component {...props}/> : <Redirect to="/"/>
//     }}
//     >
//     </Route>
// )
export default PrivateRoute;
