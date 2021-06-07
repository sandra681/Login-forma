import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      <NavLink to="/login" activeStyle={activeStyle} exact>
        Login
      </NavLink>
      <NavLink to="/signup" activeStyle={activeStyle} exact>
        Sign Up
      </NavLink>
    </nav>
  );
};

export default Header;
