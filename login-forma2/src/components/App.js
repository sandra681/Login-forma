import React, {useEffect } from "react";
import Signup from "./Signup";
import { Switch, Route,Router } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import Header from "../common/Header";
import FormHome from "./FormHome";
import PrivateRoute from "./PrivateRoute";

//history
import history from "../helpers/history";
import { useDispatch} from "react-redux";
import { clearMessage } from "../actions/message";
import { logout } from "../actions/auth";

function App() {

  const dispatch = useDispatch();

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
      <Header logout={logOutD} />
      <Switch>
        <PrivateRoute path="/form-home" component={FormHome}></PrivateRoute>
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
