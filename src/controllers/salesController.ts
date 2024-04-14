import { Request, Response } from 'express';
import { amendSale } from '../models/eventModel';

export const handleAmendSale = (req: Request, res: Response) => {
  const { date, invoiceId, itemId, cost, taxRate } = req.body;
  
  amendSale({ date, invoiceId, itemId, cost, taxRate });
  res.status(202).send();
};
