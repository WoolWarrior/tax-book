import { Amendment, TaxPayment, Sale } from "../types";

let amendments: Amendment[] = [];
let sales: Sale[] = [];
let taxPayments: TaxPayment[] = [];

export const addSale = (newSale: Sale) => {
  const index = amendments.findIndex((amendment) => {
    return amendment.invoiceId === newSale.invoiceId;
  });
  if (index > -1) {
    const amendment = amendments[index];
    const item = newSale.items.find((item) => item.itemId === amendment.itemId);
    if (item) {
      item.cost = amendment.cost;
      item.taxRate = amendment.taxRate;
    } else {
      newSale.items.push({
        itemId: amendment.itemId,
        cost: amendment.cost,
        taxRate: amendment.taxRate,
      });
    }
    amendments.splice(index, 1);
  }
  sales.push(newSale);
};

export const addTaxPayment = (newTaxPayment: TaxPayment) => {
  taxPayments.push(newTaxPayment);
};

export const amendSale = (newAmendment: Amendment) => {
  const sale = sales.find((sale) => {
    return sale.invoiceId === newAmendment.invoiceId;
  });
  console.log({ sale });
  if (sale) {
    const item = sale.items.find((item) => item.itemId === newAmendment.itemId);
    if (item) {
      item.cost = newAmendment.cost;
      item.taxRate = newAmendment.taxRate;
    } else {
      sale.items.push({
        itemId: newAmendment.itemId,
        cost: newAmendment.cost,
        taxRate: newAmendment.taxRate,
      });
    }
  } else {
    amendments.push(newAmendment);
  }
};

export const getSales = (): Sale[] => sales;
export const getTaxPayment = (): TaxPayment[] => taxPayments;
export const getAmendments = (): Amendment[] => amendments;
