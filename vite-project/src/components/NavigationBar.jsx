import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import BalanceDisplay from './BalanceDisplay';

function NavigationBar() {
  const location = useLocation();

  const hideNavLinks = location.pathname === "/" || location.pathname === "/register";
  const username = localStorage.getItem("username");

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">CryptoLegend</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {!hideNavLinks && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`/${username}`}>Home</Nav.Link>
              <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
              <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
              <Nav.Link as={Link} to="/">Logout</Nav.Link>
            </Nav>
            <BalanceDisplay />
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
