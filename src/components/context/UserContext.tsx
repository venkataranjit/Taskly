import React, { createContext, useReducer, ReactNode } from 'react';
import { userReducerFunction, initialState } from '../reducers/userReducer';

interface UserContextType {
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducerFunction, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
