// const map = new Map();
// const set = new Set();

// console.log(typeof map);
// console.log(typeof set);

/** Definition */
// what is a map
// a map is a collection of keyed data items
// a map is different from an object because it allows us to use any type of key

const data ={
  "name": "map",
  "age": 30,
  1: "hello"
  // "{"name": "map", "age": 30}": "hello"
}

console.log(Object.keys(data))
//name is the key
//map is the value

// "long string".join()

// data.name

// why do we need map
// getting the keys from an object always returns a string.

//how to declare a map
// we can declare a map using the map constructor
// we can also declare a map using the map literal syntax

// using a constructor example
const map1 = new Map(
 [
  ['name', 'john'],
  ['age', 30],
  [true, 'hello'],
  [1, 'how are you'],
  [function(){}, 'goodbye']
 ]
);

console.log(map1);

// using a map literal syntax
const map2 = new Map();

map2.set('name', 'john');
map2.set('age', 30);
map2.set(true, 'hello');
map2.set(function toString(){}, 'goodbye');

map2.values
map2.forEach

