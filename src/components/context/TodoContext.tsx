import React, { createContext, useReducer, ReactNode } from 'react';
import { todoReducerFunction, initialState } from '../reducers/todoReducer';

interface TodoContextType {
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

interface TodoProviderProps {
  children: ReactNode;
}
export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducerFunction, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
