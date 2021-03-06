import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import Logo from "./ReactSecLogo.png";
import Exit from "../img/Exit.svg";
import Login from "../img/Login.svg";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    // need to bring in statemanegement
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg"  fixed="top" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {" "}
              <img style={{ maxWidth: "2.75rem" }} src={Logo} alt="Logo" />{" "}
              Eval-view
            </Navbar.Brand>
          </LinkContainer>
          <h6 style={{ color: "transparent" }}>
            Adjusting NavBar spacer 
          </h6>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          {/* {userInfo && userInfo.isAdmin && ( */}
          {/* {userInfo &&  (
            <Route render={({ history }) => <SearchBox history={history} />} />
            )} */}
            <h4 style={{ color: "transparent" }}>spacer</h4>
            <Nav className="ml-auto">
              {/* {userInfo && userInfo.isAdmin && (
                <LinkContainer to="/VideoList">
                  <Nav.Link>🎞️VideoList</Nav.Link>
                </LinkContainer>
              )} */}
              <img
                style={{ maxWidth: "3.5rem" }}
                src={Login}
                alt="Logout-icon"
              />{" "}
              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>LOG IN TO YOUR WORKSPACE</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                
                <NavDropdown title="Admin Tools" id="adminMenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/videolist">
                    <NavDropdown.Item>Videos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Text>
            <a href="https://evalview.club">
              {" "}
              <img
                style={{ maxWidth: "3.5rem" }}
                src={Exit}
                alt="Logout-icon"
              />{" "}
              Exit the App
            </a>
          </Navbar.Text>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
