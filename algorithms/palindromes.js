/**
 * what is a palindrome?
 * A palindrome is a word, phrase, or sequence of characters that reads the same backward as forward. For example, "racecar" and "level" are palindromes. In computer science, there are several algorithms for detecting palindromes. Here are a few examples:
 * 1. reverse the string and compare it to the original string
 * the time complexity of this algorithm is O(n) - this is because the size of the input affects the time taken to execute the algorithm.
 * @return {boolean} true if the string is a palindrome, false otherwise
 * @methods .split() this would convert the string into an array, .reverse() this would reverse the order of the items in an array, .join() this would convert an array into a string
 */
// function isPalindrome(str) {
//   const arr = str.split("");
//   // console.log(arr);
//   const reversedArr = arr.reverse();
//   // console.log(reversedArr);
//   // console.log(arr === reversedArr);
//   const reversedStr = reversedArr.join("");
//   // console.log(reversedStr);
//   // console.log(str === reversedStr);
//   return str === reversedStr;
// }

function isPalindrome(str) {
  return str === str.split("").reverse().join(""); // chaining methods
}
 
// console.log(isPalindrome("racecar"));

// console.log(isPalindrome("amanaplanacanalpanama"));

/**
 * @Description - how to implement .split() this method converts a string into an array
 * @param {string} str - the string to be split
 * @return {array} - the array that is created from the string
 * @steps 
 * 1. create an empty array
 * 2. loop through the string
 * 3. push each character into the array
 */

function split(str) {
  const arr = []
  for (const char of str) {
   console.log(char)
    arr.push(char)
  }
  return arr
}

const StringToReverse = split("hello")
console.log(StringToReverse)
console.log(StringToReverse[4]);

/**
 * @Description - how to implement .reverse() this method reverses the order of the items in an array
 * @param {array} arr - the array to be reversed
 * @return {array} - the reversed array
 * @steps 
 * 1. create an empty array
 * 2. loop through the array from the end
 * 3. push each item into the new array
 * 4. return the new array
 * @time-complexity O(n)
 */

console.log(StringToReverse);
function reverse(arr) {
 const reversedArr = []

 // for (const item of arr) {
 //   reversedArr.unshift(item)
 // }
 for (let index = arr.length - 1; index >= 0; index--) {
   console.log(arr[index]) // 4, 3
   reversedArr.push(arr[index])
 }

 return reversedArr
}

console.log(reverse(StringToReverse))

/**
 * @Description - how to implement .join() this method converts an array into a string
 * @param {array} arr - the array to be joined
 * @return {string} - the string that is created from the array
 * @steps
 * 1. create an empty string
 * 2. loop through the array
 * 3. add each item to the string (concatenate);
 * 4. return the string
 * @time-complexity O(n)
 */