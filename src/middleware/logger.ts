// import { Request, Response, NextFunction } from 'express';
// import { getAmendments, getSales, getTaxPayments } from '../models';

// export const logState = (req: Request, res: Response, next: NextFunction) => {
//   res.on('finish', () => {
//     console.log('Current State:');
//     console.log('Sales:', JSON.stringify(getSales(), null, 2));
//     console.log('Amendments:', JSON.stringify(getAmendments(), null, 2));
//     console.log('Tax Payments:', JSON.stringify(getTaxPayments(), null, 2));
//   });
//   next();
// };
