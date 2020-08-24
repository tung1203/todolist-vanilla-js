let initialState = [
  {
    completed: false,
    description: "34",
    from: "2020-08-01T15:52",
    id: 1598259171894,
    title: "12",
    to: "2020-08-08T15:52",
  },
];
let todos = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { ...action.payload }];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    case "HISTORY_TODO":
      return state
    default:
      return state;
  }
};
export default todos;
