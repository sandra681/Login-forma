import React, { useState } from "react";
import Signup from "./Signup";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import Header from "../common/Header";
import AddHome from "../components/addhome/AddHome";

function App() {
  function checkUser() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user !== null) {
      return user;
    }
    return null;
  }
  const [currentUser, setCurrentUser] = useState(checkUser);
  const [adminUser, setAdminUser] = useState(false);
  function onLoginChange() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user !== null) {
      console.log(user);
      setCurrentUser(user);
      console.log(adminUser);
    }
    setTimeout(() => {}, 2000);
    if (user !== null && user.admin === 1) {
      setAdminUser(true);
      console.log(adminUser);
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
          <Homepage currentUser={currentUser} adminUser={adminUser} />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login">
          <Login onLoginChange={onLoginChange} />
        </Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="/addhome" component={AddHome}></Route>
      </Switch>
    </>
  );
}

export default App;
