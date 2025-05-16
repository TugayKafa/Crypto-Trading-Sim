import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();

  // Скриваме менюто ако сме на login или register страница
  const hideNavLinks = location.pathname === "/" || location.pathname === "/register";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">CryptoSim</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {!hideNavLinks && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Начало</Nav.Link>
              <Nav.Link as={Link} to="/portfolio">Портфолио</Nav.Link>
              <Nav.Link as={Link} to="/transactions">Транзакции</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
