# Fundamentals of Redux Course from Dan Abramov

## 1st Principle of Redux

The whole state is represented as a single javascript object.

All mutations and changes to the state in Redux are explicit so it is possible to keep track of all of them.

Everything that changes in your application including the data and the UI state is contained in a single object which we call the state or the state tree.

## 2nd Principle of Redux

The state tree is redundant, you cannot modify or write to it. Instead, anytime you want to change the state you need to dispatch an action.

An action is a plain javascript object describing the change, just like the state is the minimal representation of the data in your app. The action is the minimal representation of the change to that data.

The structure of the action object is up to you. The only requirement is that it has a type property, _which is not undefined_. Strings are recommended because they are serializable.

### A note on Pure Functions

All Functions in Redux need to be Pure Functions. Pure functions are functions whose return value relies solely on the value of its arguments. Pure functions do not have any observable side effects, such as network or database calls. Pure functions just calculate the new value and you can be confident you will always get the same result when using the same arguments. Thus, when you call the function using the same arguments, you will always get the same result.

Some of the functions you write in Redux need to be pure, thus, be mindful of this.

## 3rd Principle of Redux

The state mutations in your app need to be described as a pure function that takes the previous state of the app and the action being dispatched and returns the next state of the application.

Inside any Redux application there is one particular function that takes the state of the whole application and the action being dispatched and returns the next state of the whole application. It is important that it does not modify the state that is given to it, it has to be pure, thus it has to return a new object.

To describe state mutations, you have to write a function that takes the previous state of the application, the action being dispatched, and returns the next state of the app, and this function has to be pure.

This function is called _The Reducer_.

```js
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

expect(counter(0, { type: 'INCREMENT' })).toEqual(1);

expect(counter(1, { type: 'INCREMENT' })).toEqual(2);

expect(counter(2, { type: 'DECREMENT' })).toEqual(1);

expect(counter(1, { type: 'DECREMENT' })).toEqual(0);

expect(counter(1, { type: 'SOMETHING_ELSE' })).toEqual(1);

expect(counter(undefined, {})).toEqual(0);

console.log('Tests passed!');
```

Now convert the above code using switch statements and es6 arrow function:

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

expect(counter(0, { type: 'INCREMENT' })).toEqual(1);

expect(counter(1, { type: 'INCREMENT' })).toEqual(2);

expect(counter(2, { type: 'DECREMENT' })).toEqual(1);

expect(counter(1, { type: 'DECREMENT' })).toEqual(0);

expect(counter(1, { type: 'SOMETHING_ELSE' })).toEqual(1);

expect(counter(undefined, {})).toEqual(0);

console.log('Tests passed!');
```

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

const { createStore } = Redux;
// equivalent to:
// var createStore = Redux.createStore;
// import { createStore } from 'redux';
```

The store binds together the three principles of Redux.

1. It holds the current applicaiton state object.

2. It let's you dispatch actions.

3. When you create it, you need to specify the reducer that tells how state is updated with actions.

```js
const { createStore } = Redux;
// var createStore = Redux.createStore;
// import { createStore } from 'redux';
const store = createStore(counter);
```

In this example we are calling createStore with counter as the reducer that manages the state updates. The store has three important methods.

The store has three important methods.

The first method is called getState() and it retrieves the current state of the redux store.

```js
console.log(store.getState()); // 0
```

The second method (most commonly used) is called dispatch. It lets you dispatch actions to change the state of your application.

```js
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // 1
```

The third method is called subscribe. It lets you register a callback that that the redux store will call anytime an action has been dispatched. This allows you to update the UI of your application to reflect the current applications state.

```js
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```
