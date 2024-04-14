import { Sale, TaxPayment, Item } from "../types/event";

export const calculateTaxPosition = (
  sales: Sale[],
  taxPayments: TaxPayment[],
  date: string
): number => {
  // let taxFromSales = 0;
  // let taxPayments = 0;

  // events.forEach((event) => {
  //   if (event.date <= date) {
  //     if (event.eventType === "SALES" && event.items) {
  //       event.items.forEach((item: Item) => {
  //         taxFromSales += item.cost * item.taxRate;
  //       });
  //     } else if (event.eventType === "TAX_PAYMENT" && event.amount) {
  //       taxPayments += event.amount;
  //     }
  //   }
  // });

  let taxFromSales = 0;
  let taxPaid = 0;

  sales.forEach((sale) => {
    if (new Date(sale.date) <= new Date(date)) {
      sale.items.forEach((item: Item) => {
        taxFromSales = item.cost * item.taxRate + taxFromSales;
      });
    }
  });

  taxPayments.forEach((taxPayment) => {
    if (new Date(taxPayment.date) <= new Date(date)) {
      taxPaid = taxPayment.amount + taxPaid;
    }
  });

  return (taxFromSales - taxPaid) / 100; // Convert pennies to pounds
};
