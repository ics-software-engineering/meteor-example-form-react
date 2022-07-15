import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

/* The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = () => {
  const menuStyle = { marginBottom: '10px' };
  return (
    <Navbar bg="light" expand="lg" style={menuStyle}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h1>meteor-example-form-react</h1>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
