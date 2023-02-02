// =	x = y	x = y **equal to
// +=	x += y x = x + y ** plus equals
// -=	x -= y	x = x - y ** minus equals
// *=	x *= y	x = x * y ** times equals
// /=	x /= y	x = x / y ** divide equals
// %=	x %= y	x = x % y ** modulus equals
// **=	x **= y	x = x ** y ** exponential equals

let numberOne; // declaration
// const numberOne = 10; // declaration and initialization
console.log(numberOne)

numberOne = 9; // assignment
let numberTwo = 16; // declaration and initialization

numberOne = numberOne + numberTwo;
numberOne += numberTwo;
console.log(numberOne);

// numberTwo = numberTwo - numberOne;
numberTwo -= numberOne;
console.log(numberTwo);