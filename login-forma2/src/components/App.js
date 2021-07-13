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
import { ADD_TO_ALL } from "../actions/types";
import apartmentService from "../services/apartment.services";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer);
  const user = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (isLoggedIn.isLoggedIn) {
      dispatch(getLoggedUser());
    }
  }, []);
  useEffect(() => {
    if (user.user) {
      apartmentService
        .getAllLikedApartmentsOfUser(user.user.id)
        .then((response) => {
          dispatch({
            type: ADD_TO_ALL,
            payload: { likedApartments: response.data },
          });
        })
        .catch((error) => console.log(error));
    }
  }, [user]);
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
        <PrivateRoute
          path="/form-home/:id"
          history={history}
          component={FormHome}
        ></PrivateRoute>
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
