import { Op } from "sequelize";
import {
  Sale as SaleModel,
  Item as ItemModel,
  TaxPayment as TaxPaymentModel,
} from "../models";
import { Item } from "../models/Item";

export const calculateTotalSalesTax = async (date: string): Promise<number> => {
  console.log("===calculateTotalSalesTax===");
  const sales = await SaleModel.findAll({
    include: [
      {
        model: ItemModel,
        as: "items",
        attributes: ["cost", "taxRate"],
      },
    ],
    where: {
      date: {
        [Op.lte]: new Date(date),
      },
    },
  });
  console.log({ sales });

  let totalTax = 0;
  sales.forEach((sale) => {
    sale.items.forEach((item: Item) => {
      totalTax += item.cost * item.taxRate;
    });
  });

  return totalTax;
};

export const calculateTotalTaxPayments = async (
  date: string
): Promise<number> => {
  const payments = await TaxPaymentModel.findAll({
    where: {
      date: {
        [Op.lte]: new Date(date),
      },
    },
  });

  const totalPayments = payments.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );
  return totalPayments;
};
