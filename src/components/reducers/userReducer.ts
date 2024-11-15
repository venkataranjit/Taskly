export const initialState = {
  register: {
    userName: '',
    email: '',
    phone: '',
    password: '',
  },
  login: {
    userName: '',
    email: '',
    phone: '',
    password: '',
    id: '',
    loggedIn: false,
  },
};
export const userReducerFunction = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        register: { ...state.register, ...action.payload },
      };
    case 'LOGIN_USER':
      return {
        ...state,
        login: { ...state.register, ...action.payload, loggedIn: true },
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        login: { ...state.register, ...action.payload },
      };
    default:
      return state;
  }
};
