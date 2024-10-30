// src/store.js
import { createStore } from 'redux';

// Define the initial state
const initialState = {
  user: {
    userID: null,
    email: '',
    username: '',
    isAdmin: '',
    profilePicture: '',
  },
};

// Create a reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Reducer payload:', action.payload);
      return {
        ...state,
        user: {
          userID : action.payload.userID,
          email: action.payload.email,
          username: action.payload.username,
          isAdmin: action.payload.isAdmin,
          profilePicture: action.payload.profilePicture,
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
