# Part V

## Redux: Avoiding Object Mutations with Object.assign() and ...spread

### Notes

Testing a Toggle Example. We are using Deep Freeze and Expect libraries from NPM.

This first example will pass the current test. It is a mutated version which will flip the completed field and reassigns it on the previous object.

```js
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true,
  }

  expect(
    toggleTodo(todoBefore).toEqual(todoAfter);
  );

  testToggleTodo();
  console.log('All tests passed.');
}
```

However, when we add in the Deep Freeze check, it will fail. We know mutations are not allowed in Redux. When we call deepFreeze, the completed field is not allowed to change.

```js
deepFreeze(todoBefore);
```

To ensure mutations do not occur, it is encouraged to use the Object Assign method which is new in ES6.

```js
const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed,
  });
};
```

The left argument is the one whose properties are going to be assigned, so it's going to be mutated. This is why we're passing an empty object as the first argument, so we don't mutate any existing data. Every further argument to object assign will be considered one of the source objects whose properties will be copied to the target object.

It is important that if several sources specify different values for the same property, the last one wins. This is what we use to override the completed field despite what the original to-do object says.

Finally, you need to remember that object assign is a new method in ES6, so it is not natively available in all the browsers. You should use a polyfill, either the one that ships with Babel or a standalone object assign polyfill, to use it without risking crashing your website.

You can also use the object spread operator from ES7:

```js
const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed,
  };
};
```
