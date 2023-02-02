// typeof	Returns the type of a variable
// instanceof	Returns true if an object is an instance of an object type


const num = typeof 3 // number

const str = typeof '3' // string

const bool = typeof true // boolean
console.log(bool)

const undef = typeof undefined // undefined

const non = typeof null // object
console.log(non)

const obj = typeof {} // object

let arr = typeof [] // object (array is an object)

const func = typeof function(){} // function
console.log(func)

const nan = typeof NaN // number

// instanceof
// arr = [1, 2, 3, 4, 5, true, 'string', {}, []];
// let strstr = 'string';
// const arr2 = [1, 2, 3, 4, 5, true, 'string', {}, []];
// console.log(arr instanceof Array) // true
// console.log(arr instanceof Object) // true
// // console.log(arr2 instanceof {}); // true
// console.log(arr instanceof String) // false
// console.log(arr instanceof Number) // false
// console.log(arr instanceof Boolean) // false
// console.log(strstr instanceof Array) // false

// practical example
arr = [1, 2, 3, 4, 5, true, 'string', {}, []];
for (let i = 0; i < arr.length; i++) {
 console.log(arr[i])
 if (arr[i] instanceof Number) {
  console.log(arr[i])
  arr[i] = 'I have changed to something else'
  console.log(arr[i])
 }

  console.log(arr[i] instanceof Array) // false
  console.log(arr[i] instanceof Object) // true
  console.log(arr[i] instanceof String) // false
  console.log(arr[i] instanceof Number) // false
  console.log(arr[i] instanceof Boolean) // false
}
console.log(arr)
