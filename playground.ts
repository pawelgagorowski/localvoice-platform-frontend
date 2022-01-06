/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
// console.log(isNaN('1123'));
// console.log(isNaN(1123));
// console.log(Number.isNaN(1123));
// console.log(Number.isNaN('1123'));
// console.log(isNaN('hello'));
// console.log(isNaN('hello' / 'foo'));
// console.log(Number.isNaN('hello'));

const add = (function () {
  console.log('hello from fn');
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
})();

// console.log(add());

// // function makeAdder1(x) {
// //   return function (y) {
// //     return x + y;
// //   };
// // }

// function makeAdder2(x) {
//   function dupa(z) {
//     console.log('funkcja dupa');
//     console.log(`${z}1`);
//   }
//   return dupa;
// }

// const ad1 = makeAdder2();
// ad1(5);

// const dupa = (param1) => (param2) => {
//   console.log('param1', param1);
//   console.log('param2', param2);
// };

// const dupa1 = dupa('param1');
// dupa1('param2');

// const dupa3 = dupa('pa')('du');

// console.log(Number.isNaN(Number('1.2.4')));
// console.log(Number.isNaN(Number('hello')));
// console.log(Number.isNaN(Number(NaN)));
// console.log(Number.isNaN(Number(null)));
// console.log(Number.isNaN(Number(undefined)));
// console.log('DUPA@@');
// console.log(isNaN('1.2.4'));
// console.log(isNaN('hello'));
// console.log(isNaN(NaN));
// console.log(isNaN(null));
// console.log(isNaN(undefined));
// console.log('dupa2');
// console.log(Number(null));
// console.log(Number(undefined));
// console.log(Number(NaN));

// type Stranger = {
//   name: string;
//   surname: string;
// };

// type Person = {
//   stranger: Stranger;
// };

// interface People {
//   person: Person;
// }

// const SomePeople: (person: Person) => string = ({ stranger }) => {
//   stranger.surname;
//   return 'fdef';
// };

// function dupa(hello: string, dupa1: string, dupa2: string, dupa3: string, dupa4: string) {
//   console.log(hello, dupa1, dupa2, dupa3, dupa4);
// }
// let dupa = {
//   hello: 'adfsdf',
// };
// dupa.hello = 'haha';

// const newvalue = dupa.hello === 'heee' ? 'firstDupa' : 'secondDupa';
// dupa.hello = newvalue;

// console.log(dupa);

const obj = { '1': 5, '2': 7, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
let result = Object.keys(obj).map((key) => [obj[key]]);

console.log(result);
