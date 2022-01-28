# Part III

## A REACT COUNTER

Using the code from the previous chapter, recall our counter example:

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

Also recall our redux store code:

```js
const createStore = Redux;
const store = createStore(counter);
```

The counter component is a 'dumb' component. It does not contain any business logic.

It only specifies how the current application state transforms into renderable output and how the callbacks, passed via props are bound to the even handlers.

```js
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);
```

We need to pass the value of store into our root component.

```js
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT',
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT',
        })
      }
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
```

When we render a counter, we specify that its value should be taken from the Redux store current state.

Our reducer specifies how the next state is calculated based on the current state and the action being dispatched.

Finally, we subscribe to the Redux store so our render function runs anytime the state changes so the counter gets the current state.
