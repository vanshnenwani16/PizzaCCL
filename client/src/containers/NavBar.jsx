import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BiCart } from "react-icons/bi";
import MenuProfile from "./MenuProfile";
import pizzaIcon from "../assets/pizza.png"

function NavBar() {
  const { cartItems } = useSelector((state) => state.cart.cartItems);

  const { user_login } = useSelector((state) => state.users.login);
  return (
    <Navbar
      style={{backgroundColor:"#081421"}}
      bg=""
      expand="lg"
      className="shadow-lg p-3 mb-5"
    >
      <LinkContainer to="/">
        <Navbar.Brand className=""><img src={pizzaIcon} style={{height: 40, width:40, marginLeft: 20}}/><span style={{fontFamily:"sans-serif", color: "#fff", marginLeft: 20}}>PIZZA DELIVERY</span></Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="me-auto ml-auto">
          {user_login ? (
            <MenuProfile user_login={user_login}/>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link ><span style={{color: "#fff"}}>Login</span></Nav.Link>
            </LinkContainer>
          )}

          <LinkContainer to="/cart">
            <Nav.Link>
              <BiCart color="#fff" size={24} /><span style={{color: "#fff"}}> Cart{" "}</span>
              <Badge color="info" style={{color: "#fff"}}>{cartItems.length}</Badge>
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
