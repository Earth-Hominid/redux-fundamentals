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
