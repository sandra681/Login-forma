import React, { useEffect } from "react";
import Signup from "./Signup";
import { Switch, Route, Router } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import FormHome from "./FormHome";
import PrivateRoute from "./PrivateRoute";

//history
import history from "../helpers/history";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../actions/message";
import { logout } from "../actions/auth";
import { getLoggedUser } from "../actions/user";
import Navbar from "../common/Navbar";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (isLoggedIn.isLoggedIn) {
      dispatch(getLoggedUser());
    }
  }, []);
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOutD = () => {
    dispatch(logout());
    history.push("/login");
    window.location.reload();
  };

  return (
    <Router history={history}>
      <Navbar logout={logOutD} history={history} />
      <Switch>
        <PrivateRoute
          exact
          path="/form-home"
          component={FormHome}
        ></PrivateRoute>
        <PrivateRoute path="/form-home/:id" component={FormHome}></PrivateRoute>
        <Route exact path="/" component={Homepage}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        {/* <Route path="/form-home" component={FormHome}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
