const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const { createStore } = Redux;
// equivalent to:
// var createStore = Redux.createStore;
// import { createStore } from 'redux';

// The store binds together the three principles of Redux.

// 1. It holds the current applicaiton state object.

// 2. It let's you dispatch actions.

// 3. When you create it, you need to specify the reducer that tells how state is updated with actions.
