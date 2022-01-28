# Part II

In the Part One we looked at:

- How to implement a simple counter example using the createStore function provided by Redux.

- The store object which createStore returns and the methods that store provides:

  - getState() method to get the current applications state.

  - dispatch() method which is used to change the current applications state by dispatching an action.

  - subscribe() method is used to subscribe to the changes and re-render our application with the current state of the app.

We are going to dive in under the hood to understand the tools that we are using. In this tutorial we are going to re-implement the createStore() function provided by Redux from scratch.

```js
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
```

The first argument we know is the reducer function is provided to createStore as an argument. We also know that the store holds the current state so we can keep it in a variable.

```js
const createStore = (reducer) => {};
```

The getState() function is going to return the current value of the variable.

```js
const createStore = (reducer) => {
  let state;

  const getState = () => state;
};
```

When the getState() function is combined with the dispatch() function and the subscribe() function on a single object is called _The Redux store_.

```js
const createStore = (reducer) => {
  let state;

  const getState = () => state;

  const dispatch = (action) => {};

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return { getState, dispatch, subscribe };
};
```

The subscribe method can be called many times, thus, we need to keep track of all the change listeners, and anytime it is called we want to push the new listener into the array.

```js
const subscribe = (listener) => {
  listeners.push(listener);
};
```

Dispatching an action is the only way to change the internal state and in order to calculate the new state we call the reducer with the current state and the action being dispatched.

```js
const dispatch = (action) => {
  state = reducer(state, action);
  listeners.forEach((listener) => listener());
};
```

After the state is updated, we need to notify every change listener by call it. There is an important missing piece as we have not provided a way to unsubscribe a listener.

Instead of adding a dedicated unsubscribe method, we can simply return a function from the subscribe() method that removes this listener from the listener's array.

```js
const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
```

Finally, by the time the store is returned we want to have the initial state populated so we are going to dispatch a dummy action just to get the reducer too return the inital value.

This implementation of the Redux store, apart from a few minor details and edge cases is the createStore which is shipped with Redux.

```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```
