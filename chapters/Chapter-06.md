# Part VI

## Redux: Writing a Todo List Reducer (Adding a Todo)

### Notes

In this lesson, we create the reducer for a to-do list application whose state is described as an array of to-dos.

Remember, a reducer is a pure function written to implement the update logic of your application -- that is, how the next state is calculated given the current state and the action being dispatched.

Firstly, the test is written to ensure the reducer is working correctly.

```js
const todos = (state = [], action) => {

};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0;
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
};

testAddTodo();
console.log('All tests passed.');
```

Before writing the reducer, we need a test for it. Two variables are declared, the state before which is an empty array, and the action being dispatched, which is an action describing user adding any to-do with some ID and a text.

The state we expect to get after calling the reducer is declared. Similar to state before, it is an array, however, it has a single element representing the to-do that was just added. It has the same ID and text as the action object but it also has an additional field called, "completed," which is initialized false.

To ensure the reducer is a pure function, we call deep freeze both on the state and the action.

The expect library is used to verify that when called, the to-do reducer with the state before and the action object, the result that is deeply equal to the state after declaration exists.

This concludes my first test. Now we can call it just like a regular JavaScript function. If it doesn't throw in the expect call, we will see a message saying that the tests have passed.

Of course, it fails because the reducer is not implemented yet. It's an empty function. So it returns undefined instead of the array with a single item that we expect in the test.

To fix this, we need the reducer to take a look at the action type property, which is a string. When it matches the at to-do string, which we specify as the action type in the test, to satisfy the test we need to return a new array which includes all items from the original array but also a new to-do item that has its ID and text copied from the action object and a completed field set to false.

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    default:
      return state;
  }
};
```

Now the test runs successfully. Let's recap the data flow to see why.

Firstly, we created the state array, which is empty, and the action object and we put them inside the test function. We are passing these as arguments to the reducer function which we call "const todos". Our todo reducer function accepts the state and the action object as arguments and it looks a the action type.

The action type is the string 'ADD_TODO', and it matches the switch case insdie the reducer. The reducer returns a new array which contains the items from the old array and the new item representing the added to-do.

However, the state we passed from the test was an empty array, thus, we receive an array with a single item, which is the new to-do.

Finally, we compare the return value to an array witha single to-do item to make sure that the reducer works as intended. The equality check passes and our test is successful.
