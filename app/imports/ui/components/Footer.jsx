import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-auto bg-light">
      <Container style={divStyle}>
        <Col className="text-center">
          Department of Information and Computer Sciences
          <br />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          <br />
          <a href="http://ics-software-engineering.github.io/meteor-example-form-react-bootstrap">
            Template Home Page
          </a>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
