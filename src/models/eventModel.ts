import { Amendment, TaxPayment, Sale } from "../types";

let events: Event[] = [];
let amendments: Amendment[] = [];
let sales: Sale[] = [];
let taxPayments: TaxPayment[] = [];

export const addSale = (newSale: Sale) => {
  sales.push(newSale);
  console.log({ sales });
};

export const addTaxPayment = (newTaxPayment: TaxPayment) => {
  taxPayments.push(newTaxPayment);
  console.log({ taxPayments });
};

export const amendSale = (amendment: Amendment) => {
  console.log({ amendment });
  // const saleEvent = events.find(
  //   (e) =>
  //     e.eventType === "SALES" &&
  //     (e as SalesEvent).invoiceId === amendment.invoiceId
  // ) as SalesEvent | undefined;

  // if (saleEvent) {
  //   const item = saleEvent.items.find((it) => it.itemId === amendment.itemId);
  //   if (item) {
  //     item.cost = amendment.cost;
  //     item.taxRate = amendment.taxRate;
  //   } else {
  //     saleEvent.items.push({
  //       itemId: amendment.itemId,
  //       cost: amendment.cost,
  //       taxRate: amendment.taxRate,
  //     });
  //   }
  // } else {
  //   // Store amendment for future processing
  //   amendments.push(amendment);
  // }
};

export const getSales = (): Sale[] => sales;
export const getTaxPayment = (): TaxPayment[] => taxPayments;
export const getAmendments = (): Amendment[] => amendments;
