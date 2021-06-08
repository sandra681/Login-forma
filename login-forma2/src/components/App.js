import React, { useState } from "react";
import Signup from "./Signup";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import Header from "../common/Header";

function App() {
  function checkUser() {
    const user = localStorage.getItem("currentUser");
    if (user !== null) {
      return true;
    }
    return false;
  }
  const [currentUser, setCurrentUser] = useState(checkUser);
  function onLoginChange() {
    const user = localStorage.getItem("currentUser");
    if (user !== null) {
      setCurrentUser(true);
    }
  }
  return (
    <>
      <Header currentUser={currentUser} />
      <Switch>
        {/* <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <PrivateRoute
              path="/update-profile"
              component={UpdateProfile}
            ></PrivateRoute> */}
        <Route exact path="/">
          <Homepage currentUser={currentUser} />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login">
          <Login onLoginChange={onLoginChange} />
        </Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
      </Switch>
    </>
  );
}

export default App;
