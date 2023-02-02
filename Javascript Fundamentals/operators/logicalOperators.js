// &&	logical and
// ||	logical or
// !	logical not

// truthy and falsy values
// falsy values: undefined, null, 0, '', NaN
// truthy values: strings, numbers, objects, arrays, booleans

// truthy assignments
let str = '4'; //string
let num = 4; // number
let obj = { value: 10 }; // ref: r5344
let arr = [1, 2, 3, 4, 5]; // ref: r5345
let bool = true;

// falsy assignments
let undef = undefined;
let none = null;
let zero = 0;
let emptyString = '';
let nan = NaN;

// logical and
let showMeTrue = obj && 'something important';
console.log(showMeTrue)
let showMeFalse = zero && 'something important';
console.log(showMeFalse)

// logical or
let showMeTrue2 = num || 'something not as important';
console.log(showMeTrue2)
let showMeFalse2 = emptyString || 'show this instead';
console.log(showMeFalse2)

// logical not
let showMeTrue3 = zero;
console.log(!showMeTrue3)