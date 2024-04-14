import { Request, Response } from "express";
import { getSales, getTaxPayment } from "../models";
import { calculateTaxPosition } from "../utils/calculateTax";

export const queryTaxPosition = (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  const taxPayments = getTaxPayment();
  const sales = getSales();
  const taxPosition = calculateTaxPosition(sales, taxPayments, date as string);

  res.status(200).json({
    date: date,
    taxPosition: taxPosition,
  });
};
