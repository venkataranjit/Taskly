import React, { FC, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import API_KEY from "./api/api_key";
import Heading from "./Heading";
import Loader from "./Loader";

interface form {
  email: string;
  password: string;
}
const initialForm: form = {
  email: "",
  password: "",
};
const Login: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("RegisterContext must be used within a RegisterProvider");
  }

  const { dispatch } = context;

  const [loginForm, setLoginForm] = useState(initialForm);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const loginFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_KEY}/users`);
      const user = response.data.find(
        (u: { email: string; password: string }) =>
          u.email === loginForm.email && u.password === loginForm.password
      );

      if (user) {
        dispatch({ type: "LOGIN_USER", payload: user });
        setLoginError(null);
        navigate("/addtodos");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error: any) {
      setLoginError("An error occurred while logging in" + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        setLoginError(
          "Server is taking longer than expected to respond. Please wait..."
        );
      }, 100000);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form className="login-form" onSubmit={loginFormSubmitHandler}>
            <Heading />
            <p className="login-text">
              <span className="fa-stack fa-lg">
                <i className="fa fa-circle fa-stack-2x" />
                <i className="fa fa-lock fa-stack-1x" />
              </span>
            </p>
            <input
              type="text"
              className="login-username"
              autoFocus={true}
              placeholder="Email"
              name="email"
              value={loginForm.email}
              onChange={changeHandler}
            />
            <input
              type="password"
              className="login-password"
              placeholder="Password"
              name="password"
              value={loginForm.password}
              onChange={changeHandler}
            />
            <input
              type="submit"
              name="Login"
              defaultValue="Login"
              className="login-submit"
            />
          </form>
          {loginError && <p className="error text-center">{loginError}</p>}
          <Link to="/register" className="login-forgot-pass">
            Register User
          </Link>
          <div className="underlay-photo" />
          <div className="underlay-black" />
        </>
      )}
    </>
  );
};

export default Login;
