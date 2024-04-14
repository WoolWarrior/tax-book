import { Event, Item } from "../types/event";

export const calculateTaxPosition = (events: Event[], date: string): number => {
  let taxFromSales = 0;
  let taxPayments = 0;

  events.forEach((event) => {
    if (event.date <= date) {
      if (event.eventType === "SALES" && event.items) {
        event.items.forEach((item: Item) => {
          taxFromSales += item.cost * item.taxRate;
        });
      } else if (event.eventType === "TAX_PAYMENT" && event.amount) {
        taxPayments += event.amount;
      }
    }
  });

  return (taxFromSales - taxPayments) / 100; // Convert pennies to pounds
};
