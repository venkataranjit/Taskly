export const initialState = {
  addTodo: {
    todoTitle: '',
    todoDescription: '',
    priority: '',
  },
};
export const todoReducerFunction = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        addTodo: { ...state.addTodo, ...action.payload },
      };

    default:
      return state;
  }
};
