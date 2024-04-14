import { Request, Response, NextFunction } from "express";
import { Sale, Item, TaxPayment, Amendment } from "../models";

export const logState = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", async () => {
    const sales = await Sale.findAll();
    const items = await Item.findAll();
    const taxPayments = await TaxPayment.findAll();
    const amendments = await Amendment.findAll();
    console.log("Current State:");
    console.log("Sales:", JSON.stringify(sales, null, 2));
    console.log("Items:", JSON.stringify(items, null, 2));
    console.log("Amendments:", JSON.stringify(amendments, null, 2));
    console.log("Tax Payments:", JSON.stringify(taxPayments, null, 2));
  });
  next();
};
