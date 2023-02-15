// what is a map in js
// a map is a collection of keyed data items
// it is a data structure that stores unique keys and their values
// it is a collection of values that cannot contain duplicates

// how to create a map
// we can create a map using the map constructor
// we can also create a map using the map literal syntax

// using a constructor example
const map1 = new Map();

// using a map literal syntax
const map2 = new Map([['a string', 'hello'], [1, 'how are you'], [true, 'goodbye']]);
console.log(map2);

// adding values to a map
// we can add values to a map using the set method
// we can also add values to a map using the map literal syntax

// using the set method
map1.set('a string', 'hello');
map1.set(1, 'how are you');

// using the map literal syntax
const map2 = new Map([['a string', 'hello'], [1, 'how are you'], [true, 'goodbye']]);
console.log(map2);

// maps can use any type of key
// we can use any type of key in a map
// we can use strings, numbers, booleans, objects, arrays, functions, etc.

