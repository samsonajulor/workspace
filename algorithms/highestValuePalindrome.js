/**
 * @param {string} s
 * @param {number} n
 * @param {number} k
 * @return {string} - -1 if it's not possible or a string representing the largest palindrome possible.
 * 
 * @Example 1:
 * Input: s = "", k = 3
 * Output: "3993"3943
 * 
 * @Example 2:
 * Input: s = "12345", k = 3
 * Output: "54345"
 * 
 * @Steps
 * 1. convert the string into an array.
 * 2. loop through half of the array the array using index based loop.
 * 3. if the value at the current index is not equal to the value at the current index from the end of the array make the two values the same using the larger value.
 * check if the number of swaps has exceeded the number of swaps allowed. The return -1 if it has else return the array converted to a string.
 */
const highestValuePalindrome = (s, n, k) => {
 // convert the string into an array.
 let arr = s.split('');
 let len = Math.floor(n/2)
 let swaps = 0;

 // loop through half of the array the array using index based loop.
 for (let index = 0; index < len; index++) {
   let currentStr = arr[index];

   // if the value at the current index is not equal to the value at the current index from the end of the array make the two values the same using the larger value.

   if (currentStr !== arr[arr.length - index - 1]) {
     currentStr = Math.max(arr[index], arr[arr.length - index - 1]);
     console.log(currentStr)
     swaps += 1;
   }

   arr[index] = currentStr;
   arr[arr.length - index - 1] = currentStr;
 }

 

   if (swaps > k) return '-1';

   return arr.join('');
}

console.log(highestValuePalindrome('12345', 5, 2));

// while loop solution

// const highestValuePalindrome = (s, n, k) => {
//     let arr = s.split('');
//     let count = 0;
//     let i = 0;
//     let j = n - 1;
//     while (i < j) {
//         if (arr[i] !== arr[j]) {
//             arr[i] = arr[j] = Math.max(arr[i], arr[j]);
//             count++;
//         }
//         i++;
//         j--;
//     }
//     if (count > k) return '-1';
//     i = 0;
//     j = n - 1;
//     while (i <= j) {
//         if (i === j && count < k) {
//             arr[i] = '9';
//             break;
//         }
//         if (arr[i] !== '9') {
//             if (count + 2 <= k) {
//                 arr[i] = arr[j] = '9';
//                 count += 2;
//             } else if (count + 1 <= k) {
//                 arr[i] = arr[j] = '9';
//                 count++;
//             }
//         }
//         i++;
//         j--;
//     }
//     return arr.join('');
// };









































































































