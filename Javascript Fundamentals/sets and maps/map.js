// const map = new Map();
// const set = new Set();

// console.log(typeof map);
// console.log(typeof set);

/** Definition */
// what is a map
// a map is a collection of keyed data items
// a map is different from an object because it allows us to use any type of key

const data = {
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

/** Map Methods */
// get()	Gets the value for a key in a Map
console.log(map2.get('name'));

// clear()	Removes all the elements from a Map
// console.log(map2.clear());
// console.log(map2)

// size	Returns the number of elements in a Map
console.log(map2.size)

// delete()	Removes a Map element specified by a key
// console.log(map2.delete('name'));
// console.log(map2.get('name'))

// has()	Returns true if a key exists in a Map
console.log(map2.has('name'));
console.log(map2.has('age'));

// forEach()	Invokes a callback for each key/value pair in a Map
console.log(
  map2.forEach((value, key) => {
    console.log(key);
    console.log('>>>>>>');
    console.log(value);
  })
)

// entries()	Returns an iterator object with the [key, value] pairs in a Map
console.log((Array.from(map2.entries())));

// keys()	Returns an iterator object with the keys in a Map
console.log((Array.from(map2.keys())));

// values()	Returns an iterator object of the values in a Map
console.log((Array.from(map2.values())));

