import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const user = useSelector((state) => state.userReducer);
  const activeStyle = { color: "#F15B2A" };
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };
  //Funkcija za logout
  async function toggleLogoutMenu() {
    props.logout();
  }

  const show = menu ? "show" : ""; //For toggle menu oke oke

  useEffect(() => {
    setMenu(false);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ position: "absolute", width: "99%" }}
    >
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
              height="40"
              alt=""
              loading="lazy"
            />
          </a>
          <p className="p">RENT REAL ESTATE</p>
        </div>
        <div className="navbar-items">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                activeStyle={activeStyle}
                exact
                style={{ color: "white" }}
              >
                Home
              </NavLink>
              <NavLink
                className="nav-link"
                to="/about"
                activeStyle={activeStyle}
                exact
                style={{ color: "white" }}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <img
            src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
            className="rounded-circle"
            height="25"
            alt=""
            loading="lazy"
          />
          <p className="email">
            {user.user !== null ? "Hello," + user.user.name + "!" : "email"}
          </p>{" "}
          <Link
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            to="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mb-toggle="dropdown"
            aria-expanded="false"
            onClick={() => toggleMenu()}
          ></Link>
          <ul
            className={"dropdown-menu dropdown-menu-end " + show}
            aria-labelledby="navbarDropdownMenuLink"
            style={{ position: "relative" }}
          >
            {isLoggedIn && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => toggleLogoutMenu()}
                >
                  Logout
                </button>{" "}
              </li>
            )}
            {!isLoggedIn && (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
