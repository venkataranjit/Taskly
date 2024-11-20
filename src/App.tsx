import React, { FC, useContext, lazy, Suspense } from "react";
import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./components/context/UserContext";
import Loader from "./components/Loader";
import ErrorPage from "./components/ErrorPage";

const Home = lazy(() => import("./components/Home"));
const Register = lazy(() => import("./components/Register"));
const UserName = lazy(() => import("./components/UserName"));
const AddTodo = lazy(() => import("./components/AddTodo"));
const MyTodos = lazy(() => import("./components/MyTodos"));
const CompletedTodos = lazy(() => import("./components/CompletedTodos"));

const App: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("RegisterContext must be used within a RegisterProvider");
  }

  const { state } = context;

  return (
    <>
      <HashRouter>
        <Suspense fallback={<Loader />}>
          {state.login.loggedIn && <NavBar />}
          {state.login.loggedIn && <UserName />}

          <Container>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<ErrorPage />} />
              <Route
                path="/addtodos"
                element={
                  <ProtectedRoute loggedIn={state.login.loggedIn}>
                    <AddTodo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/todos"
                element={
                  <ProtectedRoute loggedIn={state.login.loggedIn}>
                    <MyTodos userId={state.login.id} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/completedtodos"
                element={
                  <ProtectedRoute loggedIn={state.login.loggedIn}>
                    <CompletedTodos userId={state.login.id} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
          <Footer />
        </Suspense>
      </HashRouter>
    </>
  );
};

export default App;
