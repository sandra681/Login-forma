import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import { Switch, Route, Router } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./homepage/Homepage";
import FormHome from "./FormHome";
import PrivateRoute from "./PrivateRoute";
import HomeDetail from "../homes/HomeDetail";
//history
import history from "../helpers/history";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../actions/message";
import { logout } from "../actions/auth";
import { getLoggedUser } from "../actions/user";
import Navbar from "../common/Navbar";
import { ADD_TO_ALL } from "../actions/types";
import apartmentService from "../services/apartment.services";
import { getApartments } from "../actions/apartments";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer);
  const user = useSelector((state) => state.userReducer);

  const [page, setPage] = useState(1); //koja je strana u pitanju
  const [pageCount, setPageCount] = useState(1);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  // const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getApartments(filter, sort, order, search, page))
      .then((response) => {
        if (user.isAdmin) {
          let adminApartments = response.data.data.filter(
            (one) => (one.user_id = user.user.id)
          );
          // setFilterHomes(adminApartments);
          setPageCount(response.data["last_page"]);
          return;
        }
        // setFilterHomes(response.data.data);
        setPageCount(response.data["last_page"]);
      })
      .catch((error) => console.log(error));
  }, [sort, order, filter, search, page, user]);
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
        <Route exact path="/">
          <Homepage
            history={history}
            pageCount={pageCount}
            setFilter={setFilter}
            setSort={setSort}
            setOrder={setOrder}
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
          />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="/apartment/:id" component={HomeDetail}></Route>
        <Route path="/liked-homes/:id" component={LikedHomesList}></Route>
        {/* <Route path="/form-home" component={FormHome}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
