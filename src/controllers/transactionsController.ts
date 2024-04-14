import { Request, Response } from "express";
import { addEvent } from "../models/eventModel";

export const handleTransaction = (req: Request, res: Response) => {
  const { eventType, date, invoiceId, items, amount } = req.body;
  addEvent({ eventType, date, invoiceId, items, amount });
  res.status(202).send();
};
