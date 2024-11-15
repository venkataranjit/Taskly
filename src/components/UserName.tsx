import React, { FC, useContext } from 'react';
import { UserContext } from './context/UserContext';

const UserName: FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('RegisterContext must be used within a RegisterProvider');
  }

  const { state } = context;
  return (
    <>
      <div className='mb-3 username'>
        <p className='container'>Welcome {state.login.userName}</p>
      </div>
    </>
  );
};

export default UserName;
