import { format, setMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getInstallmentsMonths(numberOfInstallments, invoiceDate) {
  const months = [];
  const monthsIndexes = [];
  const datesOfMonths = [];
  const restOfInstallments = numberOfInstallments - monthsIndexes.length;
  const formattedInvoiceDate = new Date(invoiceDate);
  const currentMonth = formattedInvoiceDate.getMonth();

  for (let i = 1; i <= numberOfInstallments; i++) {
    let nextMonths = currentMonth + i;

    if (nextMonths >= 12) {
      break;
    }

    monthsIndexes.push(nextMonths);
  }

  for (let i = 0; i < restOfInstallments; i++) {
    if (monthsIndexes.length < numberOfInstallments) {
      monthsIndexes.push(i);
    }
  }

  monthsIndexes.forEach((monthIndex) => {
    datesOfMonths.push(setMonth(formattedInvoiceDate, monthIndex));
  });

  datesOfMonths.forEach((date) => {
    months.push({
      month: format(date, 'MMMM', { locale: ptBR }),
      checked: false,
    });
  });

  return months;
}
