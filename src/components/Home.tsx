import React, { FC, useContext } from 'react';
import { UserContext } from './context/UserContext';

const Home: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('RegisterContext must be used within a RegisterProvider');
  }

  const { state } = context;
  console.log(state);
  return (
    <>
      <h3>Home</h3>
    </>
  );
};

export default Home;
