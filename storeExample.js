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

const store = createStore(counter);

// In this example we are calling createStore with counter as the reducer that manages the state updates. The store has three important methods.

// The store has three important methods.

// The first method is called getState() and it retrieves the current state of the redux store.

console.log(store.getState()); // 0

// The second method (most commonly used) is called dispatch. It lets you dispatch actions to change the state of your application.

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // 1

// The third method is called subscribe. It lets you register a callback that that the redux store will call anytime an action has been dispatched. This allows you to update the UI of your application to reflect the current applications state.

js;
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
