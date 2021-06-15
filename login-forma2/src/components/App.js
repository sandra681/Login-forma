import React, { useState } from "react";
import Signup from "./Signup";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import Header from "../common/Header";
import AddHome from "../components/addhome/AddHome";

function App() {
  const [token, setToken] = useState();
  const [isLogin, setIsLogin] = useState();

  const [adminUser, setAdminUser] = useState(false);
  return (
    <>
      <Header token={token} isLogin={isLogin} />
      <Switch>
        {/* <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <PrivateRoute
              path="/update-profile"
              component={UpdateProfile}
            ></PrivateRoute> */}
        <Route exact path="/">
          <Homepage token={token} adminUser={adminUser} />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login">
          <Login setToken={setToken} setIsLogin={setIsLogin} />
        </Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="/addhome" component={AddHome}></Route>
      </Switch>
    </>
  );
}

export default App;
