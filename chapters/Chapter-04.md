# Part IV

## Redux: Avoiding Array Mutations with concat(), slice(), and ...spread

### Notes

In this lesson Expect Library is used for test assertions and Deep-Freeze is used to ensure code is free of mutations.

Let's implement a counter and release application. We need to write a few functions that operate on its state, and its state is an array of JavaScript numbers, representing the individual counters.

The first function is called Add Counter which should only append a zero at the end of the past array.

```js
const addCounter = (list) => {
  list.push(0);
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];
  expect(addCounter(listBefore)).toEqual(listAfter);
};
testAddCounter();
console.log('All tests passed.');
```

At first, the push array method is used to add a new item at the end of the array and it works. However, we need to learn to avoid mutations in Redux and we can enfore this by calling deepFreeze on the original array:

```js
const addCounter = (list) => {
  list.push(0);
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
};

testAddCounter();
console.log('All tests passed.');
```

This gives an "error", specifically a "TypeError: Can't add property 0, object is not extensible".

Now our attempt to "push" does not work as push causes a MUTATION. It cannot add a new property to a frozen object. Instead of push, let's use the concat() method which DOES NOT modify the original array.

```js
const addCounter = (list) => {
  return list.concat([0]);
};

// Console: "All tests passed."
```

Now all the tests pass without mutations.

We can also use the new ES6 spread operator to write the same code in a more concise way.

```js
const addCounter = (list) => {
  return [...list, [0]];
};
```

Our next function is called Remove Counter and it accepts two arguments, an array of numbers and the inde of the number to skip from the array.

Thus, if we have three numbers, and we are passing one as the second argument, I expect to recieve an array with two numbers with a second item skipped in the result of the array.

Usually, to delete an item, we would use the splice() array method:

```js
const removeCounter = (list, index) => {
  list.splice(index, 1);
  return list;
};
```

```js
const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};
```

However, the splice() array method is a MUTATION, thus, we cannot use it in Redux.

Let's deep freeze the object like we did before, and figure out a different way to remove an item from the array without mutating it.

We can use the array method slice(), which has nothing to do with splice() and it does not mutate the original array. It gives us a part of the original array from some beginning and some end index.

We will take the parts before the index we want to skip and the part afte the index we want to skip and we can concat them to get a new array:

```js
const removeCounter = (list, index) => {
  return list
  .slice(0, index)
  .concat.(list.slice(index + 1));
```

Finally, instead of writing this with a method chain of concat calls, we can use the ES6 array spread operator:

```js
const removeCounter = (list, index) => {
  return [
  ...list.slice(0, index)
  ...list.slice(index + 1)
  ];
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};
```

Now that we have implemented adding and removing counters, let's implement incrementing the counter.

The increment counter function takes two arguments, the array and the index of the counter the counter that should be incremented. Thus, the return value has the same count of items, but one of them is incremented.

Directly setting the array value at index works, however, this is a mutation. If we add a deepFreeze call, it will no longer work.

```js
const incrementCounter = (list, index) => {
  list[index]++;
  return list;
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  constlistAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

testIncrementCounter();
```

How do we replace a single value in the array without mutating it? It turns out the answer is similiar to how we remove an item.

We want to take the slice before the index and concat it with a single item array with a new value and then concat it with the rest of the original array.

```js
const incrementCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat([list[index] + 1])
    .concat(list.slice(index + 1));
};
```

Finally, with the ES6 spread operator, we can spread over the left part of the array, specify the new item, and then spread over the right part of the orignal array. This looks more concise.

```js
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1):
  ];
};
```

In this lesson we learned how to use the concat method or the spread operator and the slice method to add, remove, and change items in arrays without mutating them. We also learned how to protect our code with deepFreeze from mutation in our tests.
