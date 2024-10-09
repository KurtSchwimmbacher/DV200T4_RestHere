// src/store.js
import { createStore } from 'redux';

// Define the initial state
const initialState = {
  user: {
    username: null,
    isAdmin: false,
  },
};

// Create a reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          username: action.payload.username,
          isAdmin: action.payload.isAdmin,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: initialState.user,
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;
