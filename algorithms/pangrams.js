/**
 * what is a pangram?
 * @Description - A pangram is a sentence that contains every letter of the alphabet.
 * @param {string} str
 * @example - "The quick brown fox jumps over the lazy dog."
 * @returns {boolean}
 * @methods - .toLowerCase(), .filter(), regex, spread operator
 * 
 * @steps
 * 1. define the function called isPangram
 * 2. remove all duplicates from the string
 * 3. convert the string to lowercase
 * 4. remove all non-alphabet characters
 * 5. check if the length of the string is 26
 */

function isPangram(str) {
  const noDuplicates = [...new Set(str.toLowerCase())];

  // console.log(noDuplicates);

  const onlyLetters = noDuplicates.filter((char) => {
    return /[a-z]/.test(char);
  });

  // console.log(onlyLetters.length)

  return onlyLetters.length === 26;

}

console.log(isPangram("The quick brown fox jumps over the lazy DOG."));
console.log(isPangram('data is the new oil'));