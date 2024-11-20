import React, { FC, useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "./context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const logoutUser = {
  id: "",
  userName: "",
  email: "",
  phone: "",
  password: "",
  loggedIn: false,
};
const NavBar: FC = () => {
  const [expanded, setExpanded] = useState(false);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("RegisterContext must be used within a RegisterProvider");
  }

  const { dispatch } = context;
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
      type: "LOGOUT_USER",
      payload: logoutUser,
    });
    setExpanded(false);
    navigate("/login");
  };

  const handleLinkClick = () => {
    setExpanded((prev) => !prev); // Collapse the Navbar
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" expanded={expanded}>
        <Container>
          <Navbar.Brand as={NavLink} to="/home" onClick={handleLinkClick}>
            Taskly
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded((prev) => !prev)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home" onClick={handleLinkClick}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/addtodos" onClick={handleLinkClick}>
                Add Task
              </Nav.Link>
              <Nav.Link as={NavLink} to="/todos" onClick={handleLinkClick}>
                Pending Tasks
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/completedtodos"
                onClick={handleLinkClick}
              >
                Completed Tasks
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                as={Button}
                onClick={logout}
                className="logout text-start"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
