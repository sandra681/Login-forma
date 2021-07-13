import React, { useState, useEffect } from "react";
import "./Navbar.css";
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
import { FaBars, FaRegHeart } from "react-icons/fa";
import Badge from "@material-ui/core/Badge";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const user = useSelector((state) => state.userReducer);
  const likedHomes = useSelector(
    (state) => state.apartmentsReducer
  ).likedApartments;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function addHome() {
    props.history.push("/form-home/");
  }
  return (
    <>
      <Nav scrolled={scrollPosition}>
        <NavbarContainer>
          <NavbarLogo to="/">rent</NavbarLogo>
          <MobileIcon /* className="menu-icon" */ onClick={handleClick}>
            <FaBars /* className={click ? "fas fa-times" : "fas fa-bars"}  */ />
          </MobileIcon>
          <NavMenu
             
            className={click ? "nav-menu active" : "nav-menu"}
          >
            <NavItem>
              <NavLinks to="about">About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
            {user.isAdmin && (
              <NavItem>
                <NavBtnBtn
                  onClick={() => addHome()}
                  style={{ background: "red", marginTop: "1rem" }}
                >
                  Add Home
                </NavBtnBtn>
              </NavItem>
            )}
            {!isLoggedIn && (
              <NavItem>
                <NavLinks to="/signup">Singup</NavLinks>
              </NavItem>
            )}
          </NavMenu>

          {!isLoggedIn ? (
            <NavBtn>
              <NavBtnLink to="/login">Login</NavBtnLink>
            </NavBtn>
          ) : (
            <>
              <Badge
                badgeContent={likedHomes !== null ? likedHomes.length : 0}
                color="primary"
                style={{ marginTop: "2rem" }}
              >
                <FaRegHeart />
              </Badge>
              <NavBtn>
                <NavBtnBtn onClick={() => props.logout()}>Logout</NavBtnBtn>
              </NavBtn>
            </>
          )}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
