// Palindromic Substring
// Have the function PalindromicSubstring(str) take the str parameter being passed and find the longest palindromic substring, which means the longest substring which is read the same forwards as it is backwards. For example: if str is "abracecars" then your program should return the string racecar because it is the longest palindrome within the input string.

// The input will only contain lowercase alphabetic characters. The longest palindromic substring will always be unique, but if there is none that is longer than 2 characters, return the string none.
// Examples
// Input: "hellosannasmith"
// Output: sannas
// Input: "abcdefgg"
// Output: none

// function PalindromicSubstring(str) {
//   let longest = '';
//   for (let i = 0; i < str.length; i++) {
//     for (let j = i + 1; j < str.length; j++) {
//       let substring = str.slice(i, j);
//       if (substring === substring.split('').reverse().join('')) {
//         if (substring.length > longest.length) {
//           longest = substring;
//         }
//       }
//     }
//   }
//   return longest.length > 2 ? longest : 'none';
// }

function PalindromicSubstring(str) {
  let T = preprocess(str);
  let n = T.length;
  let P = new Array(n).fill(0);
  let C = 0,
    R = 0;
  for (let i = 1; i < n - 1; i++) {
    let i_mirror = 2 * C - i;
    if (R > i) P[i] = Math.min(R - i, P[i_mirror]);
    else P[i] = 0;
    try {
      while (T[i + 1 + P[i]] === T[i - 1 - P[i]]) P[i]++;
    } catch (e) {}
    if (i + P[i] > R) {
      C = i;
      R = i + P[i];
    }
  }
  let longestPalindrome = '';
  let maxLen = 0;
  for (let i = 1; i < n - 1; i++) {
    if (P[i] > maxLen) {
      maxLen = P[i];
      centerIndex = i;
    }
  }
  if (maxLen > 2) {
    let start = (centerIndex - 1 - maxLen) / 2;
    longestPalindrome = str.substring(start, start + maxLen);
  }
  return maxLen > 2 ? longestPalindrome : 'none';
}

function preprocess(str) {
  let n = str.length;
  if (n === 0) return '^$';
  let ret = '^';
  for (let i = 0; i < n; i++) ret += '#' + str[i];
  ret += '#$';
  return ret;
}

console.log(PalindromicSubstring('abcdefgg'));

console.log(PalindromicSubstring('hellosannasmith')); // sannas;
console.log(PalindromicSubstring('abcdefgg')); // sannas;
