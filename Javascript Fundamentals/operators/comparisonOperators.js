// ==	equal to or equal in value
// ===	equal value and equal type (strictly equal)
// !=	not equal
// !==	not equal value or not equal type
// >	greater than
// <	less than
// >=	greater than or equal to
// <=	less than or equal to
// ?	ternary operator

// example
let str = '4'; //string
let num = 4; // number

console.log(str != num); // this is not equal in value
console.log(str !== num); // this is not equal in value and type
let obj1 = { value: 10 }; // ref: r5344
let obj3 = obj1
console.log(obj1 == obj3);
console.log(obj1 === obj3);

let obj2 = { value: 10 }; // ref: r5345

console.log(obj1 == obj2);
console.log(obj1 === obj2);

let highNumber = 13000;
let lowNumber = 1233;

console.log(highNumber >= lowNumber);
console.log(highNumber <= lowNumber);

for (let i = 0; i <= 10 ; i++) console.log(i)

// ternary operator
if (highNumber > lowNumber) {
  console.log('highNumber is greater than lowNumber');
} else {
  console.log('highNumber is less than lowNumber');
}

console.log(highNumber > lowNumber ? 'highNumber is greater than lowNumber' : 'highNumber is less than lowNumber')