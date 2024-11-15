import React, { FC, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const logoutUser = {
  id: '',
  userName: '',
  email: '',
  phone: '',
  password: '',
  loggedIn: false,
};
const NavBar: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('RegisterContext must be used within a RegisterProvider');
  }

  const { state, dispatch } = context;
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
      type: 'LOGOUT_USER',
      payload: logoutUser,
    });
    navigate('/login');
  };

  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand as={NavLink} to='/home'>
            Todo App
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/home'>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/addtodos'>
              Add Todo
            </Nav.Link>
            <Nav.Link as={NavLink} to='/todos'>
              My Todos
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Button} onClick={logout} className='logout'>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
