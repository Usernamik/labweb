//1
let a = 15;
let b = 3;

console.log(a + b );
console.log(a - b);
console.log(a * b);
console.log(a / b);
//2
const firstName = 'John';
const lastName = 'Doe';

const fullName = firstName + lastName;
console.log(firstName + ' ' + lastName + ' ' + fullName);

//3
const age = 30;
if (age >= 18) {
    console.log("Дозволено")
} else {
    console.log("Заборонено");
}

//4
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
//5
function square(number) {
    return number * number;
}
const result = square(5);
console.log(`Квадрат числа 5 = ${result}`);

//6
const fruits = ["Яблуко", "Банан", "Апельсин"];
fruits.push("Манго");
console.log(fruits);