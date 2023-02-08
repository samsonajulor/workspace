let shortString = "samSon";
let longString = "samson ajulor is a good developer";
let one = 'one is good'
let two = ', two is better'
let spaces = " this is a bad string."
// String length: this is used to get the length of a string. e.g. "samson".length will return 6
/** Length of the long string */
console.log(longString.length);
console.log(shortString.length);
// String slice(): this is used to extract a part of a string and returns the extracted part in a new string. e.g. "samson".slice(2, 4) will return "ms"
console.log(longString.slice(-7, -1))
// it can take in negative values. e.g. "samson".slice(-3, -1) will return "so"
// String substring(): this is similar to slice() but it cannot take in negative values. e.g. "samson".substring(2, 4) will return "ms"
console.log(longString.substring(0, 5))
// if you pass negative values into the substring() method, it will automatically convert them to 0. e.g. "samson".substring(-3, -1) will return ""
// String replace(): this is used to replace a specified value with another value in a string. e.g. "samson".replace("s", "a") will return "aamson"
console.log(longString.replace("samson", "samuel"))
console.log(longString.replace(/a/g, "s"))
// String replaceAll(): this is used to replace all specified values with another value in a string. e.g. "samson".replaceAll("s", "a") will return "aamaon"
console.log(longString.replaceAll('a', 's'));
// replace and replace all can also be used with regular expressions. e.g. "samson".replace(/s/g, "a") will return "aamaon"
// String toUpperCase(): this is used to convert a string to uppercase letters. e.g. "Samson".toUpperCase() will return "SAMSON"
console.log(shortString.toUpperCase())
// String toLowerCase(): this is used to convert a string to lowercase letters. e.g. "Samson".toLowerCase() will return "samson"
// js uses a convention called camel casing
console.log(shortString.toLowerCase());
// String concat(): this is used to join two strings together: e.g. samson.concat(" ajulor") will return "samson ajulor"
//  this is similar to the + operator. e.g. "samson" + " " + "ajulor" will return "samson ajulor"
console.log(one.concat(two));
// String trim(): this is used to remove whitespace from both sides of a string. e.g. " samson ".trim() will return "samson"
console.log(spaces.trim())
// String trimStart(): this is used to remove whitespace from the beginning of a string. e.g. " samson ".trimStart() will return "samson "
// String trimEnd(): this is used to remove whitespace from the end of a string. e.g. " samson ".trimEnd() will return " samson"
// String charAt(): this is used to return the character at a specified index in a string. e.g. "samson".charAt(3) will return "s"
console.log(longString.charAt(8))
// String charCodeAt(): this is used to return the unicode/ascii of the character at a specified index in a string. e.g. "samson".charCodeAt(3) will return 115
console.log(shortString.charAt(0))
console.log(shortString.charAt(3));
console.log(shortString.charCodeAt(0))
console.log(shortString.charCodeAt(3))
// String split(): this is used to split a string into an array of substrings. it takes in a parameter e.g. "samson ajulor".split("a") will return ["samson", "ajulor"]=> ["s",  "mson ", "julor"]
console.log(longString.split(" "))
console.log(longString.split("a"))
