// import { Request, Response } from "express";
// import { getAmendments, getSales, getTaxPayments } from "../models";
// import { calculateTaxPosition } from "../utils/calculateTax";

// export const queryTaxPosition = (req: Request, res: Response) => {
//   const { date } = req.query;

//   if (!date) {
//     return res.status(400).json({ error: "Date parameter is required" });
//   }

//   const taxPayments = getTaxPayments();
//   const sales = getSales();
//   const amendments = getAmendments()
//   const taxPosition = calculateTaxPosition(sales, taxPayments, amendments, date as string);

//   res.status(200).json({
//     date: date,
//     taxPosition: taxPosition,
//   });
// };
