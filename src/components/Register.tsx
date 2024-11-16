import React, { FC, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import API_KEY from "./api/api_key";

interface form {
  email: string;
  userName: string;
  phone: string;
  password: string;
}

const initialForm: form = {
  userName: "",
  email: "",
  phone: "",
  password: "",
};

const Register: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("RegisterContext must be used within a RegisterProvider");
  }

  const { state, dispatch } = context;

  const [registerForm, setRegisterForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const errorHandling = (): boolean => {
    if (registerForm.userName.length < 3) {
      setErrorMsg("User Name must be greatherthan 3 Characters");
      return false;
    } else if (registerForm.phone.toString().length !== 10) {
      setErrorMsg("Phone Number mustbe 10 characters only");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      setErrorMsg("Email is not a valid format");
      return false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
        registerForm.password
      )
    ) {
      setErrorMsg(
        "Password must contain UpperCase, LowerCase, Digit and symbol"
      );
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = errorHandling();
    if (isValid) {
      dispatch({
        type: "ADD_USER",
        payload: registerForm,
      });
      setSubmitted(true);
      setRegisterForm(initialForm);
      setSuccessMsg("User Created Succesfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (submitted) {
      axios
        .post(`${API_KEY}/users`, {
          ...state.register,
          id: String(Date.now()),
        })
        .then((response) => {
          console.log("Data submitted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        })
        .finally(() => setSubmitted(false)); // Reset submission flag
    }
  }, [state.register, submitted]);

  return (
    <div>
      <form className="login-form" onSubmit={submitHandler}>
        <p className="login-text">
          <span className="fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x" />
            <i className="fa fa-user fa-stack-1x" />
          </span>
        </p>
        <input
          type="text"
          className="login-username"
          autoFocus={true}
          placeholder="User Name"
          name="userName"
          onChange={(e) => changeHandler(e)}
          value={registerForm.userName}
        />
        <input
          type="tel"
          className="login-username"
          placeholder="Phone Number"
          name="phone"
          onChange={(e) => changeHandler(e)}
          value={registerForm.phone}
        />
        <input
          type="text"
          className="login-username"
          placeholder="Email"
          name="email"
          onChange={(e) => changeHandler(e)}
          value={registerForm.email}
        />
        <input
          type="password"
          className="login-password"
          placeholder="Password"
          name="password"
          onChange={(e) => changeHandler(e)}
          value={registerForm.password}
        />
        <input
          type="submit"
          name="Login"
          defaultValue="Login"
          className="login-submit"
        />
      </form>
      {errorMsg && <p className="error text-center">{errorMsg}</p>}
      {successMsg && <p className="success text-center">{successMsg}</p>}
      <Link to="/login" className="login-forgot-pass">
        Already Have an Account? Login Here
      </Link>
      <div className="underlay-photo" />
      <div className="underlay-black" />
    </div>
  );
};

export default Register;
