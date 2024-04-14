import { Amendment, Sale, TaxPayment } from "../types";

let amendments: Amendment[] = [];
let sales: Sale[] = [];
let taxPayments: TaxPayment[] = [];

export const addSale = (newSale: Sale): void => {
  amendments.forEach((amendment, index) => {
    if (amendment.invoiceId === newSale.invoiceId) {
      const itemIndex = newSale.items.findIndex(
        (item) => item.itemId === amendment.itemId
      );
      if (itemIndex > -1) {
        // If item exists, amend it
        newSale.items[itemIndex].cost = amendment.cost;
        newSale.items[itemIndex].taxRate = amendment.taxRate;
      } else {
        // If item does not exist, add new item to the sale
        newSale.items.push({
          itemId: amendment.itemId,
          cost: amendment.cost,
          taxRate: amendment.taxRate,
        });
      }
      // Remove the processed amendment
      amendments.splice(index, 1);
    }
  });
  sales.push(newSale);
};

export const addTaxPayment = (newTaxPayment: TaxPayment): void => {
  taxPayments.push(newTaxPayment);
};

export const amendSale = (newAmendment: Amendment): void => {
  const sale = sales.find((sale) => sale.invoiceId === newAmendment.invoiceId);
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
    // If no matching sale is found, store the amendment for future application
    amendments.push(newAmendment);
  }
};

export const getSales = (): Sale[] => sales;
export const getTaxPayments = (): TaxPayment[] => taxPayments;
export const getAmendments = (): Amendment[] => amendments;
