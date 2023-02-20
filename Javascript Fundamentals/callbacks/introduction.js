// what is a callback function
// A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

// examples of callbacks in js
// map is a higher order function. It takes a callback function as an argument.
const arr = [1, 2, 3, 4, 5];

const callback = (item) => {
  return item * 2;
}

const res = arr.map(callback)
console.log(res)

// other examples
// filter
// reduce
// forEach

// requirements: hoisting, how to define function

// what is hoisting 
// Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function).

const something = myFunction();
console.log(something);

function myFunction() {
  return 'hello world';
}

// default of controlling how functions are executed

// JavaScript functions are executed in the sequence they are called. Not in the sequence they are defined.

function displaySecond() {
  return 'I am second';
}

function displayFirst() {
  return 'I am first';
}


console.log(displayFirst());
console.log(displaySecond());


// further examples
// function displayResult(result) {
//  return result;
// }

// function add(num1, num2) {
//   return num1 + num2;
// }

// const result = add(5, 5);
// console.log(displayResult(result));

// the problem with this implementation is that I had to call two function to display the result

// function displayResult(result) {
//   return result;
// }

function add(num1, num2) {
  const sum = num1 + num2;
  return displayResult(sum);
}

console.log(add(5, 5));

// the problem with this implementation is that I cannot prevent the add function from displaying the result

// we can solve this by using the concept of callbacks


