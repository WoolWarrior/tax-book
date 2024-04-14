import { Request, Response } from "express";
import { amendSale, getAmendments, getSales } from "../models";

export const handleAmendSale = (req: Request, res: Response) => {
  const { date, invoiceId, itemId, cost, taxRate } = req.body;

  amendSale({ date, invoiceId, itemId, cost, taxRate });

  console.log(getAmendments(), getSales());
  res.status(202).send();
};