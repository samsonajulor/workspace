// using sets to remove duplicate data

const arr = ['one', 'one', 'two']
// const result = ['one', 'two']

// const obj = {}

// for (const data of arr) {
//   obj[data] = data
// }

// console.log(Object.keys(obj))

// // 1. initialize a set using the Set constructor

const set = new Set(arr)
console.log(Array.from(set))

set.add('five')
set.delete('one')
console.log(set.size)
set.forEach((value) => {
  console.log(value);
})