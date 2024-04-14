import { Request, Response } from "express";
import { addSale, addTaxPayment } from "../models/eventModel";
import { Sale, TaxPayment } from "../types/event";

export const handleTransaction = (req: Request, res: Response) => {
  const { eventType } = req.body;
  if (eventType === "SALES") {
    const newSale: Sale = req.body as Sale;
    addSale(newSale);
    res.status(202).send();
  }

  if (eventType === "TAX_PAYMENT") {
    const newTaxPayment: TaxPayment = req.body as TaxPayment;
    addTaxPayment(newTaxPayment);
    res.status(202).send();
  }
};
