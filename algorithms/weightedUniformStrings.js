/**
 * weighted uniform strings
 * @param {str} - string
 * @param {queries} - array of numbers
 * @returns {array} - array of 'Yes' or 'No' depending on whether the string has a uniform subsequence of the given weight
 * methods used: set, charAt, charCodeAt
 * 
 * what is a subsequence?
 * e.g. 'hello' -> h, e, l, l, o, hello, eo,  el
 * ol - is not a subsequence of hello
 * 
 * what is a uniform subsequence?
 * e.g. 'hello' -> ll, h, e, l, l, o,
 * 
 * what is a substring?
 * e.g. 'hello' -> hel, ell, ello,
 * eo is not a substring
 * hl is not a substring
 * 
 * @example {weightedUniformStrings('abccddde', [1, 3, 12, 5, 9, 10]) // ['Yes', 'Yes', 'Yes', 'Yes', 'No', 'No']}
 * 
 * a - 1
 * b - 2
 * c - 3+3 = 6
 * d - 4 + 4 + 4 = 12
 * e - 5
 * 
 * {
 * 1,
 * 2,
 * 3
 * 6,
 * 4,
 * 8,
 * 12,
 * 5
 * }
 * steps:
Create a set to store the weights of all possible uniform subsequences in the string.

Traverse the string, keeping track of the current character and its weight.

If the current character is different from the previous character, reset the current weight to the weight of the current character and add it to the set.

If the current character is the same as the previous character, add its weight to the current weight and add the resulting weight to the set.


Repeat steps 3-4 until the end of the string is reached.

For each query of the form "is there a uniform subsequence of weight w in the string?", check if w is in the set. If it is, the answer is "Yes". Otherwise, the answer is "No".
 */

// const text = 'abccddde';

// console.log(text.charCodeAt(4) - 96);


//  * @example {weightedUniformStrings('abccddde', [1, 3, 12, 5, 9, 10]) // ['Yes', 'Yes', 'Yes', 'Yes', 'No', 'No']}
function weightedUniformStrings(str, weightQueries) {
  const weights = new Set();
  let prevChar = '';
  let currWeight = 0;

  for (const char of str) {
    if (char !== prevChar) {
      currWeight = char.charCodeAt(0) - 96;
      console.log(currWeight)
    } else {
      currWeight += char.charCodeAt(0) - 96;
      console.log(currWeight) //  1 + 1
    }
    weights.add(currWeight);
    prevChar = char;
  }
  console.log(weights);
  let result = [];
  for (const weight of weightQueries) {
    if (weights.has(weight)) {
      result.push('Yes');
    } else {
      result.push('No');
    }

    return result;
}
}
// time complexity O(n + m)
// where n is the length of the string and m is the length of the queries array.
console.log(weightedUniformStrings('abccddde', [1, 3]));

// complex solution

// function weightedUniformStrings(str, queries) {
//   // 1. create a new string from the given string by removing all the duplicate characters
//   const newStr = str.split('').filter((char, index, arr) => char !== arr[index - 1]).join('');
//   // 2. create an array of the weights of the characters in the new string
//   const newStrWeights = newStr.split('').map(char => char.charCodeAt(0) - 96);
//   // 3. create an array of the weights of the characters in the given string
//   const strWeights = str.split('').map(char => char.charCodeAt(0) - 96);
//   // 4. create an array of the weights of the uniform subsequence of the given string
//   const uniformSubsequenceWeights = strWeights.reduce((acc, weight, index, arr) => {
//     if (weight === arr[index - 1]) {
//       acc.push(weight + arr[index - 1]);
//     }
//     return acc;
//   }, []);
//   // 5. create an array of 'Yes' or 'No' depending on whether the queries array contains the weights of the uniform subsequence of the given string
//   return queries.map(query => newStrWeights.includes(query) || uniformSubsequenceWeights.includes(query) ? 'Yes' : 'No');
// }

// console.log(weightedUniformStrings('abccddde', [1, 3, 12, 5, 9, 10]));




















































































