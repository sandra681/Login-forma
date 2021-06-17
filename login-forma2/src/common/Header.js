import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  const history = useHistory();
  const activeStyle = { color: "#F15B2A" };
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  async function toggleLogoutMenu() {
    await axios
      .get("http://127.0.0.1:8000/api/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toggleMenu();
        localStorage.removeItem("isLogin");
        localStorage.removeItem("token");
        setIsLogin(false);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const show = menu ? "show" : ""; //For toggle menu oke oke

  useEffect(() => {
    setMenu(false);
  }, []);

  // useEffect(() => {}, [isLogin]);
  if (isLogin) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mb-toggle="collapse"
            data-mb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => toggleMenu()}
          >
            <i className="fas fa-bars"></i>
          </button>

          <div
            className={"collapse navbar-collapse " + show}
            id="navbarSupportedContent"
          >
            <a className="navbar-brand mt-2 mt-lg-0" href="/">
              <img
                src="https://arrangeyourvacation.com/images/site/logo.svg"
                height="15"
                alt=""
                loading="lazy"
              />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  activeStyle={activeStyle}
                  exact
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <Link
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              to="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mb-toggle="dropdown"
              aria-expanded="false"
              onClick={() => toggleMenu()}
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
                className="rounded-circle"
                height="25"
                alt=""
                loading="lazy"
              />
              <p>{"email"}</p>
            </Link>
            <ul
              className={"dropdown-menu dropdown-menu-end " + show}
              aria-labelledby="navbarDropdownMenuLink"
              style={{ position: "relative" }}
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => toggleLogoutMenu()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mb-toggle="collapse"
          data-mb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => toggleMenu()}
        >
          <i className="fas fa-bars"></i>
        </button>

        <div
          className={"collapse navbar-collapse " + show}
          id="navbarSupportedContent"
        >
          <a className="navbar-brand mt-2 mt-lg-0" href="/">
            <img
              src="https://arrangeyourvacation.com/images/site/logo.svg"
              height="15"
              alt=""
              loading="lazy"
            />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                activeStyle={activeStyle}
                exact
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <Link
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            to="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mb-toggle="dropdown"
            aria-expanded="false"
            onClick={() => toggleMenu()}
          >
            <img
              src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
              className="rounded-circle"
              height="25"
              alt=""
              loading="lazy"
            />
          </Link>
          <ul
            className={"dropdown-menu dropdown-menu-end " + show}
            aria-labelledby="navbarDropdownMenuLink"
            style={{ position: "relative" }}
          >
            <li>
              <NavLink
                className="dropdown-item"
                to="/login"
                activeStyle={activeStyle}
                exact
                onClick={() => toggleMenu()}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/signup"
                activeStyle={activeStyle}
                exact
                onClick={() => toggleMenu()}
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
