import { Request, Response } from 'express';
import { getEvents } from '../models/eventModel';
import { calculateTaxPosition } from '../utils/calculateTax';

export const queryTaxPosition = (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  const events = getEvents();
  const taxPosition = calculateTaxPosition(events, date as string);

  res.status(200).json({
    date: date,
    taxPosition: taxPosition
  });
};
