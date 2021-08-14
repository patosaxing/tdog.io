import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from './ReactSecLogo.png';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; <img style={{maxWidth: "1.25rem"}} src={Logo} alt="Logo" /> Eval-view</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
