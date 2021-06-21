import React, { useState } from "react";
import Signup from "./Signup";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import Header from "../common/Header";
import FormHome from "./FormHome";
import PrivateRoute from "./PrivateRoute";
import { getUser } from "../api/userApi";

function App() {
  const history = useHistory();
  let inMemoryToken = {};
  const admin = localStorage.getItem("admin");
  async function login({ access_token, token_type, expires_at }, noRedirect) {
    inMemoryToken = {
      token: access_token,
      type: token_type,
      expity: expires_at,
    };
    localStorage.setItem("token", inMemoryToken.token);
    localStorage.setItem("isLogin", true);
    const loggUser = await getLoginUser(inMemoryToken.token);
    console.log(loggUser.admin);
    if (loggUser.admin === 1) {
      localStorage.setItem("admin", true);
      console.log(admin);
    }
    if (!noRedirect) {
      history.push("/");
    }
  }
  async function getLoginUser(token) {
    const user1 = await getUser(token).then((result) => {
      return result;
    });
    setTimeout(() => {}, 2000);
    console.log(user1);
    localStorage.setItem("user", JSON.stringify(user1));
    return user1;
  }

  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute path="/form-home" component={FormHome}></PrivateRoute>
        {/* <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <PrivateRoute
              path="/update-profile"
              component={UpdateProfile}
            ></PrivateRoute> */}
        <Route exact path="/">
          <Homepage token={inMemoryToken} admin={admin} />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        {/* <Route path="/form-home" component={FormHome}></Route> */}
      </Switch>
    </>
  );
}

export default App;
