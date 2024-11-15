import React, { FC, useContext } from 'react';
import './App.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import Register from './components/Register';
import { UserContext } from './components/context/UserContext';
import UserName from './components/UserName';
import ProtectedRoute from './components/ProtectedRoute';
import MyTodos from './components/MyTodos';
import AddTodo from './components/AddTodo';
const App: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('RegisterContext must be used within a RegisterProvider');
  }

  const { state } = context;

  return (
    <>
      <HashRouter>
        {state.login.loggedIn && <NavBar />}
        {state.login.loggedIn && <UserName />}

        <Container>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route
              path='/home'
              element={
                <ProtectedRoute loggedIn={state.login.loggedIn}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='/addtodos'
              element={
                <ProtectedRoute loggedIn={state.login.loggedIn}>
                  <AddTodo />
                </ProtectedRoute>
              }
            />
            <Route
              path='/todos'
              element={
                <ProtectedRoute loggedIn={state.login.loggedIn}>
                  <MyTodos />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
