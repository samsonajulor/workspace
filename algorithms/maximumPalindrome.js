/**
 * @Problem: Given a string and two indexes, find the number of longest palindromes to MOD 1000000000 + 7 that can be extracted from the substring formed from the indexes.
 * @param {string} str
 * @param {number} start
 * @param {number} end
 * @return {number} - the number of longest palindromes to MOD 1000000000 + 7 that can be extracted from the substring formed from the indexes
 * 
 * @Example:
 * Input: "madamimadam", start = 4, end = 7
 * if s = madamimadam , start = 4 and end = 7 , then we have, 'a' as the fourth character and 'm' as the seventh character...which gives 'amim' which gives two palindromes mam and mim with max length of 3. Therefore the number of palindromes with max length is 2
 * Output: 2 MOD 1000000000 + 7
 * 
 * How to check the number of palindromes that can be gotten from a given string?
 * 
 * @Solution:
 * 1. Extract the substring from the given string using the indexes
 * 2. Loop through the substring and store the characters in pairs of twos if possible or just single characters if not possible
 * 3. Calculate the total number of even pairs
 * 4. Calculate the total number of odd pairs
 * 5. The number of longest palindromes is the total number of even pairs multiplied by the total number of odd pairs
 */

function longestPalindrome(str, start, end) {
 // Extract the substring from the given string using the indexes
 const substr = str.substring(start - 1, end);
 console.log(substr);
 let totalEvenPairs = 0;
 let totalOddPairs = 0;
 let stringPairsAndCount = []; // this will store the pairs and the number of times they occur e.g [[m, m], [i], [a]]

 // loop through the string and store the characters in pairs of twos if possible or just single characters if not possible
 for (const letter of substr) {
  // check if the letter is already in the array
  const index = stringPairsAndCount.findIndex((pair) => pair[0] === letter && pair.length < 2);
  if (index === -1) {
   // letter is not in the array
   stringPairsAndCount.push([letter]);
  } else {
   // letter is in the array
   stringPairsAndCount[index].push(letter);
  }
 }
 // calculate the total number of even pairs and the total number of odd pairs
 for (const pair of stringPairsAndCount) {
  if (pair.length === 2) {
   totalEvenPairs++;
  } else {
   totalOddPairs++;
  }
 }
 // the number of longest palindromes is the total number of even pairs multiplied by the total number of odd pairs
 return (totalEvenPairs * totalOddPairs) % (1000000000 + 7);
}

console.log(longestPalindrome("madamimadam", 4, 7));