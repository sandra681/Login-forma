import React, { useState } from "react";
import Signup from "./Signup";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import Header from "../common/Header";
import FormHome from "./FormHome";
import AddHome from "../components/addhome/AddHome";
import axios from "axios";

function App() {
  const history = useHistory();
  let inMemoryToken = {};

  function login({ access_token, token_type, expires_at }, noRedirect) {
    inMemoryToken = {
      token: access_token,
      type: token_type,
      expity: expires_at,
    };
    localStorage.setItem("token", inMemoryToken.token);
    localStorage.setItem("isLogin", true);
    if (!noRedirect) {
      history.push("/");
    }
  }
  return (
    <>
      <Header />
      <Switch>
        {/* <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <PrivateRoute
              path="/update-profile"
              component={UpdateProfile}
            ></PrivateRoute> */}
        <Route exact path="/">
          <Homepage token={inMemoryToken} />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="/form-home" component={FormHome}></Route>
        <Route path="/addhome" component={AddHome}></Route>
      </Switch>
    </>
  );
}

export default App;
