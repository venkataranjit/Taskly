import React, { FC, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import axios from 'axios';

interface form {
  email: string;
  password: string;
}
const initialForm: form = {
  email: '',
  password: '',
};
const Login: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('RegisterContext must be used within a RegisterProvider');
  }

  const { state, dispatch } = context;

  const [loginForm, setLoginForm] = useState(initialForm);
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const loginFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3005/users');
      const user = response.data.find(
        (u: { email: string; password: string }) =>
          u.email === loginForm.email && u.password === loginForm.password,
      );

      if (user) {
        dispatch({ type: 'LOGIN_USER', payload: user });
        setLoginError(null);
        navigate('/home');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login Failed:', error);
      setLoginError('An error occurred while logging in');
    }
  };

  return (
    <>
      <div>
        <form className='login-form' onSubmit={loginFormSubmitHandler}>
          <p className='login-text'>
            <span className='fa-stack fa-lg'>
              <i className='fa fa-circle fa-stack-2x' />
              <i className='fa fa-lock fa-stack-1x' />
            </span>
          </p>
          <input
            type='text'
            className='login-username'
            autoFocus={true}
            placeholder='Email'
            name='email'
            value={loginForm.email}
            onChange={changeHandler}
          />
          <input
            type='password'
            className='login-password'
            placeholder='Password'
            name='password'
            value={loginForm.password}
            onChange={changeHandler}
          />
          <input
            type='submit'
            name='Login'
            defaultValue='Login'
            className='login-submit'
          />
        </form>
        {loginError && <p className='error text-center'>{loginError}</p>}
        <Link to='/register' className='login-forgot-pass'>
          Register User
        </Link>
        <div className='underlay-photo' />
        <div className='underlay-black' />
      </div>
    </>
  );
};

export default Login;
