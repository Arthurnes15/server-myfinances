import { format, setMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const today = new Date();
const currentMonth = today.getMonth();
let monthsIndexes = [];

// console.log(today);

// 10 -> numberOfInstallments
// monthsI -> nextMonths
// 4 -> rest of numberOfInstallments
for (let i = 1; i <= 12; i++) {
  let monthsI = currentMonth + i;

  if (monthsI >= 12) {
    break;
  }
  // console.log(monthsI);

  monthsIndexes.push(monthsI);
}

const restOfInstallments = 12 - monthsIndexes.length;

for (let i = 0; i <= restOfInstallments; i++) {
  if (monthsIndexes.length < 12) {
    monthsIndexes.push(i);
  }
}

// console.log(monthsIndexes);

const datesOfMonths = [];

for (let i = 0; i < monthsIndexes.length; i++) {
  datesOfMonths.push(setMonth(new Date(), monthsIndexes[i]));
}

// console.log('MONTH SETTED', setMonth('2025-01-29T12:41:15.914Z', 1));

// console.log(datesOfMonths);

// datesOfMonths.forEach((date) => {
//   console.log(format(date, 'MMMM', { locale: ptBR }));
// });

// const today2 = new Date(2025, 5, 28);

// console.log(
//   today2.getUTCDate() + ' ' + today2.getUTCMonth() + ' ' + today.getFullYear()
// );

// lógica passada do getInstallmentsMonths:
// if (nextMonths < 12) {
//   monthsIndexes.push(nextMonths);
// } else {
//   for (let i = 0; i < restOfInstallments; i++) {
//     if (monthsIndexes.length < numberOfInstallments) {
//       monthsIndexes.push(i);
//     }
//   }
// }

const url =
  'https://res.cloudinary.com/dajttxip4/image/upload/v1750964759/g6eylfuox7q7njvluy4j.jpg';

const urlArray = url.split('/');

const image = urlArray[urlArray.length - 1];
const imageName = image.split('.')[0];

console.log(imageName);
