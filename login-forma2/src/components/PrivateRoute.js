import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAdmin } from "../api/userApi";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       const currentUser = getUser().then((result) => {
//         if (result === null) {
//           return;
//         }
//         return result.data;
//       });
//       if (!currentUser) {
//         console.log(currentUser);
//         return (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         );
//       }
//       if (currentUser.admin === 1) {
//         console.log(currentUser);
//         return <Redirect to={{ pathname: "/" }} />;
//       }
//       return <Component {...props} />;
//     }}
//   />
// );
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
