import React from "react";
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
  const numOfLikedHomes = useSelector((state) => state.apartmentsReducer);
  console.log(numOfLikedHomes);
  function addHome() {
    props.history.push("/form-home/");
  }
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavbarLogo to="/">dollar</NavbarLogo>
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
                badgeContent={numOfLikedHomes.likedHomes}
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
