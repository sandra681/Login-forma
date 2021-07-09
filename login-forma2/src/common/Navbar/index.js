import React, { useState, useEffect } from "react";
import {
  Nav,
  NavbarContainer,
  NavbarLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavBtnBtn,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
const Navbar = (props) => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const isAdmin = useSelector((state) => state.userReducer);
  const [y, setY] = useState(window.scrollY);
  async function toggleLogoutMenu() {
    props.logout();
  }
  function addHome() {
    props.history.push("/form-home/");
  }
  useEffect(() => {
    console.log(window.scrollY);
    setY(window.scrollY);
  }, [window.scrollY]);
  return (
    <>
      <Nav scrolled={y}>
        <NavbarContainer>
          <NavbarLogo to="/">rent</NavbarLogo>
          <MobileIcon>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about">About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
            {isAdmin.isAdmin && (
              <NavBtn>
                <NavBtnBtn onClick={() => addHome()}>Add Home</NavBtnBtn>
              </NavBtn>
            )}
            {!isLoggedIn && (
              <NavItem>
                <NavLinks to="/signup">Singup</NavLinks>
              </NavItem>
            )}
          </NavMenu>
          <NavBtn>
            {!isLoggedIn ? (
              <NavBtnLink to="/login">Login</NavBtnLink>
            ) : (
              <NavBtnBtn onClick={() => toggleLogoutMenu()}>Logout</NavBtnBtn>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
